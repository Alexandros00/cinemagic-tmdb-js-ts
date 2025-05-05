export type Video = {
  movieId?: number;
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

export type VideosResponse = {
  id: number;
  results: Video[];
};
