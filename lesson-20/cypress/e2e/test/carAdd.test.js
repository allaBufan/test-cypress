//TODO
describe('Test sign up', () => {
    beforeEach(() => {
      cy.visit('https://qauto.forstudy.space/', {
          auth: {
              username: 'guest',
              password: 'welcome2qauto'
          }
      })
  });

  beforeEach(() => {
    const email = 'jd@aaa.com';
    const password = 'gZ4DQ{}7';
    
    cy.login(email, password);   
  });

    it('Add a car', () => {
        cy.contains('button', 'Add car').click();
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-title').contains('Add a car');
        cy.get('#addCarBrand').select(0); 
        cy.get('#addCarBrand').select(0); 
        cy.get('#addCarMileage').type('555'); 
        cy.get('.modal-content').contains('button', 'Add').click();
    });

    it('Add a fuel expense', () => {
        cy.contains('button', 'Add fuel expense').click();
		cy.get('.modal-title').contains('Add an expense');
        cy.get('.modal-content').should('be.visible');
        cy.get('#addExpenseCar').select(0); 
        cy.get('#addExpenseDate').focus(); 
        cy.get('#addExpenseMileage').type('70'); 
		cy.get('#addExpenseLiters').type('10');
		cy.get('#addExpenseTotalCost').type('550');
        cy.get('.modal-content').contains('button', 'Add').click();
    });
});
