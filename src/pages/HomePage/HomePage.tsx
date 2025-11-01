import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import type { IMovie, IRootState } from "../../types";
import Card from "../../components/Card/Card";
import { fetchMovieById } from "../../features/movie/movieSlice";
import type { AppDispatch } from "../../store";
import SearchBar from "../../components/SearchBar/SearchBar";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const productData = useSelector((state: IRootState) => state.movies);

  return (
    <div className="page">
      <SearchBar></SearchBar>
      <div className="card-grid">
        {productData.map((movie: IMovie) => {
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
      <button
        onClick={() => {
          dispatch(fetchMovieById("tt0083658")).then((response) =>
            console.log(response)
          );
        }}
      >
        Test
      </button>
    </div>
  );
}

export default HomePage;
