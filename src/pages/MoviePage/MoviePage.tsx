import "./MoviePage.css";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import type { AppDispatch } from "../../store";
import { deleteCard, setBookmark } from "../../features/movie/movieSlice";
import type { IRootState } from "../../types";
import { useNavigate, useParams } from "react-router-dom";

function MoviePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const movies = useSelector((state: IRootState) => state.movies);
  const movie = movies.find((e) => e.imdbId === id);
  if (!movie) {
    return <div>Movie Id {id} doesn't exists</div>;
  }

  return (
    <div className="page">
      <SearchBar></SearchBar>
      <button
        className="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home Page
      </button>
      <div className="card movie__wrapper">
        <img
          className="movie__poster"
          src={movie.poster}
          alt={`${movie.title} poster`}
        />
        <div className="movie__info">
          <h1 className="movie__title">{movie.title}</h1>
          <div className="movie__id">imdbID: {movie.imdbId}</div>
          <p className="movie__plot">{movie.plot}</p>
          <div className="movie__controls">
            <button
              className={`button ${movie.bookmarked ? "button_like" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setBookmark(movie.imdbId));
              }}
            >
              {movie.bookmarked ? "Liked" : "Like"}
            </button>
            <button
              className="button"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteCard(movie.imdbId));
                navigate("/");
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
