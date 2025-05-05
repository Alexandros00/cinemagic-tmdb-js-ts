import "./InfiniteScrollSentinel.scss";

export function createInfiniteScrollSentinel(
  areMorePages: boolean,
  text: string
): HTMLElement {
  const sentinel = document.createElement("div");
  sentinel.className = "infinite-scroll-sentinel";
  sentinel.id = "infinite-scroll-sentinel";
  sentinel.ariaHidden = "true";

  if (areMorePages) sentinel.textContent = text ?? "Loading...";

  return sentinel;
}
