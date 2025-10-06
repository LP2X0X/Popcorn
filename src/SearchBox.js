import { useEffect, useRef } from "react";

function SearchBox({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code.toLowerCase() === "Enter".toLowerCase()) {
          inputEl.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);

      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <input
      className="search-box border--rounded"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    ></input>
  );
}

export default SearchBox;
