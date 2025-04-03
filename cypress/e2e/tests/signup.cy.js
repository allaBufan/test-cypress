describe('Sign up test', () => {
    beforeEach(() => {
      cy.visit('https://qauto.forstudy.space/', {
          auth: {
              username: 'guest',
              password: 'welcome2qauto'
          }
      })
  });

    it('Sign up - successful', () => {
        cy.register('Jane', 'Doe', 'jd@aaa.com', 'gZ4DQ{}7');
        cy.contains('button', 'Register').click();
    });

    it('Sign up - failed: empty fields', () => {
        cy.contains('button', 'Sign up').click();
        cy.get('.modal-content').should('be.visible');
        cy.contains('h4.modal-title', 'Registration').should('exist');

        cy.checkInvalidField('name', 'Name required');
        cy.checkInvalidField('lastName', 'Last name required');
        cy.checkInvalidField('email', 'Email required');
        cy.checkInvalidField('password', 'Password required');
        cy.checkInvalidField('repeatPassword', 'Re-enter password required');

        cy.contains('button', 'Register').should('be.disabled');
    });

    it('Sign up - failed: wrong data', () => {
        cy.register('Офту', 'Вщу', 'jdaaa.com', '12345678');
        
        cy.get('form input[name="name"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Name is invalid');
        cy.get('form input[name="lastName"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Last name is invalid');
        cy.get('form input[name="email"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Email is incorrect');
        cy.get('form input[name="password"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        cy.get('form input[name="repeatPassword"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        cy.contains('button', 'Register').should('be.disabled');
    });

    it('Sign up - failed: wrong length: too short', () => {
        cy.register('J', 'D', 'jd@aaa.com', 'gZ4DQ{}7');
        cy.get('form input[name="name"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Name has to be from 2 to 20 characters long');
        cy.get('form input[name="lastName"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Last name has to be from 2 to 20 characters long');
        cy.contains('button', 'Register').should('be.disabled');
    });

    it('Sign up - failed: wrong length: too long', () => {
        cy.register('Jane12345678901234567', 'Doe123456789012345678', 'jd@aaa.com', 'gZ4DQ{}7');
        cy.get('form input[name="name"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Name has to be from 2 to 20 characters long');
        cy.get('form input[name="lastName"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Last name has to be from 2 to 20 characters long');
        cy.contains('button', 'Register').should('be.disabled');
    });

    it('Sign up - failed: pass dont match', () => {
        cy.register('Jane', 'Doe', 'jd@aaa.com', 'gZ4DQ{}7');
    
        cy.get('form input[name="repeatPassword"]').clear().type('gZ4DQ{}8').blur(); //clears predefined value and enters different
        cy.get('form input[name="repeatPassword"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('.invalid-feedback').should('contain', 'Passwords do not match');
        cy.contains('button', 'Register').should('be.disabled');
        });

    it('Custom login with created credentials', () => {
        const email = 'jd@aaa.com';
        const password = 'gZ4DQ{}7';
        
        cy.login(email, password);
        cy.contains('button', 'Login').click();
        cy.url().should('include', '/panel'); // checks if user is redirected after successfull login
    });
});
