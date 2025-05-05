import { createImageElement } from "../common/createImageElement";

const observerCardImageOptions = {
  root: document.querySelector(".movies-container"),
  rootMargin: "0px",
  threshold: 0.5
};

function lazyLoadImage(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const placeholder = entry.target as HTMLElement;
      const poster_path = placeholder.getAttribute("data-src");
      const alt = placeholder.getAttribute("data-alt");
      const img = createImageElement({ poster_path, alt });
      placeholder.replaceWith(img);
      observer.unobserve(placeholder);
    }
  });
}

export const observerCardImage = new IntersectionObserver(
  lazyLoadImage,
  observerCardImageOptions
);
