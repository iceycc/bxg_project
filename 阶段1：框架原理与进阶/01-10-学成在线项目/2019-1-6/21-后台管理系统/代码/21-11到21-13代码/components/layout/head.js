import css from './layout.less';
import { Icon, Badge, message } from 'antd';

// redux步骤1：导入connect高阶函数(react-redux)，按需将store中的state
// 和dispatch注册到当前head组件中来，但是由于head只需要触发事件，所有不需要store中state
import { connect } from 'react-redux'

import { getUser, removeUser } from '../../kits/storageHelper.js'
import fetchHelper from '../../kits/fetchHelper.js'
import Link from 'next/link'

class head extends React.Component {
    //  登出系统逻辑处理
    logout() {
        // 1.0 调用数据服务接口将服务器的当前浏览器的session清除
        fetchHelper.get('/nc/common/account/logout')
            .then(json => {
                if (json.status == 1) {
                    // 请求失败 
                    message.error(json.message, 1)
                } else {
                    // 2.0 清除浏览器中的sessionStroage中的当前用户信息
                    removeUser()

                    // 3.0 跳转到登录页面
                    window.location = '/account/login'
                }
            })

    }
    render() {

        // 1.0 从sessionStroage中获取用户对象
        const user = getUser()

        return (<header className={css.headtop + " w"}>
            <a href="" className="fl"><img src="/static/img/asset-logoIco.png" alt="" /></a>
            <div className={css.left + " fl"}>
                <Link href={{pathname:'/index'}}>
                <a className={css.a} href="">首页</a>
                </Link>
                <a className={css.a} href="">课程</a>
                <a className={css.a} href="">职业规划</a>
            </div>
            <div className={css.input + " fl"}>
                <input type="text" className="fl" placeholder="输入查询关键字" />
                <button className="fr">搜索</button>
            </div>
            <div className={css.right + " fr"}>
                <div className={css.signin}>
                    <Link  href={{ pathname: '/car/carlist' }}>
                        <Badge count={this.props.shopCarCountReducer.count}>
                            {/* 加入antd中的购物车图标 */}
                            <Icon style={{cursor:'pointer'}} type="shopping-cart" className={css.Icon} />
                        </Badge>
                    </Link>
                    {/* <a onClick={()=>{this.props.onChangeColor('blue')}}>蓝色</a>
                    <a onClick={()=>{this.props.onChangeColor('red')}}>红色</a> */}
                    {
                        !user.uid ? <span>
                            {/* <!-- 未登录要显示 -->*/}
                            <Link href={{pathname:'/account/login'}}>
                            <a href="#">登录 </a> 
                            </Link>
                            <span> |</span> 
                            <Link href={{pathname:'/account/login'}}>
                            <a href="#"> 注册</a>
                            </Link>
                        </span>
                            :
                            <span>
                                {/* <!-- 登录以后要显示 --> */}
                                <Link href={{pathname:'/admin/course/clist'}}>
                                <a href="#" ><Icon type="bell" theme="twoTone" />后台管理</a>
                                </Link>
                                <Link href={{pathname:'/mycenter/myorders'}}>
                                <a href="#" ><Icon type="bell" theme="twoTone" />个人中心</a>
                                </Link>
                                <a href="#" >
                                    <img src="/static/img/asset-myImg.jpg" alt="" width="30px" height="30px" />
                                    {user.nick_name}</a>
                                <a href="#" onClick={() => { this.logout() }}>退出</a>
                            </span>
                    }
                </div>
            </div>
        </header>)
    }
}

// 2.0 利用connect函数将组件对象包装以后返回
// 2.0.1 注册一个dispatch触发对象到head组件的props中
const mapDispathToProps = (dispatch) => {
    return {
        onChangeColor: (color) => {
            // 调用dispatch完成store中的state属性的改变
            dispatch({ type: 'CHANGE_COLOR', color: color })
        }
    }
}

/**
 * connect有两个参数:
 * 1、第一个参数本质上是一个函数，可以将store中的state绑定到head组件中的props中
 * 2、第二个参数本质上也是一个函数，可以通过这个函数中定义的事件去操作store中的dispatch
 * 由于head组件只需要调用dispatch所以，只需要传入第二个参数，第一个参数传入null即可
 *  */

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeColor: (color) => {
            // 利用dispatch去更新store中的state中的color属性(实际上是操作testReducer中的state中的color属性的值)
            dispatch({ type: 'CHANGE_COLOR', color: color })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(head)
