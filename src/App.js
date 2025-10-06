import { useEffect, useState } from "react";
import Box from "./Box.js";
import Header from "./Header.js";
import Message from "./Message.js";
import SearchBox from "./SearchBox.js";
import MovieList from "./MovieList.js";
import WatchedSummary from "./WatchedSummary.js";
import MovieDetails from "./MovieDetails.js";
import WatchedMovies from "./WatchedMovies.js";
import WatchedMovie from "./WatchedMovie.js";

// Keep the .js in the name file for quick navigation with command click or F12

const KEY = "4869cc13";

function App() {
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [watchedMovies, setWatchedMovies] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  function handleAddWatchedMovie(movie) {
    setWatchedMovies((movies) => [...movies, movie]);
  }

  function handleRemoveWatchedMovie(id) {
    setWatchedMovies((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  function onSelectedMovie(id) {
    if (id === selectedId) {
      setSelectedId("");
      return;
    }
    setSelectedId(id);
  }

  useEffect(
    function () {
      localStorage.setItem("watched", watchedMovies);
    },
    [watchedMovies]
  );

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setMovies([]); // Reset movies list after each fetch
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error(
              "There is something wrong when fetching the movies data!"
            );
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movies not found!");
          }

          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            setIsLoading(false);
            setError(err.message);
          }
        }
      }

      if (!query.length) {
        setMovies([]); // Help reset movies found count
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        setIsLoading(false);
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div className="app">
      <Header totalResults={movies.length}>
        <SearchBox query={query} setQuery={setQuery} />
      </Header>

      <main className="main">
        <Box className="movies-list-box">
          {error && <Message error={error} />}
          {isLoading && <Message />}
          {!isLoading && !error ? (
            <MovieList movies={movies} onSelectedMovie={onSelectedMovie} />
          ) : null}
        </Box>

        <Box className="watched-movies-list-box">
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onBack={() => setSelectedId("")}
              onAddMovie={handleAddWatchedMovie}
              watchedMovies={watchedMovies}
            />
          ) : (
            <>
              <WatchedSummary watchedMovies={watchedMovies} />
              <WatchedMovies>
                {watchedMovies !== null &&
                  watchedMovies.map((watchedMovie) => (
                    <WatchedMovie
                      watchedMovie={watchedMovie}
                      onRemoveWatchedMovie={handleRemoveWatchedMovie}
                    />
                  ))}
              </WatchedMovies>
            </>
          )}
        </Box>
      </main>
    </div>
  );
}

export default App;
