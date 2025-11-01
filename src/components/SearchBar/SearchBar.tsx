import "./SearchBar.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { searchMovieByTitle } from "../../features/movie/movieSlice";
import { useState } from "react";

function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            dispatch(searchMovieByTitle(searchQuery.trim()));
          }
        }}
        onChange={(e) => {
          setSearchQuery(e.currentTarget.value);
        }}
        value={searchQuery}
      />
      {/* <fieldset className="search-controls">
        <label className="search-button" htmlFor="local">
          Local
          <input
            className="search-radio"
            type="radio"
            id="local"
            name="search-controls"
            checked
          />
        </label>
        <label className="search-button" htmlFor="global">
          Global
          <input
            className="search-radio"
            type="radio"
            id="global"
            name="search-controls"
          />
        </label>
      </fieldset> */}
    </div>
  );
}

export default SearchBar;
