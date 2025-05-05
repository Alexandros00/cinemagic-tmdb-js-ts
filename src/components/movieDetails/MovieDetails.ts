import { Movie } from "../../entities/Movie";
import { SimilarMoviesResponse } from "../../entities/SimilarMovies";
import { Service } from "../../services/Service";
import { createImageElement } from "../common/createImageElement";
import { createReviewsElement } from "../reviewsElement/ReviewsElement";
import { createIframeContainerElement } from "./helpers/iframeHelpers";
import "./MovieDetails.scss";

export function createMovieDetailsModal(movieId: number): void {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.onclick = () => {
    modalOverlay.classList.add("modal-out");

    modalOverlay.addEventListener(
      "animationend",
      () => {
        modalOverlay.remove();
        document.body.classList.remove("no-scroll");
      },
      { once: true }
    );
  };

  handleMovieModal(movieId, modalOverlay);

  document.body.classList.add("no-scroll");
}

async function handleMovieModal(movieId: number, modalOverlay: HTMLDivElement) {
  const useCommonParams = true;
  const service = new Service<Movie>(`movie/${movieId}`, useCommonParams);

  try {
    const movie = await service.getEntities();
    const modal = await createModalPanel(movie);
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
  } catch (error) {
    console.error("Error on creating modal", error);
  }
}

async function createModalPanel(movie: Movie): Promise<HTMLElement> {
  const modal = document.createElement("section");
  modal.className = "modal";

  const title = document.createElement("h3");
  title.className = "movie-card__title";
  title.textContent = movie.title;
  modal.appendChild(title);

  await createIframeContainerElement(movie.id, modal);
  await createReviewsElement(movie.id, modal);
  createSimilarMoviesElement(movie.id, modal);

  return modal;
}

async function createSimilarMoviesElement(
  movieId: number,
  article: HTMLElement
): Promise<void> {
  const useCommonParams = true;
  const numberOfSimilarMovies = 4;
  const service = new Service<SimilarMoviesResponse>(
    `movie/${movieId}/similar`,
    useCommonParams
  );
  const similarMovies = await service.getEntities();

  // TODO: Show message when no similar movies are available
  if (!similarMovies || !similarMovies?.results.length) return;

  const similarMoviesSection = document.createElement("section");
  similarMoviesSection.className = "movie-card__similar-movies";

  const sectionTitle = document.createElement("header");
  sectionTitle.className = "movie-card__similar-movies-title";
  sectionTitle.textContent = similarMovies?.results.length
    ? "Similar Movies"
    : "No similar movies available";

  const similarMoviesList = document.createElement("div");
  similarMoviesList.className = "movie-card__similar-movies-list";

  similarMovies?.results
    .slice(0, numberOfSimilarMovies)
    .forEach((movieData) => {
      const movie = document.createElement("div");
      movie.className = "movie-card__similar-movie";

      const img = createImageElement({
        poster_path: movieData.poster_path,
        className: "movie-card__similar-movie-poster"
      });

      const title = document.createElement("header");
      title.className = "movie-card__similar-movie-title";
      title.textContent = movieData.title;

      const footer = document.createElement("footer");
      footer.className = "movie-card__similar-movie-footer";

      const rating = document.createElement("span");
      rating.className = "movie-card__similar-movie-rating";
      rating.textContent = movieData.vote_average
        ? movieData.vote_average.toFixed(1) + " / 10"
        : "N/A";

      const year = document.createElement("span");
      year.className = "movie-card__similar-movie-year";
      year.textContent = new Date(movieData.release_date)
        .getFullYear()
        .toString();
      footer.appendChild(rating);
      footer.appendChild(year);

      movie.appendChild(title);
      movie.appendChild(img);
      movie.appendChild(footer);
      similarMoviesList.appendChild(movie);
    });

  similarMoviesSection.appendChild(sectionTitle);
  similarMoviesSection.appendChild(similarMoviesList);
  article.appendChild(similarMoviesSection);
}
