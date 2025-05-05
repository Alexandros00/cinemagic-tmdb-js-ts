import { Movie } from "./Movie";

export type SimilarMoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
