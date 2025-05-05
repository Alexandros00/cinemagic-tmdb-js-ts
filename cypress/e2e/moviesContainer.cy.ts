const itemsPerPage = 20;

describe("MoviesContainer", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/now_playing*").as("getMovies");
    cy.visit("/");
  });

  it("should render the MoviesContainer", () => {
    cy.wait("@getMovies");
    cy.get("#movies-container").should("exist");
  });

  it(`should be ${itemsPerPage} items (cards) inside MoviesContainer`, () => {
    cy.wait("@getMovies");
    const items = cy.get("#movies-container").find("article");
    items.should("have.length", itemsPerPage);
  });

  it("should have the first card with img", () => {
    cy.wait("@getMovies");
    cy.get("#movies-container article img").should("exist");
  });

  it("should make another call on scroll", () => {
    cy.wait("@getMovies");
    cy.scrollTo("bottom");
    cy.wait("@getMovies");
    const items = cy.get("#movies-container").find("article");
    items.should("have.length", itemsPerPage * 2);
  });
});
