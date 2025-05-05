import { createGoToTopButton } from "../../components/GoToTopButton/goToTopButton";
import { createMoviesContainer } from "../../components/MoviesContainer/MoviesContainer";
import { createSearchInputElement } from "../../components/searchInput/SearchInput";
import { MoviesStore } from "../../stores/MoviesStore";

import "./LandingPage.scss";

export type SelectedTypeOptions = "now_playing" | "search";

export function modifyLandingPage(landingPage: HTMLElement) {
  const moviesStore = new MoviesStore();
  moviesStore.setServiceEndpointPath("movie/now_playing");

  if (!landingPage) {
    console.error("Landing page element is missing!");
    return;
  }

  const goToTopButton = createGoToTopButton();

  const searchInput = createSearchInputElement(moviesStore);

  const searchInputSentinel = createSearchInputSentinel();

  const observer = createSearchInputObserver(searchInput);
  observer.observe(searchInputSentinel);

  landingPage.appendChild(searchInputSentinel);
  landingPage.appendChild(searchInput);

  createMoviesContainer(landingPage, moviesStore);
  landingPage.appendChild(goToTopButton);
}

function createSearchInputSentinel(): HTMLDivElement {
  const searchInputSentinel = document.createElement("div");
  searchInputSentinel.className = "sticky-sentinel";
  searchInputSentinel.ariaHidden = "true";
  return searchInputSentinel;
}

function createSearchInputObserver(
  searchInput: HTMLElement
): IntersectionObserver {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        searchInput.classList.remove("search-input-scrolled");
      } else {
        searchInput.classList.add("search-input-scrolled");
      }
    },
    {
      root: null,
      threshold: 0
    }
  );
  return observer;
}
