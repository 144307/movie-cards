import "./HomePage.css";
import { useSelector } from "react-redux";
import type { IMovie, IRootState } from "../../types";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const allMovies = useSelector((state: IRootState) => state.movies);
  const [filterByBookmarks, setFilterByBookmarks] = useState(false);
  const filteredMovies = useMemo(() => {
    if (!filterByBookmarks) {
      return allMovies;
    }
    return allMovies.filter((e) => e.bookmarked);
  }, [allMovies, filterByBookmarks]);

  return (
    <div className="page">
      <SearchBar></SearchBar>
      <div className="menu-bar">
        <button
          className={`button button_outline ${
            filterByBookmarks ? "button_toggled" : ""
          }`}
          onClick={() => {
            setFilterByBookmarks(!filterByBookmarks);
          }}
        >
          Show Favorites
        </button>
        <button
          className="button button_outline"
          onClick={() => {
            navigate("/add-movie");
          }}
        >
          Add Movie
        </button>
      </div>
      <div className="card-grid">
        {filteredMovies.map((movie: IMovie) => {
          return (
            <Card
              key={movie.imdbId}
              imdbId={movie.imdbId}
              title={movie.title}
              plot={movie.plot}
              bookmarked={movie.bookmarked}
              poster={movie.poster}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
