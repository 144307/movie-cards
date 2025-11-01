import "./HomePage.css";
import { useSelector } from "react-redux";
import type { IMovie, IRootState } from "../../types";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useMemo, useState } from "react";

function HomePage() {
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
      <button
        className={`button ${filterByBookmarks ? "button_toggled" : ""}`}
        onClick={() => {
          setFilterByBookmarks(!filterByBookmarks);
        }}
      >
        Show Favorites
      </button>
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
