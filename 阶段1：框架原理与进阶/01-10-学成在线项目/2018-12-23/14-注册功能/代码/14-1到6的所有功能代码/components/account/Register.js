
import css from '../../pages/account/login.less'
import fetchHelper from '../../kits/fetchHelper.js'

// 导入antd中的所有当前页面需要的组件
import { Icon, Row, Col, Form, Input, Button, message } from 'antd'
const FormItem = Form.Item;

class Register extends React.Component {

    // 1.0 定义一个register方法用来注册用户
    register = (e) => {
        // 为了能够正常验证表单，需要做两件事情:
        // 1.0 利用getFieldDecorator 来进行表单元素合法性检查
        // 2.0 在onSubmit指定的方法中利用this.props.form.validateFieds()来进行表单合法性检查的触发动作
        e.preventDefault(); //阻止默认事件触发
        this.props.form.validateFields((err, values) => {
            // 如果err有值则表示验证报错，否则values就会将表单中的所有元素的值获取到
            if (!err) {
                // 处理正常的注册逻辑
                this.checkuser(()=>{
                    // 将用户输入的注册信息提交给服务器完成注册动作
                    console.log('发起注册请求')
                });
            }
        })
    }

    // 定义手机号码是否已经被注册逻辑
    checkuser(callback){
        // 1.0 获取注册手机号码文本框的内容
        let tel = this.props.form.getFieldValue('user_name')

        // 2.0 将手机号码传入到服务器 /nc/common/account/checkuser
        fetchHelper.post('/nc/common/account/checkuser',{username:tel})
        .then(json=>{
            if(json.status == 1){
                message.error('服务器处理异常',1)
            }else{
                // 正常的处理
                // 3.0 如果服务器响应回来的 message.isRegister为true 的话则应该提示用户该手机号码被注册了
                if(json.message.isRegister){
                    this.props.form.setFields({
                        ['user_name']: {value:tel , errors: [new Error('手机号码被注册，请更换')] }
                      })
                }else{
                    // 当前手机号码可以使用
                    if(typeof callback === 'function'){
                        callback()
                    }
                }
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form ref="register" onSubmit={this.register} className={css.login_form}>
                <FormItem>
                    {getFieldDecorator('user_name', {
                        rules: [{ required: true, message: '请输入手机号码' },
                        { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '用户名必须符合手机格式!' }
                        ]
                    })(
                        <Row>
                            <Col span="14">
                                <Input onBlur={this.checkuser.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入注册时的手机号码" />
                            </Col>
                            <Col span="1">
                                <Button disabled={false} type="primary" >获取验证码</Button>
                            </Col>
                        </Row>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('sns_code', {
                        rules: [{ required: true, message: '请输入验证码!' }
                        ],
                    })(
                        <Input prefix={<Icon type="eye" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入验证码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password1', {
                        rules: [{ required: true, message: '请再一次输入密码!' }],
                    })(
                        <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                </Button>
                </FormItem>
            </Form>

        )
    }
}

// 包装以后，就会在Register组件的props上挂在一个form对象
export default Form.create()(Register);