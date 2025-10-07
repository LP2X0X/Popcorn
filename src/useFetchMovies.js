import { useEffect, useState } from "react";

const KEY = "4869cc13";

export default function useFetchMovies({ query }) {
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return { movies, error, isLoading };
}
