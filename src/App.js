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
import useFetchMovies from "./useFetchMovies.js";

// Keep the .js in the name file for quick navigation with command click or F12

const KEY = "4869cc13";

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watchedMovies, setWatchedMovies] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  const { error, movies, isLoading } = useFetchMovies(query);

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
