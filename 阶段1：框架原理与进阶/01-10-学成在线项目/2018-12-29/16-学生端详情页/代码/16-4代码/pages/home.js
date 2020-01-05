
import { Button } from 'antd'
import Head from 'next/head'

import {connect} from 'react-redux'

import fetchHelper from '../kits/fetchHelper.js'
import { list } from 'postcss';

 class home extends React.Component {

    /**
     * 浏览器请求数据接口步骤：
     * 1、定义url
     * 2、利用fetchHelper.get方法请求数据
     * 3、将1,2步中的代码写到react生命周期函数中 componentWillMount，因为这个方法会在render之前调用
     * 所以在render中使用数据的时候，已经从componentWillMount获取回来了
     * 3、在render中将面包屑数据利用ul标签生成展示出来
     *  */

     state = {
         blist:null
     }

    componentWillMount(){
        let url = '/nc/course/courseDetial/getCourseDetial/102'
        fetchHelper.get(url)
        .then(json=>{
            // json格式：
            this.setState({
                blist:json.message.BreadCrumbs
            })
        })
    }


    render() { 
        return (<div>
            <Head>
                <title>首页</title>               
            </Head>
            <span style={{color:this.props.testReducer.color}}>home</span>
            <Button type="primary"> antd 按钮</Button>

            {/* 获取this.state.blist数据展示在界面上 */}
            <ul>
                {this.state.blist && this.state.blist.map(item=>(
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>)
    }
}



const mapStateToProps = (state)=>{
    return {
      ...state
    }
  }
export default  connect(mapStateToProps)(home)
