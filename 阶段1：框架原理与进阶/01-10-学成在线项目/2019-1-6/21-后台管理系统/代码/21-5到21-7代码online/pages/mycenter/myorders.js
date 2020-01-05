import { connect } from 'react-redux'
import Head from 'next/head'
import { Row, Col, message, Affix, Menu, Icon, Collapse,Pagination  } from 'antd'
const Panel = Collapse.Panel;
import MyLeft from './left.js'
import css1 from './mycourse.less'
import css from './myorder.less'
import fetchHelper from '../../kits/fetchHelper.js'
import Router from 'next/router'
import { fmtDate } from '../../kits/kits.js';

class myorderlist extends React.Component {
    state = {
        top: 80,
        type:-1,
        pageIndex:1,
        totalCount:0,
        OrderTypeList: null, //用来存储订单的筛选条件的
        orderlist: null  //1.0 用来存储当前登录用户的所有订单数据
    }

    // 2.0 在componentWillMount方法中发出fetch请求数据
    componentWillMount() {
        this.getorders(-1, 1, 2);
    }
    // fetch请求数据
    getorders(type, pageIndex, pageSize) {
        // 1.0 定义一个url
        let url = `/ch/mycenter/getMyOrderListByPage/${type}?pageIndex=${pageIndex}&pageSize=${pageSize}`
        // 2.0 发出fetch
        fetchHelper.get(url)
            .then(json => {
                // 3.0 判断是否有登录
                if (json.status == 2) {
                    message.warn('您未登录', 1, () => {
                        Router.push({ pathname: '/account/login' })
                    })
                    return
                }

                // 3.0.1 如果报错则提示
                if (json.status == 1) {
                    message.error(json.message, 1, () => {
                        Router.push({ pathname: '/account/login' })
                    })
                    return
                }

                // 3.0.2 如果处理成功则将数据赋值给state.orderlist
                this.setState({
                    orderlist: json.message.orderList,
                    OrderTypeList: json.message.OrderTypeList,
                    totalCount:json.totalCount
                })

            })
    }

    // 根据订单状态传入值筛选出不同的订单数据
    search(type){
        this.setState({type:type})
        this.getorders(type,1,2)
    }

    // 分页事件
    pageChange(pageIndex,pageSize){
        this.setState({
            pageIndex
        })
        this.getorders(this.state.type,pageIndex,2)
    }

    render() {
        return (<div style={{ minHeight: 800 }}>
            <Head>
                <title>学成在线-我的课程</title>
            </Head>
            {/* 顶部banner */}
            <div className={css1.personal_header}></div>
            {/* 顶部banner */}

            <div className={css.container}>
                {/* 左边菜单 */}
                <Row>
                    <Col span="6">
                        <Affix offsetTop={this.state.top}>
                            <MyLeft mid="2"></MyLeft>
                        </Affix>
                    </Col>
                    {/* 左边菜单 */}

                    {/* 右边内容 */}
                    <Col span="18">
                        <div className={css.allclass_content}>
                            {/* 筛选条件 */}
                            <div className={css.top_title}>
                            <Row>
                                <Col span="15">
                                    <span className={css.active} id="all" onClick={()=>{this.search(-1)}} >全部课程</span>
                                    <span id="wait" onClick={()=>{this.search(0)}} >待付款</span>
                                    <span id="succ" onClick={()=>{this.search(1)}} >已完成</span>
                                    <span id="outs" onClick={()=>{this.search(2)}} >已关闭</span>
                                </Col>
                                <Col span="9">
                                    <Pagination current={this.state.pageIndex} size="small" pageSize={2} total={this.state.totalCount} onChange={this.pageChange.bind(this)} />
                                </Col>
                            </Row>
                                
                            </div>
                            {/* 筛选条件-end */}
                            {/* 表头 */}
                            <div className={css.nav}>
                                <div>
                                    <span className={css.col_md_6 + " " + css.fleft}>课程信息</span>
                                    <span className={css.col_md_4 + " " + css.fleft}><em>订单金额</em><em>实付款</em><em>交易状态</em></span>
                                    <span className={css.col_md_2 + " " + css.fleft}>交易操作</span>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            {/* 表头end */}

                            {/* 表内容 */}
                            <div className={css.allclass_cont}>
                                {
                                    this.state.orderlist && this.state.orderlist.map((item, index) => (
                                        <div className={css.content}>

                                            <div className={css.item}>
                                                <div className={css.time_orderid}><span>{fmtDate(item.add_time)}</span> 订单号：{item.order_no}</div>
                                                <div className={css.item_content}>
                                                    <Row><Col span="12">
                                                        <Row>
                                                            <Col span="8">
                                                                <div className={css.col_md_2}>
                                                                    <img src={item.order_goods_list[0].img_url} width="100%" alt="" />
                                                                </div>
                                                            </Col>
                                                            <Col span="16">
                                                                <div className={css.item_cent + " " + css.col_md_6}>
                                                                    <div className={css.title}>{item.order_goods_list[0].goods_title}</div>
                                                                    <div className={css.star_show}>
                                                                        <div className={css.score}><i></i></div>
                                                                    </div>
                                                                    <div className={css.text}>课程打分 <em>{item.order_goods_list[0].lesson_star}星</em></div>
                                                                    <div className={css.cont}>有效截止日期：{fmtDate(item.order_goods_list[0].timeout_time)}</div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Collapse bordered={false} defaultActiveKey={['0']}>
                                                            <Panel header="查看此订单更多课程" key="1">
                                                                {
                                                                    item.order_goods_list && item.order_goods_list.slice(1).map((item1, index1) => {
                                                                        <Row key={index}>
                                                                            <Col span="8">
                                                                                <div className={css.col_md_2}>
                                                                                    <img src={item1.img_url} width="100%" alt="" />
                                                                                </div>
                                                                            </Col>
                                                                            <Col span="15" offset="1">
                                                                                <div className={css.item_cent + " " + css.col_md_6}>
                                                                                    <div className={css.title}>{item1.goods_title}</div>
                                                                                    <div className={css.star_show}>
                                                                                        <div className={css.score}><i></i></div>
                                                                                    </div>
                                                                                    <div className={css.text}>课程打分 <em>{item1.lesson_star}星</em></div>
                                                                                    <div className={css.cont}>有效截止日期：{fmtDate(item1.timeout_time)}</div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    })
                                                                }


                                                            </Panel>

                                                        </Collapse>

                                                    </Col>

                                                        <Col span="7">
                                                            <div className={css.col_md_4 + " " + css.lab_info}>
                                                                <span>${item.payable_amount}</span><span>${item.real_amount}</span><span>{item.statusName}</span>
                                                            </div>
                                                        </Col>
                                                        <Col span="5">
                                                            {
                                                                item.status == 0 ? <div className={css.item_rit + " " + css.col_md_2}>
                                                                <a href="#" class="">去 支 付 </a>
                                                                <a href="#">取消订单</a>
                                                             </div>:''
                                                            }
                                                           
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>

                                        </div>

                                    ))
                                }

                            </div>
                            {/* 表内容 */}
                        </div>
                    </Col>
                    {/* 右边内容 */}

                </Row>
            </div>

        </div>)
    }
}


const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({ type: 'CHANGE_COLOR', color: color })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(myorderlist)