import "./Card.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { deleteCard, setBookmark } from "../../features/movie/movieSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  imdbId: string;
  title: string;
  plot: string;
  bookmarked: boolean;
  poster: string;
}

function Card({
  imdbId: imdbId,
  title: title,
  plot: plot,
  bookmarked: bookmarked,
  poster: poster,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div
      className="card card_pronounced"
      onClick={() => {
        console.log("card clicked", title);
        navigate(`./movies/${imdbId}`);
      }}
    >
      <img className="card__poster" src={poster} alt={`${title} poster`} />
      <h2 className="card__title">{title}</h2>
      <div className="card_id">imdbID: {imdbId}</div>
      <p className="card__plot">{plot}</p>
      <div className="card__controls">
        <button
          className={`button card__bookmark ${bookmarked ? "button_like" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setBookmark(imdbId));
          }}
        >
          {bookmarked ? "Liked" : "Like"}
        </button>
        <button
          className="button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteCard(imdbId));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
