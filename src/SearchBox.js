import { useRef } from "react";
import useKey from "./useKey";

function SearchBox({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey({ key: "Enter", action: setQuery });

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
