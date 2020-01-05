
import css from '../../pages/account/login.less'
import fetchHelper from '../../kits/fetchHelper.js'

// 导入antd中的所有当前页面需要的组件
import { Icon, Row, Col, Form, Input, Button, message } from 'antd'
const FormItem = Form.Item;

// 定义倒计时变量
let time = 5;
let interHander = null;

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
                    // console.log('发起注册请求')
                    // 1.0 默认注册的是普通用户
                    values.role = 0;
                    // 2.0 通过featch请求将values数据提交给服务器
                    fetchHelper.post('/nc/common/account/register',values)
                    .then(json=>{
                        if(json.status ==1){
                            message.error(json.message,1)
                        }else{
                            message.success(json.message.text,1,()=>{
                                // 3.0 刷新页面
                                window.location = window.location;
                            })
                        }
                    })
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

    // 获取短信验证码
    getSMSCode(){
        // 1.0 获取用户输入的手机号码
        let tel = this.props.form.getFieldValue('user_name')

        // 1.0.1 判断用户必须输入手机号码
        if(!tel || tel.length <= 0){
            message.warn('用户手机号必须输入');
            return;
        }

        // 2.0 调用短信接口将手机号码传入
        fetchHelper.post('/nc/common/account/snscode',{username:tel})
        .then(json=>{
            if(json.status == 1){
                // 提示用户服务器处理异常
                message.error(json.message,1)
                this.setButtonState()
            }else{
                // 服务器处理成功
                message.success(json.message.reason,2);
                this.setButtonState()
            }
        })
    }

    // 定义一个方法用来控制按钮的是否可点击状态和倒计时功能
    setButtonState(){
        // 1.0.1 将获取验证码按钮变为不可点击状态
        this.setState({
            isClick:true
        })

        // 1.0.2 开启倒计时功能，当倒计时到0秒的时候按钮重新可以点击
        interHander = setInterval(()=>{
            // 1.0 将time的值减掉1
            time--;

            // 1.0.1 当time变为<=0的时候应该讲获取验证码按钮变为可点击的状态,同时关闭当前定时器
            if(time<=0){
                this.setState({
                    isClick:false,
                    bttxt:'获取验证码' 
                })

                // 关闭当前定时器
                if(interHander){
                    clearInterval(interHander)
                }
                return;
            }

            // 2.0 将time和一个固定的文本“秒后再次获取”替换按钮中的文本
            let newBttxt = `${time}秒后再次获取`;
            this.setState({
                bttxt:newBttxt
            });

        },1000)
    }

    // 1.0 定义一个state
    state = {
        bttxt:'获取验证码',
        isClick:false // 表示获取验证码按钮初始情况下是可以被点击的
    }

    // 定义一个密码是否一致的函数，来判断再次输入密码框中的密码字符串必须与密码框中的密码字符串一致
    /**
     * rule:规则对象
     * value: 使用checkpwd这个函数对应的控件值（此处是再次输入密码文本框的值）
     * callback：是一个回调，如果需要callback提示用户异常信息，就这么写： callback('两次输入的密码不一致')
     * 如果验证通过，直接callback()即可，里面不需要传入任何提示语字符串
     *  */
    checkpwd(rule, value, callback){
        // 1.0 获取密码框中的密码字符串
        let pwd = this.props.form.getFieldValue('password')
        // 2.0 对比两次输入的密码算法相同
        if(value != pwd){
            callback('两次输入的密码不一致')
        }else{
            // 通过检查
            callback()
        }
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
                                <Button disabled={this.state.isClick} type="primary" onClick={this.getSMSCode.bind(this)} >{this.state.bttxt}</Button>
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
                        rules: [{ required: true, message: '请再一次输入密码!' }
                    ,{
                        // 自定义验证：保证再次属于密码和密码框中的密码保持一致
                        validator:this.checkpwd.bind(this)
                    }],
                    })(
                        <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请再一次输入密码" />
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