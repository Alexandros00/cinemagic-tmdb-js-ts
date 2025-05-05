import "./goToTopButton.scss";

export function createGoToTopButton(): HTMLButtonElement {
  const goToTopButton = document.createElement("button");
  goToTopButton.className = "go-to-top-button";
  goToTopButton.onclick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };
  goToTopButton.appendChild(createGoToTopIcon());
  return goToTopButton;
}

function createGoToTopIcon() {
  const goToTopIcon = document.createElement("img");
  goToTopIcon.className = "go-to-top-icon";
  goToTopIcon.src = "/icons/arrow-up-solid.svg";
  goToTopIcon.alt = "Go to top";
  return goToTopIcon;
}
