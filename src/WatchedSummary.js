function isValidNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function WatchedSummary({ watchedMovies }) {
  const averageIMDBRating = watchedMovies
    .map((watchedMovie) =>
      isValidNumber(watchedMovie.imdbRating)
        ? Number(watchedMovie.imdbRating)
        : 0
    )
    .reduce((average, cur, idx, arr) => average + cur / arr.length, 0)
    .toFixed(2);

  const averageUserRating = watchedMovies
    .map((watchedMovie) =>
      isValidNumber(watchedMovie.userRating)
        ? Number(watchedMovie.userRating)
        : 0
    )
    .reduce((average, cur, idx, arr) => average + cur / arr.length, 0)
    .toFixed(2);

  const averageRuntime = watchedMovies
    .map((watchedMovie) =>
      isValidNumber(watchedMovie.runtime) ? Number(watchedMovie.runtime) : 0
    )
    .reduce((average, cur, idx, arr) => average + cur / arr.length, 0)
    .toFixed(2);

  return (
    <header className="watched-movies-list-box__banner border--rounded">
      <p className="banner__header">
        <strong>Watched Movies</strong>
      </p>
      <div className="banner__container">
        <p>#️⃣ {watchedMovies.length} movies</p>
        <p>⭐️ {averageIMDBRating} </p>
        <p>🌟️ {averageUserRating} </p>
        <p>⏳️ {averageRuntime} mins</p>
      </div>
    </header>
  );
}

export default WatchedSummary;
