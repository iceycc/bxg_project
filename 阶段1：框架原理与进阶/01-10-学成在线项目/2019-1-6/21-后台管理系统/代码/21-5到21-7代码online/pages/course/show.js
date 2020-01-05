import css from './show.less'
import Head from 'next/head'
import {withRouter} from 'next/router'
import Router from 'next/router'
import { Row, Col, Collapse, Icon, Tabs, Button, Modal, Badge,message,Pagination  } from 'antd'
const Panel = Collapse.Panel
const TabPane = Tabs.TabPane
import fetchHelper from '../../kits/fetchHelper.js'
import {fmtDate} from '../../kits/kits.js'

/** 此页面要实现的业务
 * 1、进入页面后要判断是否有登录
 *   解决方案：在组件生命周期方法 componentWillMount中去访问 api进行登录判断
 *      /nc/common/account/islogin
 * 
 * 2、调用api传入sid （小节id）获取到该小节的详细数据用于播放视频和资源下载
 *  解决方案：在组件生命周期方法 componentWillMount中去访问api:
 * /nc/course/courseDetial/getSectionInfo/参数1  其中参数1:代表的是sid
 * sid可以通过 this.props.router.query.sid
 * 
 * 3、调用api传入cid（课程id）获取该课程下面的所有章节数据
 *  解决方案：在组件生命周期方法 componentWillMount中去访问api:
 * /nc/course/courseDetial/getOutline/参数1 其中参数1:代表的是cid 课程id
 * cid可以通过 this.props.router.query.cid
 * 
 * 4、该小节问答区功能的实现
 *   4.1、实现分页获取该章节下的问答数据
 *      antd中的分页组件
 *      api：/nc/course/courseDetial/getSectionQAByPage/参数1?pageIndex=分页索引&pageSize=单页容量
 *      参数1：小节id，this.props.router.query.sid
 * 
 *      实现方案：
 *          定义一个方法：getQAByPate(sid,pageindex,pagesize) 在 componentWillMount和reload中被调用
 * 
 *   4.2、发布问题
 *      api:/ch/course/courseDetial/PostSectionQuestion  
 *       post请求：body格式：section_id	小节id  ->this.props.router.query.sid
                            content	问题详细描述：来源于问题输入文本框

 *   4.3、回答问题
 *  */
 class show extends React.Component {

    componentWillMount(){

        this.checkLogin();

        this.getSectionInfo(this.props.router.query.sid);

        this.getOutLine(this.props.router.query.cid);

        this.getQAByPate(this.props.router.query.sid,this.state.pageIndex,this.state.pageSize);
    }

    handleOk(qid){
        let rpconent = this.refs.rpContent.value;
        if(!rpconent || rpconent.length<=0){
            message.warn('回复问题内容不能为空');
            return;
        }

        let body = {
            section_id:this.props.router.query.sid,
            parent_id:qid,
            content:rpconent
        }

        fetchHelper.post('/ch/course/courseDetial/PostSectionResult',body)
        .then(json=>{
            if(json.status == 1){
                message.error(json.message,1);
                return;
            }
            // 成功逻辑的处理
            message.success('问题回答完毕',1,()=>{
                // 将回答框关闭同时情况回答内容
                this.refs.rpContent.value = '';
                this.setState({
                    visible:false
                }) 
                // 刷新列表
                this.getQAByPate(this.props.router.query.sid,this.state.pageIndex,this.state.pageSize);
            })
        })
    }

    openModel(){
        this.setState({
            visible:true
        }) 
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }

    // 4.1 实现分页获取该章节下的问答数据
    getQAByPate(sid,pageindex,pagesize){
        fetchHelper.get(`/nc/course/courseDetial/getSectionQAByPage/${sid}?pageIndex=${pageindex}&pageSize=${pagesize}`)
        .then(json=>{
            if(json.status == 1){
                message.error(json.message,1);
                return;
            }
            // 成功逻辑的处理
            this.setState({
                qaList:json.message,
                totalCount :json.totalCount
            })
        })
    }

    // 4.2 问题提交
    submitQ(){
        // 1. 获取问题内容
        let content = this.refs.questionContent.value;

        // 2.0 将数据提交到服务器
        let body={
            section_id:this.props.router.query.sid,
            content:content
        }
        fetchHelper.post('/ch/course/courseDetial/PostSectionQuestion',body)
        .then(json=>{
            if(json.status == 1){
                message.error(json.message,1);
                return;
            }
            // 成功逻辑的处理
            message.success('问题提交成功',1,()=>{
                this.refs.questionContent.value = '';
                this.getQAByPate(this.props.router.query.sid,this.state.pageIndex,this.state.pageSize)
            })
            
        })
    }

    pageChange(pageindex,pagesize){
        this.setState({
            pageIndex:pageindex,
            pageSize:pagesize
        })
        this.getQAByPate(this.props.router.query.sid,pageindex,pagesize)
    }

    // 3.0 调用api传入cid（课程id）获取该课程下面的所有章节数据
    getOutLine(cid){
        fetchHelper.get('/nc/course/courseDetial/getOutline/'+cid)
        .then(json=>{
            if(json.status == 1){
                message.error(json.message,1);
                return;
            }

            if(json.status == 0 ){
                this.setState({
                    outlineList:json.message
                })
            }
        })
    }

    // 3.0.1 重新根据用户的点击小节加载该小节数据
    reload(sid){
        Router.push({pathname:'/course/show',query:{sid:sid,cid:this.props.router.query.cid}});
        
        // 注意点：就算浏览器的地址栏中的参数发生了改变，但是url的路径没有改变，所以ract认为是同一个页面不会被刷新
        // 解决点：手动调用请求资源的方法来解决资源刷新问题即可
        this.getSectionInfo(sid);
    }

    // 1.0 判断用户是否有登录
    checkLogin(){
        fetchHelper.get('/nc/common/account/islogin')
        .then(json=>{
            if(json.status == 2){
                message.warn(json.message,1,()=>{
                    Router.push({pathname:'/account/login'})
                })
            }
        })
    }

    // 2.0 调用api传入sid （小节id）获取到该小节的详细数据用于播放视频和资源下载
    getSectionInfo(sid){
        fetchHelper.get('/nc/course/courseDetial/getSectionInfo/'+sid)
        .then(json=>{
            if(json.status == 1){
                message.error(json.message,1);
                return;
            }

            if(json.status == 0 ){
                this.setState({
                    sectionInfo:json.message
                })
            }
        })
    }

    state = {
        // 负责存储当前小节的详细数据
        sectionInfo:null,
        // 存储课程下面的所有一级和二级章节
        outlineList:null,
        // 某个小节下的问答数据数组
        qaList:null,
        pageIndex:1,
        pageSize:1,
        totalCount:0,
        visible:false
    }


render() {
        return (<div style={{ minHeight: 800 }}>
            <Head>
                <title>学成在线-课程播放</title>
            </Head>

            {/* 1.0 视频播放区-begin */}
            <div className={css.article_banner}>
            <Row>
    <Col span="19">
      <div className={css.video_box}>
        <video src={this.state.sectionInfo && this.state.sectionInfo.video_path}
          controls="controls" 
          ></video>
      </div>
    </Col>
    <Col span="5">
      <div className={css.section + " section"}>
        {/* 折叠面板 */}
        <Collapse defaultActiveKey={["0"]} >
            {
                this.state.outlineList 
                && this.state.outlineList.filter(c=>c.parent_id == 0).map((item,index)=>(
                    <Panel header={item.section_name} key={index}>
                    <Row className={css.sesionUl} type="flex">
                    
                      {
                           this.state.outlineList 
                           && this.state.outlineList.filter(c=>c.parent_id == item.id)
                           .map((item1,index1)=>(
                            <Col span="24">
                                <a onClick={()=>{this.reload(item1.id)}}
                                className={item1.id==this.props.router.query.sid?css.active:''}
                                 key={item1.id}>
                                    <Icon type="play-circle" /> {item1.section_name}<span style={{color:'red'}}> (免费)</span>
                                </a>
                            </Col>   
                           ))
                      }
                                                     
                    </Row>
                  </Panel>
                ))
            }
         
        </Collapse>
        {/* 折叠面板 */}
      </div>
    </Col>
  </Row>
            </div>
            {/* 1.0 视频播放区-end */}
	
            {/* 2.0 章节问答，章节资源-begin */}
            <div className={css.article_cont}>
            <Row>
                    <Col span="20">
                        <div className={css.tit_list}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={<span><Icon type="file-text" />章节问答</span>} key="1">
                                    {/*
            dangerouslySetInnerHTML = {{ __html:this.props.courseInfo.CourseDetial.content }}
            可以实现html代码的渲染
          */}
                                    <div className={css.tabp}>
                                    {/* 问题发布区域-being */}
                                        <div className={css.content_title}>
                                            <textarea ref="questionContent" placeholder="请输入你的问题" style={{ height: 100, width: 600, padding: 5 }}></textarea>
                                            <br /> <Button type="primary" onClick={()=>{this.submitQ()}}>提交</Button> 
                                            <Button onClick={() => { this.refs.questionContent.value = "" }} type="primary">重置</Button>
                                        </div>
                                    {/* 问题发布区域-end */}
                                        {
                                            this.state.qaList &&
                                            this.state.qaList.map((item,index)=>(
                                            <div className={css.item}>
                                            <div className={css.item_left}>
                                                <p>{item.user_name}</p>
                                            </div>
                                            <div className={css.item_right}>
                                                <div dangerouslySetInnerHTML = {{ __html:item.content }} className={css.title}></div>
                                                {/* 问题回答区域 */}
                                                <Button type="primary" ghost onClick={()=>{this.openModel()}} >我来回答</Button>
                                                <Modal
                                                    title="问题回复"
                                                    visible={this.state.visible}
                                                    onOk={()=>{this.handleOk(item.id)}}
                                                    onCancel={()=>{this.handleCancel()}}
                                                >
                                                    <textarea ref="rpContent" placeholder="请输入你的答案" style={{ height: 100, width: 480, padding: 5 }}></textarea>

                                                </Modal>
                                                {/* 问题回答区域 */}
                                                <Collapse className={css.replay} bordered={false}>
                                                <Panel showArrow={false} header={<Row><Col span="20">{fmtDate(item.add_time)}</Col><Col className={css.action_box} span="4"><Icon type="message" /> 回答 {item.reply_count}</Col></Row>} key={index}>
                                                {
                                                    item.replyList.map((repitem,index1)=>(
                                                        <span> 
                                                        <p className={css.title}> <Badge count={index1+1} style={{ backgroundColor: '#52c41a', boxShadow: '0 0 0 1px #d9d9d9 inset' }} /><span>{repitem.user_name}</span><span >{fmtDate(repitem.add_time)}</span></p>
                                                        <div dangerouslySetInnerHTML = {{ __html:repitem.content }} className={css.content}></div>
                                                     </span>
                                                    ))
                                                }
                                                 </Panel>
                                                   
                                                </Collapse>
                                            </div>
                                        </div>
                                            ))
                                        }

                                        <Pagination defaultCurrent={this.state.pageIndex} 
                                        defaultPageSize={this.state.pageSize} 
                                        total={this.state.totalCount} 
                                        onChange={(pageindex,pagesize)=>{this.pageChange(pageindex,pagesize)}} /> 

                                    </div>

                                </TabPane>

                                <TabPane tab={<span><Icon type="usergroup-add" />章节资源</span>} key="2">
                                    <div className={css.tabp}>
                                        <a href={this.state.sectionInfo && this.state.sectionInfo.code_path}>章节代码下载</a> |
                                        <a href={this.state.sectionInfo && this.state.sectionInfo.notes_path}>章节文档下载</a>
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
            {/* 2.0 章节问答，章节资源-end */}
            <style>{`
               .section .ant-collapse,.section .ant-collapse-content {
                    background-color:#000;
                    color:#fff;
                    border:none;
                }
                .section .ant-collapse > .ant-collapse-item > .ant-collapse-header,.section .ant-collapse-content {
                    color:#fff;
                }    
                .section .ant-collapse > .ant-collapse-item{
                    border-bottom:none;
                }     
                .section .ant-collapse-content > .ant-collapse-content-box {
                    padding:0 0 0 26px;
                }
                `}       
            </style>
        </div>)
    }
}

// this.props.router.query.key名称获取url参数值
export default withRouter(show)