import { withRouter } from 'next/router'
// withRouter这个高阶组件会将当前的路由对象注入到组件中去，并将路由对象绑定到组件的props上
const Detail = withRouter((props) => (
  <div>
    这是{props.router.query.id}号老师的详情
  </div>
))
export default Detail