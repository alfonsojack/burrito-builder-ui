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
    cy.get('[name="steak"]').should('exist');
    cy.get('[name="pico de gallo"]').should('exist');
    cy.get(':nth-child(15)').should('contain', 'Submit Order');
    cy.get('section > :nth-child(1)').should('contain', 'Pat');
    cy.get('section > :nth-child(2)').should('contain', 'Sam');
    cy.get('section > :nth-child(3)').should('contain', 'Alex');
    cy.get('p').should('contain', 'Nothing selected');
    cy.get('section').children().should('have.length', '3');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').should('contain', 'beans');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(2)').should('contain', 'lettuce');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(3)').should('contain', 'carnitas');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(4)').should('contain', 'queso fresco');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').should('contain', 'jalapeno');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(1)').should('contain', 'sofritas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(2)').should('contain', 'beans');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(3)').should('contain', 'sour cream');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(4)').should('contain', 'carnitas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(5)').should('contain', 'queso fresco');
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
    cy.get('section').children().should('have.length', '3');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').should('contain', 'beans');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(2)').should('contain', 'lettuce');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(3)').should('contain', 'carnitas');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(4)').should('contain', 'queso fresco');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').should('contain', 'jalapeno');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(1)').should('contain', 'sofritas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(2)').should('contain', 'beans');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(3)').should('contain', 'sour cream');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(4)').should('contain', 'carnitas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(5)').should('contain', 'queso fresco');
    cy.get(':nth-child(15)').click()
    cy.get('section').children().should('have.length', '4');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').should('contain', 'beans');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(2)').should('contain', 'lettuce');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(3)').should('contain', 'carnitas');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(4)').should('contain', 'queso fresco');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').should('contain', 'jalapeno');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(1)').should('contain', 'sofritas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(2)').should('contain', 'beans');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(3)').should('contain', 'sour cream');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(4)').should('contain', 'carnitas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(5)').should('contain', 'queso fresco');
    cy.get('section > :nth-child(4)').should('contain', 'Jack').should('contain', 'beans')
    
  });

  it("Write a test to check that orders cannot be submitted without a name and at least one ingredient.", () => {
    cy.get('input').should('have.value', '');
    cy.get('[name="steak"]').click();
    cy.get('p').should('contain', 'steak');
    cy.get(':nth-child(15)').click();
    cy.get('form > :nth-child(1)').should('contain', "PROVIDE A NAME AND INGREDIENT");
    cy.get('section').children().should('have.length', '3');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').should('contain', 'beans');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(2)').should('contain', 'lettuce');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(3)').should('contain', 'carnitas');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(4)').should('contain', 'queso fresco');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').should('contain', 'jalapeno');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(1)').should('contain', 'sofritas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(2)').should('contain', 'beans');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(3)').should('contain', 'sour cream');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(4)').should('contain', 'carnitas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(5)').should('contain', 'queso fresco');
    cy.get('input').type('Jack');
    cy.get(':nth-child(15)').should('contain', 'Nothing selected');
    cy.get(':nth-child(16)').click();
    cy.get('form > :nth-child(1)').should('contain', "PROVIDE A NAME AND INGREDIENT");
    cy.get('section').children().should('have.length', '3');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').should('contain', 'beans');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(2)').should('contain', 'lettuce');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(3)').should('contain', 'carnitas');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(4)').should('contain', 'queso fresco');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').should('contain', 'jalapeno');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(1)').should('contain', 'sofritas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(2)').should('contain', 'beans');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(3)').should('contain', 'sour cream');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(4)').should('contain', 'carnitas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(5)').should('contain', 'queso fresco');
    cy.get('input').should('have.value', '');
    cy.get(':nth-child(15)').should('contain', 'Nothing selected');
    cy.get('section').children().should('have.length', '3');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').should('contain', 'beans');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(2)').should('contain', 'lettuce');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(3)').should('contain', 'carnitas');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(4)').should('contain', 'queso fresco');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').should('contain', 'jalapeno');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(1)').should('contain', 'sofritas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(2)').should('contain', 'beans');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(3)').should('contain', 'sour cream');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(4)').should('contain', 'carnitas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(5)').should('contain', 'queso fresco');
    cy.get(':nth-child(16)').click();
    cy.get('form > :nth-child(1)').should('contain', 'PROVIDE A NAME AND INGREDIENT');
    cy.get('section').children().should('have.length', '3');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').should('contain', 'beans');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(2)').should('contain', 'lettuce');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(3)').should('contain', 'carnitas');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(4)').should('contain', 'queso fresco');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').should('contain', 'jalapeno');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(1)').should('contain', 'sofritas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(2)').should('contain', 'beans');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(3)').should('contain', 'sour cream');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(4)').should('contain', 'carnitas');
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(5)').should('contain', 'queso fresco');
  });
});

// Write a test covering what should be displayed when the user first visits the page.
// Write a test to check the user flow of adding a new order to the DOM.
// Write a test to check that orders cannot be submitted without a name and at least one ingredient.
