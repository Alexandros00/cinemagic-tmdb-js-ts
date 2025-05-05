import "./CustomPlaceholder.scss";

export function createCustomPlaceholder(
  attributes?: Record<string, string>
): HTMLElement {
  const div = document.createElement("div");
  div.className = "custom-placeholder";
  if (!attributes) {
    return div;
  }
  for (const [key, value] of Object.entries(attributes)) {
    div.setAttribute(key, value);
  }
  return div;
}
