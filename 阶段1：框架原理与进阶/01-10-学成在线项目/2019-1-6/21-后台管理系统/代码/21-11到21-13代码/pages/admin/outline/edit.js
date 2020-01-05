import { Row, Col, Breadcrumb, Icon, message,Button, Input, Select,Form,Switch,Upload } from 'antd'
const Option = Select.Option;
const FormItem = Form.Item;
import Link from 'next/link'
import Router from 'next/router'
import {withRouter} from 'next/router'
import css from './list.less'
import fetchHelper from '../../../kits/fetchHelper.js'
import kits from '../../../kits/kits.js'

 class edit extends React.Component {

    static async getInitialProps(){
        return {
            isadmin: true
        }
    }

    edit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values) 编辑业务
                values.id = this.state.info.id;
                values.parent_id =  this.state.info.parent_id;
                values.video_path = this.state.info.video_path;
                values.code_path = this.state.info.code_path;
                values.notes_path = this.state.info.notes_path;

                // 实现编辑业务
                fetchHelper.post('/ch/admin/editsectioninfo',values)
                .then(json=>{
                    if(json.status == 2){
                        message.warn('请先登录',1,()=>{
                            Router.push({pathname:'/account/login'})
                        })
                        return;
                    }
        
                    if(json.status == 1){
                        message.warn(json.message,1)
                        return;
                    }

                    // 成功逻辑

                        message.success('大纲数据编辑成功',1,()=>{
                            Router.push({pathname:'/admin/outline/list',query:{lessonid:this.props.router.query.lessonid}})
                        })
                })
                
            }
        });
    }

    componentWillMount(){
        this.getOutlineInfo(this.props.router.query.id)
    }

    getOutlineInfo(id){
        fetchHelper.get('/ch/admin/getsectioninfoById/'+id)
        .then(json=>{
            if(json.status == 2){
                message.warn('请先登录',1,()=>{
                    Router.push({pathname:'/account/login'})
                })
                return;
            }

            if(json.status == 1){
                message.warn(json.message,1)
                return;
            }

            // 成功处理逻辑
            this.setState({
                info:json.message[0]
            })
        })
    }

    state = {    
        // 格式：
        /**
         *  {"id": 3,
            "goods_id": 102,
            "parent_id": 2,
            "section_sortid": 1,
            "section_name": "1-vue指令",
            "is_free": 1,
            "video_path": "http://157.122.54.189:9092/upload/201809/19/201809191620139216.mp4",
            "video_time": 8.5,
            "code_path": "http://157.122.54.189:9092/upload/201809/19/testvuecli.rar",
            "notes_path": "http://157.122.54.189:9092/upload/201809/19/jy.rar",
            "add_time": "2018-09-19T07:47:38.000Z",
            "class_list": ",2,3,",
            "class_layer": "2"} */
       info:null
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 12 },
            },
        };

        const videoprops = {
            action: fetchHelper.url+'/nc/admin/uploadfile',
            onChange:({ file, fileList }) => {
              if (file.status == 'done') {
                  let tmpinfo = this.state.info;
                  tmpinfo.video_path = file.response.message[0].path
                this.setState({
                    info: tmpinfo
                }) 
              }
            }
          };

          const codeprops = {
            action: fetchHelper.url+'/nc/admin/uploadfile',
            onChange:({ file, fileList }) => {
              if (file.status == 'done') {
                let tmpinfo = this.state.info;
                  tmpinfo.code_path = file.response.message[0].path
                this.setState({
                    info: tmpinfo
                }) 
              }
            }
          };

          const notesprops = {
            action: fetchHelper.url+'/nc/admin/uploadfile',
            onChange:({ file, fileList }) => {
              if (file.status == 'done') {
                let tmpinfo = this.state.info;
                  tmpinfo.notes_path = file.response.message[0].path
                this.setState({
                    info: tmpinfo
                }) 
              }
            }
          };

        return (<div style={{ minHeight: 800, backgroundColor: 'white', marginRight: '20px' }}>      
                <Row>
                {/* 1.0 面包屑 */}
                <Col className={css.mg} span="24">
                <Breadcrumb>
                    <Breadcrumb.Item href="/index">
                    <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                    <Link href={{ pathname: '/admin/course/clist' }}>
                        <span>
                        <Icon type="appstore" />
                        <span>课程管理</span></span>
                    </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                    <Link href={{ pathname: '/admin/outline/list',query:{lessonid:this.props.router.query.lessonid} }}>
                        <span>
                        <Icon type="appstore" />
                        <span>大纲列表</span></span>
                    </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <Icon type="add" />
                    <span>新增大纲</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <p className={css.line}></p>
                </Col>
            </Row>

              {/* 2.0 新增 */}
              <Row>
                <Col className={css.mg} span="24">
                课程id：{this.props.router.query.lessonid}
                    <Form onSubmit={this.edit} className="form">
                         <FormItem {...formItemLayout} label="大纲名称">
                                    {getFieldDecorator('section_name', {
                                        initialValue: this.state.info && this.state.info.section_name,
                                        rules: [{ required: true, message: '请输入大纲名称!' }],
                                    })(
                                        <Input placeholder="请输入大纲名称" />
                                        )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="排序号">
                                    {getFieldDecorator('section_sortid', {initialValue:'99',
                                        rules: [{ required: true, message: '请输入排序号!' }],
                                    })(
                                        <Input placeholder="请输入排序号" />
                                        )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="是否免费">
                            {getFieldDecorator('is_free',{valuePropName :'checked',
                                initialValue:this.state.info && this.state.info.is_free})(
                                <Switch checkedChildren="1" unCheckedChildren="0"  />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="本节视频"
                            extra="">
                            <Upload {...videoprops}>
                                <Button>
                                    <Icon type="upload" /> 点击上传
                                </Button>
                                {this.state.info && this.state.info.video_path}
                            </Upload>
                        </FormItem>
                        <FormItem {...formItemLayout} label="视频时长">
                                    {getFieldDecorator('video_time', {
                                        initialValue: this.state.info && this.state.info.video_time,
                                        rules: [{ required: true, message: '请输入视频时长(单位：分钟)!' }],
                                    })(
                                        <Input placeholder="请输入视频时长(单位：分钟)" />
                                        )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="本节代码"
                            extra="">
                            <Upload {...codeprops}>
                                <Button>
                                    <Icon type="upload" /> 点击上传
                                </Button>
                                {this.state.info && this.state.info.code_path}
                            </Upload>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="本节讲义"
                            extra="">
                            <Upload {...notesprops}>
                                <Button>
                                    <Icon type="upload" /> 点击上传
                                </Button>
                                {this.state.info && this.state.info.notes_path}
                            </Upload>
                        </FormItem>
                        <FormItem {...formItemLayout}>
                            <Row>
                                <Col span="5"></Col>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    提交
                                </Button>
                              
                            </Row>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>)
    }
}

export default Form.create()(withRouter(edit));