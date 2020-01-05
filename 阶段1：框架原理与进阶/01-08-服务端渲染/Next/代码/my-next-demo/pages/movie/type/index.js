import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import {withRouter} from 'next/router'
const MovieType = withRouter((props) => (
  <div className="movie-type">
    {
      props.movieList.map(item => (
        <div className="movie-box" key={item.id}>
          <Link href={`/movie/detail?id=${item.id}&type=${props.router.query.type}`}>
            <div>
              <img src={item.img} alt={item.title} />
              <h4>{item.title}</h4>
              <p>评分：{item.rating}</p>
            </div>
          </Link>
        </div>
      ))
    }
    <style jsx>{`
    .movie-type {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .movie-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px 0;
      padding: 10px 0;
      width: 40%;
      box-shadow: 0 0 10px #bbb;
      
    }
    .movie-box:hover {
      box-shadow: rgba(0,0,0,0.3) 0px 19px 60px;
    }
      `}</style>
  </div>
))
MovieType.getInitialProps = async function (context) {
  let res = await fetch(`http://localhost:3301/${context.query.type}`)
  let data = await res.json()
  console.log(data);
  return {movieList: data}
}
export default MovieType