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

  describe("login", function () {
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
  describe("logged user can ", function () {
    beforeEach(function () {
      cy.login({ username: "daba", password: "duu" });
    });
    it("create a new blog ", function () {
      cy.contains("new blog").click();
      cy.get("#url").type("daaa.com");
      cy.get("#title").type("duuu");
      cy.get("#author").type("juuu");
      cy.contains("save").click();
      cy.contains("new blog duuu by juuu added");
      cy.get("#listOfBlogs").contains("duuu juuu");
    });
    describe("and when a blog exists", function () {
      describe("and when several blogs exist", function () {
        beforeEach(function () {
          cy.createBlog({ url: "duu", title: "daa", author: "buu" });
          cy.createBlog({
            url: "asasa",
            title: "dusdasda",
            author: "buadasdu",
          });
          cy.createBlog({
            url: "asasaasd",
            title: "daasdadsdasda",
            author: "bujjjj",
          });
        });

        it("they can be liked", function () {
          cy.contains("daa").parent().contains("view").click();
          cy.contains("daa").parent().contains("like").click();
          cy.contains("Like added to buu");
        });

        it("or be deleted by the creator", function () {
          cy.contains("daa").parent().contains("view").click();
          cy.contains("daa").parent().contains("delete").click();
          cy.contains("blog deleted");
          cy.get("#listOfBlogs").should("not.contain", "duuu juuu");
        });

        it("and they are in order based on likes", function () {
          //makes sure the first created element is first in list
          cy.get("#listOfBlogs").children().first().contains("daa");

          //like an item five times
          cy.contains("dusdasda").parent().contains("view").click();
          for (let i = 0; i < 5; i++) {
            cy.contains("dusdasda").parent().contains("like").click();
          }
          //then like another blog three times
          cy.contains("daa").parent().contains("view").click();
          for (let i = 0; i < 3; i++) {
            cy.contains("daa").parent().contains("like").click();
          }

          //finally make sure items are in list based on likes
          cy.get("#listOfBlogs").children().eq(0).contains("dusdasda");
          cy.get("#listOfBlogs").children().eq(1).contains("daa");
          cy.get("#listOfBlogs").children().eq(2).contains("daasdadsdasda");
        });
      });
    });
  });
});
