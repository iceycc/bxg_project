// 导入index.less样式
import css from './index.less'

// 导入next路由标签Link
import Link from 'next/link'

// 导入antd相关组件
import { Carousel, Menu, Icon, Row, Col, message } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import fetchHelper from '../kits/fetchHelper.js';

export default class extends React.Component {
    // 1.0 轮播图和导航数据通过getInitialProps()方法获取
    static async getInitialProps() {
        // 请求数据接口获取轮播图数据和导航数据
        /**
         * list的格式：
         * {
            "status": 0,
            "message": {
                "catelist": []   //存放导航数据
                "sliderlist": []  //存放轮播图数据
            }
         *  */

        let list = await fetchHelper.get('/nc/course/home/gettopdata');
        // 通过return {} 默认绑定到当前组件的props对象中，在render中就可以通过this.props.pageProps.catelist
        // 或者this.props.pageProps.sliderlist 去分别获取分类数据和轮播图数据
        return {
            catelist: list.message.catelist,
            sliderlist: list.message.sliderlist
        }
    }

    // 精品课程实现步骤1：定义一个state
    state = {
        topList: null,  //用来存储精品课程数组的（来源于请求数据服务后返回的message数组）
        groupList: null,   //用来存储分类课程的相关数组
        types: null //用来存储每个分类课程的属性
    }

    //  精品课程实现步骤2：在react生命周期方法中发出数据服务的请求获取到数据后赋值给state中的topList
    getTopList() {
        // 1.0 定义请求的url: get   /nc/course/home/getTopCourseList
        let url = '/nc/course/home/getTopCourseList'

        // 2.0 利用fetchHelper请求url得到数据
        fetchHelper.get(url)
            .then(json => {
                if (json.status == 1) {
                    // 请求失败
                    message.error(json.message, 1)
                } else {
                    // 请求成功
                    // 3.0 将数据赋值给state中的topList
                    this.setState({
                        // 一旦被赋值，就会触发render中的使用了topList的数组的dom重新渲染
                        topList: json.message
                    })
                }
            })
    }

    // 定义获取分组课程的数据
    getGroupList() {
        // 1.0 定义请求的url: 
        let url = '/nc/course/home/getcourselist'

        // 2.0 利用fetchHelper请求url得到数据
        fetchHelper.get(url)
            .then(json => {
                if (json.status == 1) {
                    // 请求失败
                    message.error(json.message, 1)
                } else {
                    // 请求成功
                    // 3.0 将数据赋值给state中的groupList
                    this.setState({
                        // 一旦被赋值，就会触发render中的使用了groupList的数组的dom重新渲染
                        groupList: json.message.datas,
                        types: json.message.types
                    })
                }
            })
    }

    componentWillMount() {
        // 1.0 调用获取精品课程数据方法
        this.getTopList();

        // 2.0 调用获取分组课程的数据
        this.getGroupList();
    }

