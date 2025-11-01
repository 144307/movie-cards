import "./Card.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { deleteCard, setBookmark } from "../../features/movie/movieSlice";

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

  return (
    <div
      className="card"
      onClick={() => {
        console.log("card clicked", title);
      }}
    >
      <img className="card__poster" src={poster} alt={`${title} poster`} />
      <h2 className="card__title">{title}</h2>
      <div className="card_id">imdbID: {imdbId}</div>
      <p className="card__plot">{plot}</p>
      <button
        className={`card__bookmark ${
          bookmarked ? "card__bookmark_selected" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setBookmark(imdbId));
        }}
      >
        Like
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteCard(imdbId));
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Card;
