import React,{Component} from 'react'

import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 48 }} spin />

export default class LoadingComponent extends Component{
    render(){
        return <Spin indicator={antIcon} />
    }
}