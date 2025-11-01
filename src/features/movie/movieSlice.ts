import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IMovie, IRootState } from "../../types";

const API_KEY = import.meta.env.VITE_API_KEY;
const baseUrl = "http://www.omdbapi.com/";

const initialState: IMovie[] = [
  {
    bookmarked: false,
    imdbId: "tt0106856",
    plot: "An ordinary man reaches his breaking point and starts lashing out against the various flaws he sees in society.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmE2MGQ4OWEtMmUzYS00ZDBhLTg4ZDAtZGRhYWNkOTAzYWQyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Falling Down",
  },
  {
    bookmarked: false,
    imdbId: "tt0083658",
    plot: "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Blade Runner",
  },
  {
    bookmarked: false,
    imdbId: "tt0106856",
    plot: "An ordinary man reaches his breaking point and starts lashing out against the various flaws he sees in society.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmE2MGQ4OWEtMmUzYS00ZDBhLTg4ZDAtZGRhYWNkOTAzYWQyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Falling Down",
  },
  {
    bookmarked: false,
    imdbId: "tt0083658",
    plot: "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Blade Runner",
  },
  {
    bookmarked: false,
    imdbId: "tt0106856",
    plot: "An ordinary man reaches his breaking point and starts lashing out against the various flaws he sees in society.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmE2MGQ4OWEtMmUzYS00ZDBhLTg4ZDAtZGRhYWNkOTAzYWQyXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Falling Down",
  },
  {
    bookmarked: false,
    imdbId: "tt0083658",
    plot: "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg",
    title: "Blade Runner",
  },
];

interface IOmdbMovieResponse {
  Title: string;
  Plot: string;
  Poster: string;
  imdbID: string;
  Response: "True" | "False";
  Error?: string;
  // (The API sends many more fields, but these are the ones we need)
}

// export const getMoviesForFirstPage = createAsyncThunk<
//   IMovie,
//   string,
//   {
//     rejectValue: string;
//   }
// >("movie/fetchPlot", async (imdbId: string, { rejectWithValue }) => {
//   const params = new URLSearchParams();
//   return rejectWithValue("test case");
// });

export const getFullMoviePlot = createAsyncThunk<
  IMovie,
  string,
  {
    rejectValue: string;
  }
>("movie/fetchPlot", async (imdbId: string, { rejectWithValue }) => {
  const params = new URLSearchParams();
  params.set("i", imdbId);
  params.set("apiKey", API_KEY);
  return rejectWithValue("test case");
});

export const searchMovieByTitle = createAsyncThunk<
  IMovie,
  string,
  {
    state: IRootState;
    rejectValue: string;
  }
>("movie/searchByTitle", async (movieTitle: string, { rejectWithValue }) => {
  if (!API_KEY) {
    throw new Error("API_KEY is missing:", API_KEY);
  }
  const params = new URLSearchParams();
  params.set("t", movieTitle);
  params.set("apiKey", API_KEY);
  const url = `${baseUrl}?${params}`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return rejectWithValue(`Network error. Status: ${response.status}`);
    }
    const apiData: IOmdbMovieResponse = await response.json();
    console.log(apiData);
    if (apiData.Response === "False") {
      // Handle API-level errors (e.g., "Movie not found!")
      return rejectWithValue(apiData.Error || "Movie not found.");
    }
    const movie: IMovie = {
      imdbId: apiData.imdbID,
      title: apiData.Title,
      plot: apiData.Plot,
      poster: apiData.Poster,
      bookmarked: false,
    };
    console.log("response movie", movie);
    return movie;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return rejectWithValue(e.message || "An unknown error occurred");
  }
});

export const fetchMovieById = createAsyncThunk<
  // 1. The type it will return on success
  IMovie,
  // 2. The type of the argument we pass in (the ID)
  string,
  // 3. The thunk API config
  {
    state: IRootState; // needed for getState();
    rejectValue: string; // Type for what's returned on error
  }
>("movie/fetchById", async (imdbId: string, { getState, rejectWithValue }) => {
  if (getState().movies.some((e) => e.imdbId === imdbId)) {
    return rejectWithValue("movie already exits");
  }
  const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return rejectWithValue(`Network error. Status: ${response.status}`);
    }
    const apiData: IOmdbMovieResponse = await response.json();
    if (apiData.Response === "False") {
      // Handle API-level errors (e.g., "Movie not found!")
      return rejectWithValue(apiData.Error || "Movie not found.");
    }
    const movie: IMovie = {
      imdbId: apiData.imdbID,
      title: apiData.Title,
      plot: apiData.Plot,
      poster: apiData.Poster,
      bookmarked: false,
    };
    return movie;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return rejectWithValue(e.message || "An unknown error occurred");
  }
});

const movieSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    deleteCard: (state, action: PayloadAction<string>) => {
      console.log("delete Card");
      console.log(action.payload);
      return state.filter((e) => e.imdbId !== action.payload);
    },
    setBookmark: (state, action: PayloadAction<string>) => {
      console.log("set bookman on", action.payload);
      const imdbIdToToggle = action.payload;
      const movieToUpdate = state.find(
        (movie) => movie.imdbId === imdbIdToToggle
      );
      if (movieToUpdate) {
        movieToUpdate.bookmarked = !movieToUpdate.bookmarked;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      if (state.find((e) => e.imdbId === action.payload.imdbId)) {
        return;
      }
      state.push(action.payload);
    });
    builder.addCase(fetchMovieById.rejected, () => {
      console.error("Movie already in store");
    });
    builder.addCase(searchMovieByTitle.fulfilled, () => {
      console.log("- display page of film if found");
    });
    builder.addCase(searchMovieByTitle.rejected, (_, action) => {
      console.error(action.payload);
    });
  },
});

export const { deleteCard, setBookmark } = movieSlice.actions;

export default movieSlice.reducer;
