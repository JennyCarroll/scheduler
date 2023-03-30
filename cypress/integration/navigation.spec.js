describe("Navigation", () => {
  beforeEach(() => {
    //visit the root
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    //target the list item element that contains Tuesday
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
