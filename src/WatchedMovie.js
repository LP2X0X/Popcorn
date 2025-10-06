function WatchedMovie({ watchedMovie, onRemoveWatchedMovie }) {
  return (
    <li className="watched-movie">
      <img
        className="watched-movie__img"
        src={watchedMovie.poster}
        alt="movie-poster"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "https://placehold.co/200x300?text=404";
        }}
      />

      <div className="watched-movie__info">
        <h2 className="info__title">{watchedMovie.title}</h2>
        <div className="info__details">
          <p>⭐️ {watchedMovie.imdbRating}</p>
          <p>🌟️ {watchedMovie.userRating}</p>
          <p>⏳️ {watchedMovie.runtime} mins</p>
        </div>
      </div>

      <button
        className="button button-delete border--rounded"
        onClick={() => onRemoveWatchedMovie(watchedMovie.imdbID)}
      >
        X
      </button>
    </li>
  );
}

export default WatchedMovie;
