// 1.1 从next/link中引入Link组件
import Link from 'next/link'
import Mynav from '../../components/Mynav'
import Mylayout from '../../layouts/Mylayout'

// 2.1 从next/router中引入Router对象
import Router from 'next/router'

const NextRoute = () => (
  <div>
    {/* 
      1.2 使用Link组件，给它添加href属性，它的值表示需要跳转的路径
      注意：
        1 不能直接在Link组件中写字符串，应该用一个标签包裹起来, 这个标签可以是任意一个标签，但是Link组件中只能有一个子元素，不能包含多个
        2 不能直接给Link组件设置样式，因为它是一个HOC(高阶组件),给它设置样式无效，可以给Link组件的子元素设置样式
     */}
    {/* <Link href="/next-route/teacher">
      <a style={{color: 'red'}}>teacher</a>
    </Link> */}
    {/* <Link href={{pathname: '/next-route/teacher'}}>
      <a style={{color: 'red', marginRight: '20px'}}>teacher</a>
    </Link> */}

    {/* <span onClick={() => Router.push('/next-route/student')}>student</span> */}
    {/* <span onClick={() => Router.push({pathname: '/next-route/student'})}>student</span> */}
    
    {/* <Mynav></Mynav> */}

    {/* <Mylayout>
      <p>next路由学习</p>
    </Mylayout> */}

    <p>next路由学习</p>
  </div>
)
export default NextRoute