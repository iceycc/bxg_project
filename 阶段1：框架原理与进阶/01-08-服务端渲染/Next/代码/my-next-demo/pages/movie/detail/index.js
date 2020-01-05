import fetch from 'isomorphic-unfetch'
const MovieDetail = (props) => (
  <div className="detail">
    <div className="detail-box">
      <img src={props.movieDetail.img} alt={props.movieDetail.title} />
      <h4>{props.movieDetail.title}</h4>
      <p>电影类型：{props.movieDetail.genres.join(',')}</p>
      <p>上映时间：{props.movieDetail.details[0].year}</p>
      <p>剧情介绍：{props.movieDetail.details[0].summary}</p>
    </div>
    <style jsx>{`
    .detail {
      width: 40%;
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: 0 0 10px #bbb;
    }
    .detail-box {
      text-align: center;
    }
      `}</style>
  </div>
)
MovieDetail.getInitialProps = async function (context) {
  let res = await fetch(`http://localhost:3301/${context.query.type}/${context.query.id}?_embed=details`)
  let data = await res.json()
  console.log(data);
  return {movieDetail: data}
}
export default MovieDetail