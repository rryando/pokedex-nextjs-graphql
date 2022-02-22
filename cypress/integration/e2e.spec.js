const hasAtLeastOneClass = (expectedClasses) => {
  return ($el) => {
    const classList = Array.from($el[0].classList);
    // return class that have substring of search query
    return classList.some((className) =>
      expectedClasses.some((expectedClass) => className.includes(expectedClass))
    );
  };
};

// e2e testing main flow

describe("Navigation", () => {
  it("should fetch new pokemon on scroll", () => {
    cy.visit("localhost:3000/");
    // Start from the index page
    cy.get("#scroll-container").scrollTo(0, 2000);
    cy.contains("#013").should("be.visible");
  });
  it("should navigate to the details page", () => {
    // Start from the index page
    cy.visit("localhost:3000/");
    // Find a link with an href attribute containing "about" and click it
    cy.contains("bulbasaur").click();
    // The new url should include "/about"
    cy.url().should("include", "/bulbasaur");
  });

  it("should trigger tray on scroll and change class to active on header click", () => {
    cy.visit("localhost:3000/bulbasaur");
    cy.get("#scrollable-status-section-header").click();
    cy.get("#scrollable-status-section-header").should(
      "satisfy",
      hasAtLeastOneClass(["itemActive"])
    );
  });

  it("should redirect to evolution page on click", () => {
    cy.contains("venusaur").click();
    cy.url().should("include", "/venusaur");
  });

  it("should back to / on back header click", () => {
    cy.contains("Back").click();
    cy.url().should("include", "/");
  });
});
