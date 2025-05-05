import { Genre } from "./Genre";

export type Movie = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  genre_ids: number[];
  genres?: Genre[];
  vote_average: number;
  overview: string;
};
