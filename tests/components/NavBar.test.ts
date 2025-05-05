import { expect } from "vitest";
import { createNavBar } from "../../src/components/navbar/NavBar";

describe("createNavbar", () => {
  let navbar: HTMLElement | null;

  beforeEach(() => {
    document.body.innerHTML = "";
    navbar = createNavBar();
    document.body.appendChild(navbar);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });
  it("should return a <nav> element with a class navbar", () => {
    navbar = document.querySelector(".navbar");
    expect(navbar?.tagName).toBe("NAV");
    expect(navbar).toHaveClass("navbar");
  });

  it("should include <h1> with the text 'cinemagic'", () => {
    navbar = document.querySelector(".navbar")!;

    const h1 = navbar.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(/cinemagic/i);
  });
});
