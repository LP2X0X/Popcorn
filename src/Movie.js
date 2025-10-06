function Movie({ movie, onSelectedMovie }) {
  return (
    <li className="movie" onClick={() => onSelectedMovie(movie.imdbID)}>
      <img
        className="movie__img"
        src={movie.Poster}
        alt="movie-poster"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "https://placehold.co/200x300?text=404";
        }}
      />

      <div className="movie__info">
        <h2 className="info__name">{movie.Title}</h2>
        <p className="info__year">
          <span>🗓</span> {movie.Year}
        </p>
      </div>
    </li>
  );
}

export default Movie;
