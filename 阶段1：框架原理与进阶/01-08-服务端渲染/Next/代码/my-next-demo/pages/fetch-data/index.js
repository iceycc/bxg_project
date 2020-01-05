import fetch from 'isomorphic-unfetch'
const FetchTest = (props) => (
  <div>
    <h1>获取页面数据</h1>
    {
      props.movieList.map(item => (
        <p key={item.id}>{item.title}</p>
      ))
    }
  </div>
)
FetchTest.getInitialProps = async function (context) {
  console.log(context);
  let res = await fetch('http://localhost:3301/in_theaters')
  let data = await res.json()
  console.log(data);
  // getInitialProps方法必须返回一个对象
  return {movieList: data}
}
export default FetchTest