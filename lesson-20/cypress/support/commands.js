// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// Custom command for sign in
Cypress.Commands.add('login', (email, password) => { 
    cy.contains('button', 'Sign In').click()
    cy.get('form input[name="email"]').type(email);
    cy.get('form input[name="password"]').type(password,{ sensitive: true });
    cy.contains('button', 'Login').click()
  })

  // Custom command for sign up
Cypress.Commands.add('register', (name, lastName, email, password) => {
    cy.contains('button', 'Sign up').click();
    cy.get('.modal-content').should('be.visible');
    cy.contains('h4.modal-title', 'Registration').should('exist');

    cy.get('form input[name="name"]').type(name);
    cy.get('form input[name="lastName"]').type(lastName);
    cy.get('form input[name="email"]').type(email);
    cy.get('form input[name="password"]').type(password);
    cy.get('form input[name="repeatPassword"]').type(password).blur(); // switching focus from the last element to trigger validation
    // cy.contains('button', 'Register').click();
});

// Custom command to check error messages view
Cypress.Commands.add('checkInvalidField', (fieldName, errorMessage) => {
    cy.get(`form input[name="${fieldName}"]`).clear().blur();
    cy.get(`form input[name="${fieldName}"]`).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('.invalid-feedback').should('be.visible').and('contain', errorMessage);
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Command to hide sensitive data like passwords in logs
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
    })
    }
    
    return originalFn(element, text, options)
  })
  