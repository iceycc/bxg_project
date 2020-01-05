import { Row, Col, Breadcrumb, Icon,Table, message,Button, Input, Select, Checkbox,Pagination } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import css from './list.less'
import fetchHelper from '../../../kits/fetchHelper.js'
import kits from '../../../kits/kits.js'
import {withRouter} from 'next/router'

let treeData = [];

 class outlinelist extends React.Component {

    static async getInitialProps(){
        return {
            isadmin: true
        }
    }

    columns = [
        {title: '编号',dataIndex: 'id',key: 'id',},
        {title: '名称',dataIndex: 'section_name',key: 'section_name',},
        {title: '免费试学',dataIndex: 'is_free',key: 'is_free',render:(isfree)=>{
           return isfree==1?<span>免费</span>:<span>收费</span>
        }},
        {
            title: '操作', dataIndex: 'id', key: 'id', render: (id,row) => { 
            return <span>
                    <a className={css.a} onClick={()=>{
                        Router.push({pathname:'/admin/outline/edit',query:{
                            id:id,pid:row.parent_id,
                            lessonid:row.goods_id
                        }})
                    }}>编辑</a> 
                   <a className={css.a} href="javascript:;"> | 删除</a>
                {
                    row.parent_id == 0?<a className={css.a} 
                    onClick={()=>{Router.push({pathname:'/admin/outline/add',query:{lessonid:this.props.router.query.lessonid,
                    pid:id}})}}> | 新增子级章节</a>
                    :''
                }
                    
                    </span>
            }
        }
    ];

    state = {
        datas : []
    }
    

    componentWillMount(){
        // 调用获取大纲数据的api:/ch/admin/getsectionlist/参数1  参数1：课程id
        this.getOutline(this.props.router.query.lessonid);
    }

    getOutline(leid){
        fetchHelper.get('/ch/admin/getsectionlist/'+leid)
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

            // 正常处理逻辑:获取1级大纲数据
            treeData = []
            this.initTreeData(json.message,null)
           
            // 将treedata赋值给 state中的datas
            this.setState({
                datas:treeData
            })
        })
    }

    // 负责生产1级大纲下面的2级大纲数据，最终变成一个antd组件table的数据格式
    initTreeData(list,item){
        if(!item){
            // 获取一级大纲
            list.filter(c=>c.parent_id == 0).map(c=>{
                let obj = {goods_id:c.goods_id,key:c.id,id:c.id,parent_id:c.parent_id,section_name:c.section_name,is_free:c.is_free,children:[]}
                treeData.push(obj)
                // 递归调用initTreeData方法获取obj下面的二级大纲数据
                this.initTreeData(list,obj)
            })
        }else{
            // 获取一级大纲item下面的2级大纲
            list.filter(c=>c.parent_id == item.id).map(c=>{
                let obj = {goods_id:c.goods_id,key:c.id,id:c.id,parent_id:c.parent_id,section_name:c.section_name,is_free:c.is_free}
                item.children.push(obj)
            })
        }
    }

    render(){
        return (<div style={{ minHeight: 800, backgroundColor: 'white', marginRight: '20px' }}>
        {/* {this.props.router.query.lessonid} */}
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
                    <Breadcrumb.Item>
                    <Icon type="bars" />
                    <span>大纲列表</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <p className={css.line}></p>
                </Col>
         </Row>

         <Row>
          <Col className={css.mg} span="24">
         {/* 2.0 搜索区 */}
         <Button.Group>
            <Link href={{ pathname: '/admin/outline/add',query:{lessonid:this.props.router.query.lessonid} }}>
                <Button>
                    <Icon type="plus" />新增一级大纲
            </Button>
            </Link>            
        </Button.Group>
      </Col>
         </Row>
         <Row>
          <Col className={css.mg} span="24">  
        {/* 大纲列表 */}
        <Table className={css.tbwidth} columns={this.columns}  bordered  
            defaultExpandAllRows ={true} dataSource={this.state.datas}
            rowKey = {(row)=>row.key} expandedRowKeys={this.state.datas.map(c=>c.id)}
            />
        </Col>
         </Row>

         <style>{`
         .ant-pagination.ant-table-pagination{
            display:none;
         }
         `}</style>
       </div>)
    }
}

export default withRouter(outlinelist)