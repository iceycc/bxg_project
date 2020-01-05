import MovieHeader from '../components/MovieHeader'
const MovieLayout = (props) => (
  <div className="movie-layout">
    <MovieHeader></MovieHeader>
    {props.children}
    <style jsx>{`
      .movie-layout {
        margin-top: 60px;
      }
      `}</style>
  </div>
)
export default MovieLayout