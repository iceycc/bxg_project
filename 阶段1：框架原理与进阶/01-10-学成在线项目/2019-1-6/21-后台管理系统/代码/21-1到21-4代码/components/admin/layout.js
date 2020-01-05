
import Head from '../layout/head.js'
import Left from './left.js'
import {Row,Col} from 'antd'

export default class adminlayout extends React.Component {
    render(){
        const {Component, ...pageProps} = this.props;
        return <div>
            <div className="xc_top"><Head></Head></div>
            <div className="xc_mid">
                <Row className="row">
                    <Col span="4">
                     <Left mid={this.props.mid}></Left>
                    </Col>
                    <Col span="20">
                        <Component {...pageProps} />
                    </Col>
                </Row>
               </div>
               <style>{`
                .row{
                    margin-top:10px
                }
               `}</style>
        </div>
    }
}