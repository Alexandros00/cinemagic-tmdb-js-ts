import "./style.scss";
import { modifyLandingPage } from "./pages/landingPage/LandingPage";
import { createNavBar } from "./components/navbar/NavBar";

const app = document.getElementById("app") as HTMLDivElement;

function createLandingPageElement() {
  const landingPage = document.createElement("main");
  landingPage.className = "landing-page";
  landingPage.id = "landing-page";
  return landingPage;
}

function assemblePageFragment() {
  const fragment = document.createDocumentFragment();
  const navbar = createNavBar();
  const landingPage = createLandingPageElement();
  modifyLandingPage(landingPage);

  fragment.appendChild(navbar);
  fragment.appendChild(landingPage);
  return fragment;
}

function initializeApp() {
  if (!app) {
    throw new Error("App element not found");
  }
  const fragment = assemblePageFragment();
  app.appendChild(fragment);
}

initializeApp();
