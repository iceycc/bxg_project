
import { Button } from 'antd'
import Head from 'next/head'
 
export default class home extends React.Component {
    render() { 
        return (<div>
            <Head>
                <title>首页</title>               
            </Head>
            <Button type="primary"> antd 按钮</Button>
        </div>)
    }
}