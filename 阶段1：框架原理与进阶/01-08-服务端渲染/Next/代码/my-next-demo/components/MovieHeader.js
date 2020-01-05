import Link from 'next/link'
const MovieHeader = () => (
  <div className="movie-header">
    <ul>
      <li>
        <Link href="/movie/type?type=in_theaters"><a>正在热映</a></Link>
      </li>
      <li>
        <Link href="/movie/type?type=coming_soon"><a>即将上映</a></Link>
      </li>
      <li>
        <Link href="/movie/type?type=top250"><a>top250</a></Link>
      </li>
    </ul>
    <style jsx>{`
      .movie-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      }
      ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 15px 0;
        background-color: #1e2736;
        margin: 0;
      }
      li {
        list-style: none;
        line-height: 30px;
        height: 30px;
      }
      li a {
        color: white;
        text-decoration: none;
      }
      li a:hover {
        color: red;
      }
      `}</style>
  </div>
)
export default MovieHeader