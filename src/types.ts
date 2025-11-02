export interface IMovie {
  imdbId: string;
  title: string;
  plot: string;
  // fullPlot: string;
  poster: string;
  bookmarked: boolean;
  custom?: boolean;
}

export interface IRootState {
  movies: IMovie[];
}
