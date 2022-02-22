const hasAtLeastOneClass = (expectedClasses) => {
  return ($el) => {
    const classList = Array.from($el[0].classList);
    // return class that have substring of search query
    return classList.some((className) =>
      expectedClasses.some((expectedClass) => className.includes(expectedClass))
    );
  };
};
const assertOnline = () => {
  return cy.wrap(window).its("navigator.onLine").should("be.true");
};

const assertOffline = () => {
  return cy.wrap(window).its("navigator.onLine").should("be.false");
};

const goOffline = () => {
  cy.log("**go offline**")
    .then(() => {
      return Cypress.automation("remote:debugger:protocol", {
        command: "Network.enable",
      });
    })
    .then(() => {
      return Cypress.automation("remote:debugger:protocol", {
        command: "Network.emulateNetworkConditions",
        params: {
          offline: true,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      });
    });
};

const goOnline = () => {
  // disable offline mode, otherwise we will break our tests :)
  cy.log("**go online**")
    .then(() => {
      // https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
      return Cypress.automation("remote:debugger:protocol", {
        command: "Network.emulateNetworkConditions",
        params: {
          offline: false,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      });
    })
    .then(() => {
      return Cypress.automation("remote:debugger:protocol", {
        command: "Network.disable",
      });
    });
};

describe("Offline flow", () => {
  beforeEach(goOnline);
  afterEach(goOnline);
  it("should save bulbasaur details to localForage", () => {
    cy.visit("localhost:3000/bulbasaur");
    cy.wait(1000);
    cy.url().should("include", "/bulbasaur");
    cy.visit("localhost:3000/");
    cy.contains("offline").should("be.visible");
  });

  it("should show offline alert on HomePage when go offline", () => {
    cy.visit("localhost:3000/");
    cy.wait(1000);
    goOffline();
    cy.wait(1000);
    assertOffline();
    cy.contains("you are offline").should("be.visible");
  });

  it("should show offline alert on detailsPage when go offline", () => {
    cy.visit("localhost:3000/bulbasaur");
    cy.wait(1000);
    goOffline();
    cy.wait(1000);
    assertOffline();
    cy.get("#offline-details-text").should("be.visible");
  });

  it("on offline, should be able to get bookmarked pokemon data", () => {
    cy.visit("localhost:3000/");
    cy.wait(1000);
    goOffline();
    cy.wait(1000);
    assertOffline();
    cy.get("#offline-bookmark").should("be.visible");
  });

  // it("on offline, should be able to navigate offline marked pokemon data", () => {
  //   // cy.visit("localhost:3000/");
  //   cy.wait(1000);
  //   goOffline();
  //   cy.wait(1000);
  //   cy.get("#pokemon-homepage-card").contains("offline").parent().click();
  //   // cy.wait(1000);
  //   // cy.get("#offline-bookmark").click();
  // });
});
