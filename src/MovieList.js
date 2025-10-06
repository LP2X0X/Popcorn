import Movie from "./Movie";

function MovieList({ movies, onSelectedMovie }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}

export default MovieList;
