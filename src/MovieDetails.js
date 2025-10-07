import { useEffect, useState } from "react";
import Message from "./Message";
import StarRating from "./StarRating";
import useKey from "./useKey";

const KEY = "4869cc13";

function MovieDetails({ selectedId, onBack, onAddMovie, watchedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movieDetails, setMovieDetails] = useState({});
  const [rating, setRating] = useState(0);

  const addedToWatchedMovie = watchedMovies.find(
    (mov) => mov.imdbID === selectedId
  );

  function handleAddMovie() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: movieDetails.Title,
      year: movieDetails.Year,
      poster: movieDetails.Poster,
      imdbRating: Number(movieDetails.imdbRating),
      runtime: Number(movieDetails.Runtime.split(" ").at(0)),
      userRating: rating,
      // countRatingDecisions: countRef.current,
    };

    onAddMovie(newWatchedMovie);
    onBack();
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          setError("");

          let res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error(
              "There is something wrong when fetching the movie details!"
            );
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie details not found!");
          }

          setMovieDetails(data);
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            setIsLoading(false);
            setError(err.name);
          }
        }

        return function () {
          setIsLoading(false);
          setError("");
          controller.abort();
        };
      }

      fetchMovieDetails();
    },
    [selectedId]
  );

  useKey({ key: "Escape", action: onBack });

  useEffect(
    function () {
      if (!movieDetails.Title) {
        return;
      }

      document.title = `Popcorn | ${movieDetails.Title}`;

      return function () {
        document.title = "Popcorn | A movie rating website";
      };
    },
    [movieDetails]
  );

  return (
    <article className="movie-details">
      {error && <Message error={error} />}
      {isLoading && <Message />}
      {!isLoading && !error ? (
        <>
          <section className="movie-details__header">
            <img
              className="header__poster"
              src={movieDetails.Poster}
              alt="movie-poster"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "https://placehold.co/100x200?text=404";
              }}
            />
            <div className="header__info">
              <h2 className="info__movie-title">{movieDetails.Title}</h2>
              <p>
                {movieDetails.Released} &middot; {movieDetails.Runtime}
              </p>
              <p>{movieDetails.Genre}</p>
              <p>⭐️ {movieDetails.imdbRating} IMDb Rating</p>
            </div>
          </section>
          <section className="movie-details__description">
            <div className="description__rating-system border--rounded">
              {addedToWatchedMovie ? (
                <p className="description__watched">
                  You rated this movie {addedToWatchedMovie.userRating}{" "}
                  <span>⭐</span>️
                </p>
              ) : (
                <>
                  <StarRating
                    numberOfStars="10"
                    size="28"
                    gap={24}
                    onSetRating={setRating}
                  />
                  {rating !== 0 && (
                    <button
                      className="button button--add-to-list border--rounded"
                      onClick={handleAddMovie}
                    >
                      Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{movieDetails.Plot}</em>
            </p>
            <p>
              <strong>Starring: </strong>
              {movieDetails.Actors}
            </p>
            <p>
              <strong>Directed by: </strong>
              {movieDetails.Director}
            </p>
          </section>

          <button className="button button--close" onClick={onBack}>
            &larr;
          </button>
        </>
      ) : null}
    </article>
  );
}

export default MovieDetails;
