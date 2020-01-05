import { connect } from 'react-redux'
import { Row, Col, Breadcrumb, Icon, Button, Input, Select,Pagination,message } from 'antd'
import Link from 'next/link'
import css from './clist.less'
const Search = Input.Search;
const Option = Select.Option;
import { Card } from 'antd';
import fetchHelper from '../../../kits/fetchHelper.js'
import { isNullOrUndefined } from 'util';

export default class clist extends React.Component {
    static async getInitialProps() {
        return {
            isadmin: true
        }
    }

    state = {
        cate_id:-1,
        type:-1,
        title:'',
        pageIndex:1,
        pageSize:10,
        totalCount:0,
        clist:null,
        cateList: [
            {"id": -1,
            "channel_id": 2,
            "title": "获取所有课程",
            "parent_id": 0,
            "class_list": ",40,",
            "class_layer": 1,
            "sort_id": 99,
            "img1_url": "/upload/python.png",
            "img_url": "/upload/qd.png",
            "content": null}
        ]
        , plist: []
    }

    // 1、在生命周期方法中实现api接口的调用
    componentWillMount(){
        this.getListByPage(this.state.cate_id,this.state.type,this.state.title,
            this.state.pageIndex
            ,this.state.pageSize)

        this.getCateList();

        this.getplist();
    }

    getplist(){
        fetchHelper.get('/nc/admin/getCourseTypes')
        .then(json=>{
            if(json.status == 2){
                message.warn(json.message,1);
                return;
            }
            if(json.status == 1){
                message.error(json.message,1);
                return;
            }

            // 成功处理
            this.setState({
                plist:this.state.plist.concat(json.message)
            })
        })
    }

    // 获取课程分类数据
    getCateList(){
        fetchHelper.get('/ch/admin/getcatelist')
        .then(json=>{
            if(json.status == 2){
                message.warn(json.message,1);
                return;
            }
            if(json.status == 1){
                message.error(json.message,1);
                return;
            }

            // 成功处理
            this.setState({
                cateList:this.state.cateList.concat(json.message)
            })
        })
    }

