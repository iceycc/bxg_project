import { connect } from 'react-redux'
import css from './mycourse.less'
import { Row, Col, message, Affix, Menu, Icon } from 'antd'
import Head from 'next/head'
import MyLeft from './left.js'
import fetchHelper from '../../kits/fetchHelper.js'
import Router from 'next/router'
import { fmtDate } from '../../kits/kits.js'

class courselist extends React.Component {

    state = {
        top: 80,
        currentCourse: null,
        CourseList: null
    }

    // 在生命周期函数中请求数据
    componentWillMount() {
        this.getcourse()
    }

    getcourse() {
        fetchHelper.get('/ch/mycenter/getMyCourseList')
            .then(json => {
                // 未登录处理
                if (json.status == 2) {
                    message.warn('您未登录', 1, () => {
                        Router.push({ pathname: '/account/login' })
                    })
                    return
                }

                // 错误处理
                if (json.status == 1) {
                    message.error(json.message, 1)
                    return
                }

                // 成功
                this.setState({
                    currentCourse: json.message.currentCourse,
                    CourseList: json.message.CourseList
                })

            })
    }

    render() {
        return (<div style={{ minHeight: 800 }}>
            <Head>
                <title>学成在线-我的课程</title>

            </Head>
            {/* 顶部banner */}
            <div className={css.personal_header}></div>
            {/* 顶部banner */}

            {/* 内容布局 */}
            <div className={css.container}>
                {/* 左边菜单 */}
                <Row>
                    <Col span="6">
                        <Affix offsetTop={this.state.top}>
                            <MyLeft></MyLeft>
                        </Affix>
                    </Col>
                    {/* 左边菜单 */}

                    {/* 右边内容 */}
                    <Col span="18">
                        <div className={css.personal_content + " " + css.pull_right}>
                            <div className={css.personal_cont}>
                                <div class="top">
                                    <div className={css.tit}><span>当前课程</span></div>
                                    <div className={css.top_cont}>
                                        <div className={css.col_lg_8}>
                                            <div className={css.imgIco}><img src="/static/img/asset-timg.png" width="60" height="28" alt="" /></div>
                                            <div className={css.title}><span className={css.lab}>继续学习</span> {this.state.currentCourse && this.state.currentCourse.goods_title} <span className={css.status}>学习中</span></div>
                                            <div className={css.about}><span className={css.lab}>正在学习</span> {this.state.currentCourse && this.state.currentCourse.last_section_name} </div>
                                            <div className={css.about}> <span className={css.status}>有效日期: {this.state.currentCourse && fmtDate(this.state.currentCourse.begin_time)} ~ {this.state.currentCourse && fmtDate(this.state.currentCourse.end_time)}</span></div>

                                        </div>
                                        <div className={css.division}></div>
                                        <div className={css.col_lg_4}>
                                            <a href="#" className={css.goLear}> 继续学习</a>
                                            {/* <a href="#" className={css.evalu}> 课程评价</a> */}
                                            <div className={css.aft}>● ● ●
                            </div>
                                        </div>
                                        <div className={css.clearfix}></div>
                                    </div>


                                    <div className={css.tit}><span>我的课程</span></div>
                                    {
                                        this.state.CourseList && this.state.CourseList.map((item, index) => (
                                            <div className={css.top_cont}>
                                                <div className={css.col_lg_8}>
                                                    <div className={css.imgIco}><img src="/static/img/asset-timg.png" width="60" height="28" alt="" /></div>
                                                    <div className={css.title}><span className={css.lab}>继续学习</span> {item.goods_title} <span className={css.status}>学习中</span></div>
                                                    <div className={css.about}><span className={css.lab}>正在学习</span> {item.last_section_name} </div>
                                                    <div className={css.about}> <span className={css.status}>有效日期: {fmtDate(item.begin_time)} ~ { fmtDate(item.end_time)}</span></div>

                                                </div>
                                                <div className={css.division}></div>
                                                <div className={css.col_lg_4}>
                                                    <a href="#" className={css.goLear}> 继续学习</a>
                                                    {/* <a href="#" className={css.evalu}> 课程评价</a> */}
                                                    <div className={css.aft}>● ● ●
                            </div>
                                                </div>
                                                <div className={css.clearfix}></div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </Col>
                    {/* 右边内容 */}
                </Row>
            </div>
            {/* 内容布局 */}
        </div>)
    }
}


const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({ type: 'CHANGE_COLOR', color: color })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(courselist)