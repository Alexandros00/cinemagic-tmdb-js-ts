const inputQuery = "kraven";

describe("SearchInput", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/search/movie*").as("getMoviesBySearch");
    cy.visit("/");
  });

  it("should render the search input", () => {
    cy.get(".search-input").should("exist");
  });

  it(`should be able to type: "${inputQuery}" into the search input`, () => {
    cy.get(".search-input").type(inputQuery);
  });

  it(`should be able to type: "${inputQuery}"  into the search input and get relevant results`, () => {
    cy.get(".search-input").type("kraven");
    cy.wait("@getMoviesBySearch");
    cy.get("#movies-container").should("exist");
    const items = cy.get("#movies-container").find("article");
    items.should("have.length.greaterThan", 1);
    cy.get("#movies-container article h3").contains(
      new RegExp(inputQuery, "i")
    );
  });
});
