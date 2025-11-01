import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviePage/MoviePage";

function App() {
  // const movie = {
  //   bookmarked: false,
  //   imdbId: "tt0106856",
  //   plot: "An ordinary man reaches his breaking point and starts lashing out against the various flaws he sees in society.",
  //   poster:
  //     "https://m.media-amazon.com/images/M/MV5BZmE2MGQ4OWEtMmUzYS00ZDBhLTg4ZDAtZGRhYWNkOTAzYWQyXkEyXkFqcGc@._V1_SX300.jpg",
  //   title: "Falling Down",
  // };
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/movies/:id" element={<MoviePage />}></Route>
    </Routes>
    // <div className="app">
    //   {/* <HomePage></HomePage> */}
    //   <MoviePage
    //     imdbId={movie.imdbId}
    //     title={movie.title}
    //     plot={movie.plot}
    //     bookmarked={false}
    //     poster={movie.poster}
    //   ></MoviePage>
    // </div>
  );
}

export default App;
