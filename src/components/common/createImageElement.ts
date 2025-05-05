import { handleNonValidImg } from "../../helpers";

type ImageElementOptions = {
  poster_path: string | null;
  alt?: string | null;
  className?: string;
  size?: string;
};

export function createImageElement(props: ImageElementOptions) {
  const defaultSize = props.size ?? "w500";

  const img = document.createElement("img");
  img.className = "movie-card__poster " + (props.className ?? "");
  if (props.className) img.classList.add(...props.className.split(" "));
  img.src = `https://image.tmdb.org/t/p/${defaultSize}${props.poster_path}`;
  img.alt = props.alt ?? "No description available";
  img.onerror = handleNonValidImg;
  return img;
}
