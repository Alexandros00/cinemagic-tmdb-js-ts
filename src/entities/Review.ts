export type Review = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

export type ReviewsResponse = {
  id: number;
  page: number;
  total_pages: number;
  total_results: number;
  results: Review[];
};
