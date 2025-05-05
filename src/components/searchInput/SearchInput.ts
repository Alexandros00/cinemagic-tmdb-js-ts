import { debounce } from "../../helpers";
import { MoviesStore } from "../../stores/MoviesStore";
import "./SearchInput.scss";

export function createSearchInputElement(moviesStore: MoviesStore) {
  const deb = debounce((event) => updateValue(event, moviesStore), 1000);

  const inputContainer = document.createElement("section");
  inputContainer.className = "search-input-container";
  inputContainer.appendChild(createSearchInput(deb));
  return inputContainer;
}

function createSearchInput(deb: (event: any) => void) {
  const input = document.createElement("input");
  input.className = "search-input";
  input.id = "search-input";
  input.placeholder = "Search for a movie...";
  input.type = "text";
  input.addEventListener("input", deb);
  return input;
}

function updateValue(e: Event, moviesStore: MoviesStore) {
  const query = (e.target as HTMLInputElement).value;
  console.log(query);

  moviesStore.setQuery(query);
}
