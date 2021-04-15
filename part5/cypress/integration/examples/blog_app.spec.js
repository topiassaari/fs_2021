describe("blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "jaba",
      username: "daba",
      password: "duu",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Bloglist");
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();
    cy.get("#loginForm").click();
  });

  describe("Login", function () {
    it("succcessful login", function () {
      cy.contains("log in").click();
      cy.get("#username").type("daba");
      cy.get("#password").type("duu");
      cy.get("#login").click();
      cy.contains("daba logged in");
    });
    it("fails with wrong pw", function () {
      cy.contains("log in").click();
      cy.get("#username").type("daba");
      cy.get("#password").type("wrong");
      cy.get("#login").click();

      cy.get(".error").contains("wrong username or password");
      cy.get("html").should("not.contain", "daba logged in");
    });
  });
});
