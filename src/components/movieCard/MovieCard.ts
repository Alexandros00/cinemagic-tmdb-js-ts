import { Movie } from "../../entities/Movie";
import { createCustomPlaceholder } from "../common/customPlaceholder/CustomPlaceholder";
import "./MovieCard.scss";

export function createMovieCard({
  movie,
  openDetailsModal
}: {
  movie: Movie;
  openDetailsModal: (movieId: number) => void;
}): HTMLElement {
  const article = document.createElement("article");
  article.className = "movie-card";
  article.onclick = () => openDetailsModal(movie.id);

  const placeholder = createCustomPlaceholder({
    "data-src": movie.poster_path,
    "data-alt": movie.title ?? "No title available"
  });
  placeholder.classList.add("movie-card__placeholder", "movie-card__lazy");

  const content = generateMovieContent(movie);

  const fragment = createMovieCardFragment(placeholder, content);

  article.appendChild(fragment);
  return article;
}

function generateMovieContent(movie: Movie) {
  const year = createYearElement(movie);
  const genres = createGenresElement(movie);
  const voteAverage = createVoteAverageElement(movie);
  const multipleInfo = createMultipleInfoElement({
    year,
    voteAverage
  });
  const title = createTitle(movie);
  const overview = createMovieOverviewElement(movie);
  const content = createMovieCardContentElement(
    multipleInfo,
    title,
    overview,
    genres
  );
  return content;
}

function createMultipleInfoElement({
  year,
  voteAverage
}: {
  year: HTMLElement;
  voteAverage?: HTMLElement;
}) {
  const multipleInfo = document.createElement("div");
  multipleInfo.className = "movie-card__multiple-info";
  multipleInfo.appendChild(year);
  if (voteAverage) multipleInfo.appendChild(voteAverage);

  return multipleInfo;
}

function createVoteAverageElement(movie: Movie) {
  const voteAverageContainer = document.createElement("div");
  if (!movie.vote_average) {
    return;
  }
  voteAverageContainer.className = "movie-card__vote-average-container";
  const voteAverageMeter = createVoteAverageMeter(movie);
  const voteAverageText = createVoteAverageText(movie);
  voteAverageContainer.appendChild(voteAverageMeter);
  voteAverageContainer.appendChild(voteAverageText);
  return voteAverageContainer;
}

function createVoteAverageText(movie: Movie) {
  const voteAverageText = document.createElement("span");
  voteAverageText.className = "movie-card__vote-average-text";
  const voteText = movie.vote_average
    ? movie.vote_average.toFixed(2) + " / 10"
    : "No vote average available";
  voteAverageText.textContent = voteText;
  return voteAverageText;
}

function createVoteAverageMeter(movie: Movie) {
  const voteAverageMeter = document.createElement("meter");
  voteAverageMeter.className = "movie-card__vote-average-meter";
  voteAverageMeter.min = 0;
  voteAverageMeter.max = 10;
  voteAverageMeter.low = 4;
  voteAverageMeter.high = 7;
  voteAverageMeter.optimum = 10;
  voteAverageMeter.value = movie.vote_average ?? 0;
  return voteAverageMeter;
}

function createGenresElement(movie: Movie) {
  const genres = document.createElement("span");
  genres.className = "movie-card__genres";
  if (!movie.genres) {
    genres.textContent = "No genres available";
  } else {
    movie.genres?.map((genre) => {
      const singleGenre = document.createElement("span");
      singleGenre.className = "movie-card__genre";
      singleGenre.textContent = genre.name;
      genres.appendChild(singleGenre);
    });
  }
  return genres;
}

function createYearElement(movie: Movie) {
  const year = document.createElement("time");
  year.className = "movie-card__year";
  year.textContent = movie.release_date
    ? new Date(movie.release_date).getFullYear() + ""
    : "No year available";
  return year;
}

function createMovieCardFragment(
  placeholder: HTMLElement,
  content: HTMLDivElement
) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(placeholder);
  fragment.appendChild(content);
  return fragment;
}

function createMovieCardContentElement(
  multipleInfo: HTMLDivElement,
  title: HTMLHeadingElement,
  overview: HTMLParagraphElement,
  genres: HTMLSpanElement
) {
  const content = document.createElement("div");
  content.className = "movie-card__content";
  content.appendChild;
  content.appendChild(multipleInfo);
  content.appendChild(title);
  content.appendChild(overview);
  content.appendChild(genres);
  return content;
}

function createMovieOverviewElement(movie: Movie) {
  const overview = document.createElement("p");
  overview.className = "movie-card__overview";
  overview.textContent = movie.overview ?? "No overview available";
  return overview;
}

function createTitle(movie: Movie) {
  const title = document.createElement("h3");
  title.className = "movie-card__title";
  title.textContent = movie.title ?? "No title available";
  return title;
}