    // /ch/admin/getCourseListByPager?cate_id=课程分类id&type=课程属性id&title=课程标题&pageIndex=页码&pageSize=单页容量
    getListByPage(cate_id,type,title,pageIndex,pageSize){
        let url = `/ch/admin/getCourseListByPager?cate_id=${cate_id}&type=${type}&title=${title}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
        fetchHelper.get(url)
        .then(json=>{
            if(json.status == 2){
                message.warn(json.message,1);
                return;
            }
            if(json.status == 1){
                message.error(json.message,1);
                return;
            }

            // 成功处理
            this.setState({
                clist:json.message,
                totalCount:json.totalCount
            })
        })
    }

    changePage(pageIndex,pageSize){
        this.setState({
            pageIndex,pageSize
        })

        this.getListByPage(this.state.cate_id,this.state.type,this.state.title,
            pageIndex
            ,pageSize)
    }

    changeSize(current, size){
        this.setState({
            pageIndex:current,
            pageSize:size
        })

        this.getListByPage(this.state.cate_id,this.state.type,this.state.title,
            current
            ,size)
    }

    onCateChange(value){
        this.setState({
            cate_id:value
        })

        this.getListByPage(value,this.state.type,this.state.title,
            this.state.pageIndex
            , this.state.pageSize)
    }

    onTypeChange(value){
        this.setState({
            type:value
        })

        this.getListByPage(this.state.cate_id,value,this.state.title,
            this.state.pageIndex
            , this.state.pageSize)
    }

    search(value){
        this.setState({
            title:value
        })

        this.getListByPage(this.state.cate_id,this.state.type,value,
            this.state.pageIndex
            , this.state.pageSize)
    }

    render() {
        return (<div style={{ minHeight: 800, backgroundColor: 'white', marginRight: '20px' }}>
            <Row style={{minHeight: 800}}>
                {/* 1.0 面包屑 */}
                <Col className={css.mg} span="24">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/index">
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Icon type="appstore" />
                            <span>课程管理</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <p className={css.line}></p>
                </Col>
               
                {/* 2.0 搜索区 */}
                <Col className={css.mg} span="24">
                    <Row>
                        <Col span="18">
                            <Button.Group>
                                <Link href={{ pathname: '/admin/course/add' }}>
                                    <Button>
                                        <Icon type="plus" />新增
                                </Button>
                                </Link>                              
                            </Button.Group>
                            <Select
                                showSearch
                                defaultValue={['所有课程']}
                                style={{ width: 150 }}
                                placeholder="课程分类"
                                optionFilterProp="children"
                                onChange={(value)=>{this.onCateChange(value)}}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                               {
                                   this.state.cateList && this.state.cateList.map((item,index)=>(
                                    <Option key={index}  value={item.id}>{item.title}</Option>
                                   ))
                               }
                               
                            </Select>

                            <Select
                                defaultValue={['所有类型']}
                                showSearch
                                style={{ width: 150 }}
                                placeholder="课程属性"
                                optionFilterProp="children"
                                onChange={(value)=>{this.onTypeChange(value)}}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            {
                                this.state.plist && this.state.plist.map(item=>(
                                    <Option key={item.tid} value={item.tid}>{item.title}</Option>
                                ))
                            }
                              
                            </Select>
                        </Col>
                        <Col span="5">
                            <Search
                                placeholder="请输入课程标题"
                                enterButton="查找"
                                size="default"
                                onSearch={(value) => {this.search(value)}}
                            />
                        </Col>
                    </Row>
                </Col>
             
                {/* 3.0 课程列表 */}
                <Col className={css.mg} span="24">
                           {
                               this.state.clist && this.state.clist.map((item,index)=>(
                                <Card key={index}
                                hoverable
                                style={{ width: 240, display: 'inline-block', margin: '5px 0px 0px 5px' }}
                                cover={<img alt="example" height="160" width="240" src={item.img_url} />}
                            >
                                
                                <span>
                                <h4>{item.title}</h4>
                                 副标题：{item.sub_title}
                                </span>
                                <Button.Group style={{ marginTop: 10 }}>
                                    <Button>
                                        <Icon type="up-circle" style={{color:item.is_top == 1?'red':''}} theme="filled" title="置顶" />
                                    </Button>
                                    <Button>
                                        <Icon type="fire" style={{color:item.is_hot == 1?'red':''}} theme="filled" title="热门" />
                                    </Button>
                                    <Button>
                                        <Icon type="picture" style={{color:item.is_slide == 1?'red':''}} theme="filled" title="轮播图" />
                                    </Button>
                                    <Button>
                                        <Icon type="edit" theme="filled" title="编辑" />
                                    </Button>
                                    <Link href={{pathname:'/admin/outline/list',query:{lessonid:item.id}}}>
                                    <Button title={'课程大纲'}>
                                        <Icon type="database" theme="filled" />
                                    </Button>
                                    </Link>
                                    <Button title="删除">
                                        <Icon type="delete" theme="filled" />
                                    </Button>
                                    <span style={{ fontSize: 10, marginLeft: 10 }}>2019.1.1</span>
                                    {/* <Checkbox value="1" className={css.ck}></Checkbox> */}
                                </Button.Group>
                            </Card>
                               ))
                           }
                       
                </Col>
            </Row>
            <Row><Col span="16" offset="1">                                    
                            <Pagination showSizeChanger 
                                    onChange={(pageindex,pageSize)=>{this.changePage(pageindex,pageSize)}}
                                    onShowSizeChange={(current, size)=>{this.changeSize(current, size)}} 
                                    defaultPageSize={this.state.pageSize}
                                    pageSizeOptions={['1','10','20','30','40']}
                                    defaultCurrent={this.state.pageIndex}
                                    total={this.state.totalCount} />
                </Col></Row>  
            <style>{`
             .ant-card{
                position: relative;
            }
            .ant-card-body {
                height:260px;
            }
            .ant-card-body > span{
                height:150px;
                display:block;
                overflow:hidden;
            }
            .ant-card-body > span h4{
                margin-bottom: 5px;
            }
            `}
            </style>
        </div>)
    }
}