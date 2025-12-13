export interface IMovie {
  imdbId: string;
  title: string;
  plot: string;
  // fullPlot: string;
  poster: string;
  bookmarked: boolean;
  custom?: boolean;
}

export interface IUserSlice {
  userId: string | null;
  username: string | null;
  profileImageURL: string | null;
}

// export interface IRootState {
//   movies: IMovie[];
// }
