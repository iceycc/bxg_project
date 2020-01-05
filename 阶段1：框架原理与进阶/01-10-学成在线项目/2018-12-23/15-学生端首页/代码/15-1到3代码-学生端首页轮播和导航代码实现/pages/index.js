// 导入index.less样式
import css from './index.less'

// 导入antd相关组件
import { Carousel, Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import fetchHelper from '../kits/fetchHelper.js';

export default class extends React.Component {
    // 1.0 轮播图和导航数据通过getInitialProps()方法获取
    static async getInitialProps(){
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
            catelist:list.message.catelist,
            sliderlist:list.message.sliderlist
        }
    }

    render() {
        return (<div>

            <div className={css.banner_roll}>
                {/* 1.0实现轮播图-begin 使用antd中的走马灯组件：Carousel */}
                <Carousel autoplay>
                    {
                        this.props.pageProps.sliderlist.map((item,index)=>(
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
                        this.props.pageProps.catelist.map((item,index)=>(
                            <SubMenu key={item.id} title={item.title}>
                            {
                                // 2.0.2 遍历每一门技术的分组
                                item.subcates.map((item1,index1)=>(
                                <MenuItemGroup key={item1.id} title={item1.title}>
                                {
                                    // 2.0.3 遍历每一个分组下面的课程数据
                                    item1.subcates.map((item2,index1)=>(
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
                此处实现精品课程布局，具体代码请看 精品课程布局静态布局目录
            {/* 3.0 精品课程布局-end */}

                {/* 4.0 分类分组课程数据-begin */}
                <br /> <br />
                此处分类分组课程数据布局，具体代码请看 分类分组课程数据静态布局目录
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