import css from './layout.less';
import { Icon, Badge } from 'antd';

// redux步骤1：导入connect高阶函数(react-redux)，按需将store中的state
// 和dispatch注册到当前head组件中来，但是由于head只需要触发事件，所有不需要store中state
import {connect} from 'react-redux'


 class head extends React.Component {
    render() {
        return (<header className={css.headtop + " w"}>
            <a href="" className="fl"><img src="/static/img/asset-logoIco.png" alt="" /></a>
            <div className={css.left + " fl"}>
                <a className={css.a} href="">首页</a>
                <a className={css.a} href="">课程</a>
                <a className={css.a} href="">职业规划</a>
            </div>
            <div className={css.input + " fl"}>
                <input type="text" className="fl" placeholder="输入查询关键字" />
                <button className="fr">搜索</button>
            </div>
            <div className={css.right + " fr"}>
                <div class={css.signin}>               
                    <Badge count={5}>
                       {/* 加入antd中的购物车图标 */}
                       <Icon type="shopping-cart" className={css.Icon} />
                    </Badge>
                    <a onClick={()=>{this.props.onChangeColor('blue')}}>蓝色</a>
                    <a onClick={()=>{this.props.onChangeColor('red')}}>红色</a>
                    {/* <!-- 未登录 -->*/}
                    <a href="#">登录 </a> <span> |</span> <a href="#"> 注册</a>
                    {/* <!-- 登录 --> */}
                    {/* <a href="#" ><Icon type="bell" theme="twoTone" />个人中心</a>
                    <a href="#" ><img src="/static/img/asset-myImg.jpg" alt="" />18665765432</a> */}
                </div>
            </div>
        </header>)
    }
}

// 2.0 利用connect函数将组件对象包装以后返回
// 2.0.1 注册一个dispatch触发对象到head组件的props中
const mapDispathToProps = (dispatch)=>{
    return {
        onChangeColor:(color)=>{
            // 调用dispatch完成store中的state属性的改变
            dispatch({type:'CHANGE_COLOR',color:color})
        }
    }
}

/**
 * connect有两个参数:
 * 1、第一个参数本质上是一个函数，可以将store中的state绑定到head组件中的props中
 * 2、第二个参数本质上也是一个函数，可以通过这个函数中定义的事件去操作store中的dispatch
 * 由于head组件只需要调用dispatch所以，只需要传入第二个参数，第一个参数传入null即可
 *  */

 const mapDispatchToProps = (dispatch)=>{
    return {
        onChangeColor:(color) => {
            // 利用dispatch去更新store中的state中的color属性(实际上是操作testReducer中的state中的color属性的值)
            dispatch({type:'CHANGE_COLOR',color:color})
        }
    }
 }

export default connect(null,mapDispatchToProps)(head)
