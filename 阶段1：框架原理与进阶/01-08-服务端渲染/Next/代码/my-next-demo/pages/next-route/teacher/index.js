import Mynav from '../../../components/Mynav'
import Mylayout from '../../../layouts/Mylayout'
import Link from 'next/link'

const teacherList = [
  {name: 'jack1', id: 1},
  {name: 'jack2', id: 2},
  {name: 'jack3', id: 3}
]
const Teacher = () => (
  <div>
    {/* <Mynav></Mynav> */}
    {/* <Mylayout>
      <p>teacher页面</p>
    </Mylayout> */}

    <p>teacher页面</p>

    <ul>
      {
        teacherList.map(item => (
          <li key={item.id}>
            {/* 可以通过Link组件的as属性给路径取别名 */}
            <Link as={`/next-route/teacher/${item.id}`} href={`/next-route/teacher/detail?id=${item.id}`}>
              <a>{item.name}</a>
            </Link>
          </li>
        ))
      }
    </ul>
  </div>
)
export default Teacher