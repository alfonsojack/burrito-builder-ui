describe("Write a test covering what should be displayed when the user first visits the page.", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200, 
      fixture: "example"
  })
    cy.visit("http://localhost:3000/");
  })
  
  it("Write a test covering what should be displayed when the user first visits the page.", () => {
    cy.get('h1').should('contain', 'Burrito Builder');
    cy.get('input').should('have.value', '');
    cy.get('[name="beans"]').should('exist');
    cy.get(':nth-child(15)').should('contain', 'Submit Order');
    cy.get('section > :nth-child(1)').should('contain', 'Pat');
    cy.get('p').should('contain', 'Nothing');
    cy.get('section').children().should('have.length', '3')
  });

  it("Write a test to check the user flow of adding a new order to the DOM.", () => {
    cy.get('h1').should('contain', 'Burrito Builder');
    cy.get('input').type('Jack');
    cy.get('[name="beans"]').click()
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statusCode: 201, 
      fixture: "postOrder"
    })
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: "newGet"
    })
    cy.get(':nth-child(15)').click()
    cy.get('section > :nth-child(4)').should('contain', 'Jack').should('contain', 'beans')
    
  });

  it("Write a test to check that orders cannot be submitted without a name and at least one ingredient.", () => {
    cy.get('input').should('have.value', '');
    cy.get('[name="steak"]').click();
    cy.get('p').should('contain', 'steak');
    cy.get(':nth-child(15)').click();
    cy.get('form > :nth-child(1)').should('contain', "PROVIDE A NAME AND INGREDIENT");
    cy.get('section').children().should('have.length', '3')
    cy.get('input').type('Jack');
    cy.get(':nth-child(15)').should('contain', 'Nothing selected');
    cy.get(':nth-child(16)').click();
    cy.get('form > :nth-child(1)').should('contain', "PROVIDE A NAME AND INGREDIENT");
    cy.get('section').children().should('have.length', '3')
    cy.get('input').should('have.value', '');
    cy.get(':nth-child(15)').should('contain', 'Nothing selected');
    cy.get('section').children().should('have.length', '3')
    cy.get(':nth-child(16)').click();
    cy.get('form > :nth-child(1)').should('contain', 'PROVIDE A NAME AND INGREDIENT')
  });
});

// Write a test covering what should be displayed when the user first visits the page.
// Write a test to check the user flow of adding a new order to the DOM.
// Write a test to check that orders cannot be submitted without a name and at least one ingredient.