    render() {
        return (<div>

            <div className={css.banner_roll}>
                {/* 1.0实现轮播图-begin 使用antd中的走马灯组件：Carousel */}
                <Carousel autoplay>
                    {
                        this.props.pageProps.sliderlist.map((item, index) => (
                            <div key={index}>
                                <img src={item.img_url} />
                            </div>
                        ))
                    }

                </Carousel>
                {/* 1.0实现轮播图-end */}

                {/* 2.0 左边分类菜单数据-begin 使用antd中的Menu组件 */}
                <div className={css.catelist}>
                    <Menu style={{ width: 256 }} mode="vertical">
                        {
                            // 2.0.1 遍历每一门技术
                            this.props.pageProps.catelist.map((item, index) => (
                                <SubMenu key={item.id} title={item.title}>
                                    {
                                        // 2.0.2 遍历每一门技术的分组
                                        item.subcates.map((item1, index1) => (
                                            <MenuItemGroup key={item1.id} title={item1.title}>
                                                {
                                                    // 2.0.3 遍历每一个分组下面的课程数据
                                                    item1.subcates.map((item2, index1) => (
                                                        <Menu.Item key={item2.id}>{item2.title}</Menu.Item>
                                                    ))
                                                }
                                            </MenuItemGroup>
                                        ))
                                    }
                                </SubMenu>
                            ))
                        }
                    </Menu>
                </div>
                {/* 2.0 左边分类菜单数据-end */}

            </div>
            <br />
            <div className={css.toplesson}>
                {/* 3.0 精品课程布局-begin */}
                <Row>
                    <Col span="12"><h2>精品课程</h2></Col>
                    <Col className={css.typesli} span="2" offset="10"><a href="#">查看全部</a></Col>
                </Row>
                <br />
                <ul>
                    {/*   精品课程实现步骤3：遍历state中的topList完成整个数据的渲染 */}

                    {
                        this.state.topList && this.state.topList.map((item, index) => (
                            <Link href={'/course/detail?cid='+item.id}>
                                <li key={index} className={css.recom_item}>
                                    <a href="#">
                                        <p><img src={item.img_url} width="100%" alt="" />
                                            <span className={css.lab}>HOT</span>
                                        </p>
                                        <ul>
                                            <li style={{ height: 36 }}>{item.title}</li>
                                            <li className={css.li2}><span>{item.lesson_level}</span> <em> · </em> {item.click}人在学习</li>
                                        </ul>
                                    </a>
                                </li>
                            </Link>
                        ))
                    }

                </ul>
                {/* 3.0 精品课程布局-end */}

                {/* 4.0 分类分组课程数据-begin */}

                {
                    this.state.groupList && this.state.groupList.map((item, index) => (
                        <div key={index}>
                            <br /> <br />
                            <Row>
                                <Col span="8"><h2>{item.title}</h2></Col>
                                <Col span="8" className={css.typesli}>
                                    <ul>
                                        {
                                            this.state.types && this.state.types.map((type, tindex) => (
                                                <li key={tindex}><a className={tindex == 0 ? css.active : ''} href="#">{type.title}</a></li>
                                            ))
                                        }
                                    </ul>
                                </Col>
                                <Col className={css.typesli} span="2" offset="6"><a href="#">查看全部</a></Col>
                            </Row>
                            <br /><br />
                            <Row>
                                <Col span="5">
                                    {/* 左边图片 */}
                                    <img src={item.img_url} width="228" height="392" alt="" />
                                </Col>
                                <Col span="19">
                                    <Row>
                                        {/* 上边图片 */}
                                        <Col span="24">
                                            <img src={item.img1_url} width="957" height="100" alt="" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <ul>
                                                {
                                                    item.courseList && item.courseList.map((item1, index1) => (
                                                        <li key={item1.id} className={css.recom_item}>
                                                            <a href="#">
                                                                <p><img src={item1.img_url} width="100%" height="160" alt="" />
                                                                    <span className={css.lab}>HOT</span>
                                                                </p>
                                                                <ul>
                                                                    <li style={{ height: 36 }}>{item1.title} </li>
                                                                    <li className={css.li2}><span>{item1.lesson_level}</span> <em> · </em> {item1.click}人在学习</li>
                                                                </ul>
                                                            </a>
                                                        </li>
                                                    ))
                                                }


                                            </ul>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    ))
                }



                {/* 4.0 分类分组课程数据-end */}
            </div>
            <style>{`
                  /*首页轮播和分类begin*/ 
                       /*覆盖antd轮播图小图标的位置，只有在当前组件有效*/
                      .slick-dots {
                          position: relative !important;
                          bottom:40px !important;
                      }
                      /*重写antd一级菜单样式*/ 
                      .ant-menu{
                          background: rgba(0, 0, 0, 0.2) !important;
                          color:#fff;
                      }
                      /*重写二级菜单样式*/ 
                      .ant-menu-sub{
                          background: #fff !important;
                          color:#000;
                      }
                      .ant-menu-submenu-arrow{
                          color:#fff !important;                  
                      }
                      .ant-menu-submenu-arrow::after, .ant-menu-submenu-arrow::before{                   
                          background-image:none !important;
                      }
                      .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left{
                          border-right:none !important;
                      }
                      .ant-menu-item-group-list{
                          width:500px
                      }
                      .ant-menu-item-group-list li{
                          display:inline-block !important;
                      }
                      /*首页轮播和分类end*/ 
                  `}</style>
        </div>)
    }
}