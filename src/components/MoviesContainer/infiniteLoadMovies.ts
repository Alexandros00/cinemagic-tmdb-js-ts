import { MoviesStore } from "../../stores/MoviesStore";

export const observerMoviesOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0
};

export function infiniteLoadingMovies({
  entries,
  moviesStore
}: {
  entries: IntersectionObserverEntry[];
  moviesStore: MoviesStore;
}): void {
  entries.forEach((entry) => {
    if (
      entry.isIntersecting &&
      !moviesStore.getIsLoading() &&
      moviesStore.getPage() < moviesStore.getTotalPages()
    )
      moviesStore.fetchMovies();
  });
}
