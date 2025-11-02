import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviePage/MoviePage";
import AddMoviePage from "./pages/AddMoviePage/AddMoviePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/movies/:id" element={<MoviePage />}></Route>
      <Route path="/add-movie" element={<AddMoviePage />}></Route>
    </Routes>
  );
}

export default App;
