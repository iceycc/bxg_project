import css from './left.less'
import {Menu,Icon} from 'antd'
import Link from 'next/link'

export default class left extends React.Component {
    render() {
        const {mid} = this.props;
        return (           
        <div className={css.personal_nav +" "+css.pull_left}>
        
            <div className={css.nav + " " +css.text_left }>
                <div className={css.title}>后台管理</div>
                <div className={css.my_ico}>
                    <img src="/static/img/asset-myimg.jpg" alt="" />
                    <p>管理员</p>
                </div>
                <div className={css.item}>
                <Menu
                    style={{ width: 200 }}
                    defaultSelectedKeys={[mid]}
                    mode="vertical"
                >
                <Menu.Item key="1">
                <Link href={{pathname:'/admin/course/clist'}}>
                <span>
                   <Icon type="mail" />                    
                    课程列表
                 </span>   
                    </Link>              
                </Menu.Item>
               
                <Menu.Item key="3">
                <Link href={{pathname:'/admin/cate/list'}}>
                <span>
                   <Icon type="mail" />                    
                    课程分类
                 </span>   
                    </Link>              
                </Menu.Item>
                <Menu.Item key="4">
                <Link href={{pathname:'/admin/order/list'}}>
                <span>
                   <Icon type="mail" />                    
                    订单列表
                 </span>   
                    </Link>              
                </Menu.Item>               

                <Menu.Item key="5">
                    <Icon type="appstore" />
                   退出系统
                </Menu.Item>

                </Menu>
                </div>
            </div>
            <style>{
                `
                body{
                    background: #f3f5f7;
                }
                
                `
            }</style>
        </div>
       
        )
    }
}