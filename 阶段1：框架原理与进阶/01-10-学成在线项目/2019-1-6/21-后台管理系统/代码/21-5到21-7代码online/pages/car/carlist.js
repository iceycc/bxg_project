import css from './carlist.less'

import {Row,Col,Button,Table ,message } from 'antd'

import fetchHelper from '../../kits/fetchHelper.js'
import Router from 'next/router'
import {connect} from 'react-redux'

 class carlist extends React.Component {
    
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      
        // 将用户勾选好的课程数据用reudx管理起来
        this.props.onSelectedCourse(selectedRows)
        // 计算用户勾选商品总价格,发现selectedRows里面每个数据都有一个sell_price，只要全部相加即可得到总价格
        if(selectedRows.length>0){
            let totalAmount = 0;
            selectedRows.forEach(item=>{
                totalAmount+=item.sell_price
            })

            // 修改state中的totalAmount
            this.setState({
                totalAmount:totalAmount,
                disabled:false  //表示只要用户有勾选商品，就将结算按钮变为可用
            })
        }else{
            this.setState({
                totalAmount:0,
                disabled:true  //将结算按钮变为不可用
            })
        }

        }
      };

      state={
        disabled:true, 
        totalAmount:0, //用户选择商品的总价格
        //   表格的表头
        columns : [{
            title: '课程图片',
            dataIndex: 'img_url',
            render: text => <img src={text} width="180" height="100" />,
          }, {
            title: '课程名称',
            dataIndex: 'title',
          },{
            title: '服务周期',
            dataIndex: 'timeout',
            render: text => <span>{text}个月</span>
          }, {
            title: '销售价格',
            dataIndex: 'sell_price',
            render: text => <span style={{color:"red"}}>￥{text}</span>
          },
          {
            title: '操作',
            dataIndex: 'shop_car_id',
            render: text => <a href="javascript:void(0)" onClick={this.del.bind(this,text)}>删除</a>
          }],
        //   表格的数据
          data : []
      }

    //  通过生命周期事件获取购物车中的数据
    componentWillMount(){
        this.getCarList();
    }

    // 获取购物车数据
    getCarList(){
        fetchHelper.get('/ch/shop/getshopcarlist')
        .then(json=>{
            if(json.status ==2){
                message.warn('用户未登录',1,()=>{
                    Router.push({pathname:'/account/login'})
                })
                return
            }

            if(json.status == 1){
                message.error(json.message,1)
                return
            }

            // 将购物车的数据赋值给state.data
            this.setState({
                data:json.message
            })
        })
    }

    // 删除数据
    del(id){
       fetchHelper.get('/ch/shop/deleteshopcar/'+id)
       .then(json=>{
           if(json.status ==2){
               Router.push({pathname:'/account/login'})
                return
           }

           if(json.status == 1){
               message.error(json.message,1)
                return
           }

        // 删除成功
        message.success(json.message,1,()=>{
            // 重新刷新数据
            this.getCarList();
          
        })
})
    }

    // 跳转到结算页面
    check(){
        Router.push({pathname:'/car/order'})
    }

    render() {
        return (<div style={{ minHeight: 800 }}>
            <div className={css.shoppingCart}>
                <div className={css.shoppingTitle}>
                    <span className={css.cartitle}>我的购物车</span>
                    <span className="numenber">共</span><span id="shoppingNumber">{this.state.data.length}</span>个课程
                </div>
                <div className={css.shoppingTableTitle}>
                <Table rowSelection={this.rowSelection} columns={this.state.columns} dataSource={this.state.data} />
                </div>
                <div className={css.shoppingTitle}>
                    <Row>
                        <Col offset="11" span="8">若购买享有满减等优惠，相应金额将在订单结算页面减扣</Col>
                        <Col span="3">合计: <span style={{ color: "red", fontSize: '20px' }}>￥{this.state.totalAmount}</span>

                        </Col>
                        <Col span="2"> 
                        <Button type="primary" size="large" disabled={this.state.disabled} onClick={this.check.bind(this)}>结算</Button></Col>
                    </Row>
                </div>
            </div>
            <style>{`
            .ant-pagination.ant-table-pagination{
                display:none;
            }
            `}
            </style>
        </div>)

    }
}

let mapDispatchToProps = (dispatch) =>{
    return {
        onSelectedCourse:(courseList)=>{
            dispatch({type:'SELECTED_COURSE',courseList:courseList})
        }
    }
}

export default connect(null,mapDispatchToProps)(carlist)