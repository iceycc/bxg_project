
import { connect } from 'react-redux'
import css from './pay.less'
import QRCode from 'qrcode.react'
import fetchHelper from '../../kits/fetchHelper.js'
import { message } from 'antd'
import Router from 'next/router'

let intervalHander = null

class pay extends React.Component {

    state = {
        payUrl: 'http://www.itheima.com'
    }

    getWXPayUrl() {
        let orderid = this.props.orderReducer.state.order_id
        let orderno = this.props.orderReducer.state.order_no
        let amount = this.props.orderReducer.state.amount

        console.log(orderid, orderno, amount)

        fetchHelper.post('/ch/shop/wxpay', { order_id: orderid, out_trade_no: orderno, nonce_str: amount })
            .then(json => {
                if (json.status == 1) {
                    message.error(json.message, 1)
                    return
                }

                // 成功就要将json.message.code_url值赋值给this.state中的payUrl
                this.setState({
                    payUrl: json.message.code_url
                })

                // 开启定时器轮询支付状态接口
                intervalHander = setInterval(() => {
                    fetchHelper.post('/ch/shop/checkpay', { order_id: orderid, out_trade_no: orderno, nonce_str: amount })
                        .then(json => {
                            if (json.status == 0 && json.message.trade_state == 'SUCCESS') {
                                // 提示用户支付完成，并且跳转到我的订单页面
                                message.success(json.message.statusTxt, 1, () => {
                                    // 清除定时器
                                    if (intervalHander) {
                                        clearInterval(intervalHander)
                                    }
                                    Router.push({ pathname: '/mycenter/myorders' })
                                })
                            }
                        })
                }, 3000);
            })
    }
    componentWillMount() {
        // 调用支付url获取连接接口
        this.getWXPayUrl()
    }

    // 离开页面之前清除定时器
    componentWillUnmount() {
        if (intervalHander) {
            clearInterval(intervalHander)
        }
    }

    render() {

        return (<div style={{ minHeight: 800 }}>
            {/* 订单信息 */}
            <div className={css.CashierBodyTop}>
                <div className={css.CashierLeft}>
                    <p className={css.cashierTitle}>产品名称：<span id="bookName">
                        {this.props.orderReducer.state.remark}
                    </span></p>
                    <p>业务订单：<span>{this.props.orderReducer.state.order_no}</span></p>
                </div>
                <div className={css.CashierRight}>
                    <p className={css.org}>应付金额：<span>￥{this.props.orderReducer.state.amount}</span></p>

                </div>
            </div>
            {/* 订单信息 -end */}
            {/* 扫码支付 */}
            <div className={css.CashierBodyTop}>
                <span style={{ fontSize: 20 }}>
                    <h4>请使用手机微信扫码下面支付二维码完成支付：{this.state.payUrl ? this.state.payUrl : 'http://itheima.com'}</h4>
                    <QRCode value={this.state.payUrl ? this.state.payUrl : 'http://itheima.com'} bgColor='yellowgreen' />
                </span>
                <div>
                </div>
            </div>
            {/* 扫码支付 */}

        </div>)
    }
}

let mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps, null)(pay)