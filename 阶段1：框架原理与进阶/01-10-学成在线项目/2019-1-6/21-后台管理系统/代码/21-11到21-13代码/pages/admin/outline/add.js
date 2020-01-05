import { Row, Col, Breadcrumb, Icon, message,Button, Input, Select,Form,Switch,Upload } from 'antd'
const Option = Select.Option;
const FormItem = Form.Item;
import Link from 'next/link'
import Router from 'next/router'
import {withRouter} from 'next/router'
import css from './list.less'
import fetchHelper from '../../../kits/fetchHelper.js'
import kits from '../../../kits/kits.js'

 class outlineadd extends React.Component {

    static async getInitialProps(){
        return {
            isadmin: true
        }
    }

    add = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values)
                values.goods_id = this.props.router.query.lessonid;
                values.parent_id = this.props.router.query.pid;
                values.parent_id = values.parent_id?values.parent_id:0;
                values.video_path = this.state.videoPath;
                values.code_path = this.state.codePath;
                values.notes_path = this.state.notesPath;

                fetchHelper.post('/ch/admin/addsectioninfo',values)
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
                    message.success('大纲数据新增成功',1,()=>{
                        Router.push({pathname:'/admin/outline/list',query:{lessonid:this.props.router.query.lessonid}})
                    })
        
                })
            }
        });
    }

    state = {
        // 视频路径
        videoPath:'',
         // 代码视路径
        codePath:'',
         // 讲义路径
        notesPath:''
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
                this.setState({
                    videoPath: file.response.message[0].path
                }) 
              }
            }
          };

          const codeprops = {
            action: fetchHelper.url+'/nc/admin/uploadfile',
            onChange:({ file, fileList }) => {
              if (file.status == 'done') {
                this.setState({
                    codePath: file.response.message[0].path
                }) 
              }
            }
          };

          const notesprops = {
            action: fetchHelper.url+'/nc/admin/uploadfile',
            onChange:({ file, fileList }) => {
              if (file.status == 'done') {
                this.setState({
                    notesPath: file.response.message[0].path
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
                    <Form onSubmit={this.add} className="form">
                         <FormItem {...formItemLayout} label="大纲名称">
                                    {getFieldDecorator('section_name', {
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
                            {getFieldDecorator('is_free',{valuePropName :'checked',initialValue:1})(
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
                                {this.state.videoPath}
                            </Upload>
                        </FormItem>
                        <FormItem {...formItemLayout} label="视频时长">
                                    {getFieldDecorator('video_time', {initialValue:'0',
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
                                {this.state.codePath}
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
                                {this.state.notesPath}
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

export default Form.create()(withRouter(outlineadd));