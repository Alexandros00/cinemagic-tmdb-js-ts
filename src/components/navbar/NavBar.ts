import "./NavBar.scss";

export function createNavBar(): HTMLElement {
  const navbar = createNavElement();

  const h1 = createNavbarHeader();

  navbar.appendChild(h1);
  return navbar;
}

function createNavElement(): HTMLElement {
  const navbar = document.createElement("nav");
  navbar.className = "navbar";
  return navbar;
}

function createNavbarHeader(): HTMLElement {
  const h1 = document.createElement("h1");
  h1.id = "navbar-header";
  h1.textContent = "CineMagic";
  return h1;
}
