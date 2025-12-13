import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import type { IMovie } from "../../types";
import Card from "../../components/Card/Card";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import { fetchProfile } from "../../features/user/userSlice";
import SearchBar from "../../components/SearchBar/SearchBar";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const allMovies = useSelector((state: RootState) => state.movies);
  const [filterByBookmarks, setFilterByBookmarks] = useState(false);
  const filteredMovies = useMemo(() => {
    if (!filterByBookmarks) {
      return allMovies;
    }
    return allMovies.filter((e) => e.bookmarked);
  }, [allMovies, filterByBookmarks]);

  return (
    <div className="page">
      <Header></Header>
      <button
        onClick={() => {
          dispatch(fetchProfile());
        }}
      >
        fetch Profile
      </button>
      <SignupForm></SignupForm>
      <LoginForm></LoginForm>
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
