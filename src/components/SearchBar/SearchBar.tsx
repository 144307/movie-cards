import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { searchMovieByTitle } from "../../features/movie/movieSlice";
import { useMemo, useState } from "react";
import type { IMovie } from "../../types";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const allMovies = useSelector((state: RootState) => state.movies);
  const [searchQuery, setSearchQuery] = useState("");
  const [globalSearch, setGlobalSearch] = useState(false);
  const filteredMovies = useMemo(() => {
    if (!searchQuery) {
      return;
    }
    return allMovies.filter((movie: IMovie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allMovies, searchQuery]);

  return (
    <div className="search">
      <div className="search-field__wrapper">
        <input
          className="search-field"
          type="text"
          placeholder="Search"
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter" && globalSearch) {
              dispatch(searchMovieByTitle(searchQuery.trim()))
                .unwrap()
                .then((movie) => {
                  navigate(`/movies/${movie.imdbId}`);
                });
            }
          }}
          onChange={(e) => {
            setSearchQuery(e.currentTarget.value);
          }}
          value={searchQuery}
        />
        <div className="search-result">
          {!globalSearch ? (
            filteredMovies?.map((e: IMovie) => {
              return (
                <button
                  key={`search-item-${e.imdbId}`}
                  className="search-result-item"
                  onClick={() => {
                    navigate(`/movies/${e.imdbId}`);
                  }}
                >
                  {e.title}
                </button>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="search-controls">
        <button
          className={`button ${
            globalSearch ? "button_outline" : "button_toggled"
          }`}
          onClick={() => {
            setGlobalSearch(false);
          }}
        >
          Local
        </button>
        <button
          className={`button ${
            globalSearch ? "button_toggled" : "button_outline"
          }`}
          onClick={() => {
            setGlobalSearch(true);
          }}
        >
          Global
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
