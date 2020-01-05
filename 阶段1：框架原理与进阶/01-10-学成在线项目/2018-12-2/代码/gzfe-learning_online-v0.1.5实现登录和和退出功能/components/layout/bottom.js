
// 导入Row,Col两个antd的组件
import {Row,Col,Button} from 'antd'

// 导入布局样式
import css from './layout.less'

export default class bottom extends React.Component {
    render(){
        return  (
            <div className={css.footer + " w"}>
            <Row >
              <Col span={12}>
              <div><img src="/static/img/asset-logoIco.png" alt="" /></div>
                    <div>学成网致力于普及中国最好的教育它与中国一流大学和机构合作提供在线课程。</div>
                    <div>© 2018年Inc.保留所有权利。-沪ICP备xxxxx号</div>
                    <Button type="primary" icon="download">下载</Button>
              </Col>
              <Col span={12}>
                <Row>
               
                <Col span={6} offset={6}>
                <dl className={css.dl}>
                            <dt>关于学成网</dt>
                            <dd>关于</dd>
                            <dd>管理团队</dd>
                            <dd>工作机会</dd>
                            <dd>客户服务</dd>
                            <dd>帮助</dd>
                        </dl>
                </Col>
                <Col span={6}>
                <dl className={css.dl}>
                        <dt>新手指南</dt>
                        <dd>如何注册</dd>
                        <dd>如何选课</dd>
                        <dd>如何拿到毕业证</dd>
                        <dd>学分是什么</dd>
                        <dd>考试未通过怎么办</dd>
                    </dl>
                </Col>
                <Col span={6}>
                <dl className={css.dl}>
                        <dt>合作伙伴</dt>
                        <dd>合作机构</dd>
                        <dd>合作导师</dd>
                    </dl>
                </Col>
                </Row>
              </Col>
            </Row>
            </div>
    )  
    }
}