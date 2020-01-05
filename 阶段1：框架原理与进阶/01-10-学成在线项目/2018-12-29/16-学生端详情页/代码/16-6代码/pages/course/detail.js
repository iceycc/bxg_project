// 实现页面获取url传入参数值步骤1：导入withRouter方法
import { withRouter } from 'next/router'

import css from './detail.less'

import { Icon, Row, Col, Tabs, Collapse, message } from 'antd'
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
let seciontArr = []
import fetchHelper from '../../kits/fetchHelper.js'

// 详情  -课程ID= {this.props.router.query.cid}
/**
 * 将详情页面中除了课程大纲之外的其他数据获取到并且展示的思路：
 * 1、数据来源于接口：/nc/course/courseDetial/getCourseDetial/课程id
 * 2、利用 getInitialProps方法去获取数据，数据会自动存储到props.pageProps中
 * 3、在render中获取回来的数据渲染到页面中
 *  */
class detail extends React.Component {

    // 在getInitialProps方法中可以通过{query}方式获取到浏览器url传入的参数值
    static async getInitialProps({ query }) {
        let cid = query.cid
        let url = `/nc/course/courseDetial/getCourseDetial/${cid}`

        let result = await fetchHelper.get(url)
        return {
            // 面包屑导航
            blist: result.message.BreadCrumbs,
            courseInfo: result.message.CourseDetial
        }
    }

    // 生命周期方法
    componentWillMount() {
        // 根据课程id获取大纲数据
        this.getSectionList()
    }

    // 根据课程id获取大纲数据
    getSectionList() {
        let url = `/nc/course/courseDetial/getOutline/${this.props.router.query.cid}`
        fetchHelper.get(url).then(json => {
            if (json.status == 1) {
                message.error(json.message)
            } else {
                // 成功就要将数据赋值给state中的slist
                this.setState({
                    // slist中的数据既包括章节数据(parnet_id =0）也包括小节数据(parnet_id >0)
                    slist: json.message
                })

                // 获取到当前课程一级大纲数据的数据，初始化到seciontArr
                if (json.message && json.message.length > 0) {
                    let count = json.message.filter(item => item.parent_id == 0).length;
                    // 初始化到seciontArr
                    for (var i = 0; i < count; i++) {
                        seciontArr.push(i.toString())
                    }
                }

            }
        })
    }

    state = {
        slist: null
    }

    render() {
        return (<div style={{ minHeight: 800 }}>
            {/* 1.0 课程详情banner部分-begin */}
            <div className={css.article_banner}>
                <div className={css.banner_bg}></div>
                <div className={css.banner_info}>
                    <div className={css.banner_left}>
                        <p>
                            {
                                this.props.pageProps.blist && this.props.pageProps.blist.map((item, i) => (
                                    <span key={i}>{this.props.pageProps.blist.length - 1 == i ? item.title : item.title + ' \\ '}</span>
                                ))
                            }
                        </p>
                        <p className={css.tit}>{this.props.pageProps.courseInfo.title}</p>
                        <p className={css.pic}><span className={css.new_pic}>特惠价格￥{this.props.pageProps.courseInfo.sell_price}</span>
                            <span className={css.old_pic}>原价￥{this.props.pageProps.courseInfo.market_price}</span></p>
                        <p className={css.info}>
                            <a href="#">加入购物车</a>
                            <span><em>难度等级</em>{this.props.pageProps.courseInfo.lesson_level}</span>
                            <span><em>课程时长</em>{this.props.pageProps.courseInfo.lesson_time}</span>
                            <span><em>评分</em>{this.props.pageProps.courseInfo.lesson_star}分</span>
                            <span><em>授课模式</em>{this.props.pageProps.courseInfo.leson_type}</span>
                        </p>
                    </div>
                    <div className={css.banner_rit}>
                        <p><img src="/static/img/widget-video.png" alt="" /> </p>
                        <p className={css.vid_act}><span>
                            <Icon type="plus-square" theme="outlined" />收藏 23 </span>
                            <span>分享 <Icon type="share-alt" theme="outlined" /></span></p>
                    </div>
                </div>
            </div>
            {/* 1.0 课程详情banner部分-end */}

            {/* 2.0 课程详情、课程大纲、授课老师、常见问题-begin */}
            <div className={css.article_cont}>
                <Row>
                    <Col span="20">
                        <div className={css.tit_list}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={<span><Icon type="file-text" />课程详情</span>} key="1">
                                    {/*
                                        dangerouslySetInnerHTML = {{ __html:this.props.courseInfo.CourseDetial.content }}
                                        可以实现html代码的渲染
                                    */}
                                    <div className={css.tabp} dangerouslySetInnerHTML={{ __html: this.props.pageProps.courseInfo.content }}>

                                    </div>

                                </TabPane>
                                <TabPane tab={<span><Icon type="bars" />课程大纲</span>} key="2">
                                    <div className={css.tabp}>
                                        <Collapse defaultActiveKey={seciontArr}>
                                            {/* Panel其实是要通过slist中的parnent_id =0 的数据来生成 */}
                                            {
                                                this.state.slist
                                                && this.state.slist.filter(item => item.parent_id == 0).map((item, index) => (
                                                    <Panel header={item.section_name} key={index}>
                                                        <Row className={css.sesionUl}>
                                                            {/* Col其实是用通过slist中的当前这一个章节下面的小节数据来生成的 */}
                                                            {
                                                                this.state.slist
                                                                && this.state.slist.filter(item1 => item1.parent_id == item.id)
                                                                    .map((item2, index2) => (
                                                                        <Col span="12">
                                                                            <a href="#">{item2.section_name}</a>
                                                                        </Col>
                                                                    ))
                                                            }

                                                        </Row>
                                                    </Panel>
                                                ))
                                            }

                                        </Collapse>
                                    </div>
                                </TabPane>
                                <TabPane tab={<span><Icon type="usergroup-add" />授课老师</span>} key="3">
                                    <div className={css.tabp}>
                                        <Row>
                                            <Col span="3"><img src={this.props.pageProps.courseInfo.teacher_img} alt="讲师" width="120px" height="120px" /></Col>
                                            <Col span="21">
                                                <Row> <Col span="24">{this.props.pageProps.courseInfo.teacher_name}</Col></Row>
                                                <Row> <Col span="24" style={{ fontWeight: 'bold' }}>{this.props.pageProps.courseInfo.teacher_desc}</Col></Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </TabPane>
                                <TabPane tab={<span><Icon type="question-circle" />常见问题</span>} key="4">
                                    <div className={css.tabp} dangerouslySetInnerHTML={{ __html: this.props.pageProps.courseInfo.common_question }}>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>

                    <Col span="4">
                        <div className={css.tit_list}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={<span><Icon type="book" />学成在线云课堂</span>} key="1">
                                    <p className={css.tabp}>
                                        学成在线整合线下优质课程和纯熟的教学经验，开展在线教育，突破空间、地域、时间、费用的限制，让优质教育资源平等化。
            </p>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>
            {/* 2.0 课程详情、课程大纲、授课老师、常见问题-end */}
        </div>)
    }
}

// 实现页面获取url传入参数值步骤2：利用withRouter将detail类进行包装后
// 就能够自动的将url参入的参数附加到 this.props.router.query对象中
// query对象中的属性名称和url传入参数的key同名  
// 例如： url: /course/detail?cid=102  在render函数中可以通过 this.props.router.query.cid获取到102这个值
export default withRouter(detail)