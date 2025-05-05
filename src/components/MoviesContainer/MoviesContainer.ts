import { MoviesStore } from "../../stores/MoviesStore.ts";
import {
  infiniteLoadingMovies as infiniteScrollingMovies,
  observerMoviesOptions
} from "./infiniteLoadMovies.ts";
import "./MoviesContainer.scss";

export async function createMoviesContainer(
  landingPage: HTMLElement,
  moviesStore: MoviesStore
): Promise<void> {
  const moviesContainer = createMoviesContainerElement();
  const h2 = generateH2Element();
  landingPage.appendChild(h2);
  moviesStore.setParentElement(moviesContainer);

  landingPage.appendChild(moviesContainer);

  function observerCallback(entries: IntersectionObserverEntry[]): void {
    infiniteScrollingMovies({
      entries,
      moviesStore
    });
  }

  moviesStore.setObserver(
    new IntersectionObserver(observerCallback, observerMoviesOptions)
  );
}

function generateH2Element() {
  const h2 = document.createElement("h2");
  h2.className = "landing-page__h2";
  h2.textContent = "In theaters this week";
  return h2;
}

function createMoviesContainerElement() {
  const moviesContainer = document.createElement("section");
  moviesContainer.className = "movies-container";
  moviesContainer.id = "movies-container";
  return moviesContainer;
}
