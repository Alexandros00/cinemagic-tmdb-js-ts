describe("Main Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the app", () => {
    cy.get("#app").should("exist");
  });

  it("should render the with the app name", () => {
    cy.get(".navbar").should("exist");
    cy.contains(".navbar", /cinamagic/i);
  });

  it("should render the landing page", () => {
    cy.get(".landing-page").should("exist");
  });

  it("should render the search input", () => {
    cy.get(".search-input").should("exist");
  });

  it("should render the main header with the text 'In theaters this week'", () => {
    cy.get(".landing-page__h2").should("exist");
    cy.contains(".landing-page__h2", /theaters/i);
  });

  it("should render the go-to-top button", () => {
    cy.get(".go-to-top-button").should("exist");
  });
});
