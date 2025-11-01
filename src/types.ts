export interface IMovie {
  imdbId: string;
  title: string;
  plot: string;
  poster: string;
  bookmarked: boolean;
}

export interface IRootState {
  movies: IMovie[];
}
