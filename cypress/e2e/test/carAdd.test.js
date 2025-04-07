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

    it('Custom login with created credentials', () => {
        const email = 'jd@aaa.com';
        const password = 'gZ4DQ{}7';
        
        cy.login(email, password);
        cy.contains('button', 'Login').click();
        cy.url().should('include', '/panel'); // checks if user is redirected after successfull login
    });
});
