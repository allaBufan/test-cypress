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

// cypress/support/commands.js

//Custom command to add expanse
// Cypress.Commands.add('createExpense', (carId, expenseData) => {
//     cy.window().then((win) => {
//       cy.log('Waiting for token...');
  
//       // Waits for token
//       cy.wrap(null).should(() => {
//         const token = win.localStorage.getItem('token');
//         expect(token, 'Token must exist in localStorage').to.be.a('string').and.not.be.empty;
//       });
  
//       const token = win.localStorage.getItem('token');
  
//       cy.request({
//         method: 'POST',
//         url: 'https://qauto.forstudy.space/api/expenses',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: {
//           carId: carId,
//           date: expenseData.date,
//           mileage: expenseData.mileage,
//           liters: expenseData.liters,
//           totalCost: expenseData.totalCost,
//         }
//       }).then((response) => {
//         expect(response.status).to.eq(201);
//         cy.log('Expense created:', response.body);
//       });
//     });
//   });

//Custom command to add expense with apiLogin
// Cypress.Commands.add('createExpense', (carId, expenseData) => {
//   // Виконати авторизацію перед запитом на створення витрат
//   cy.login('your_email@example.com', 'your_password').then(() => {
//     // Надсилаємо запит на створення витрат з авторизацією
//     cy.window().then((win) => {
//       const token = win.localStorage.getItem('token');
//       expect(token, 'Token must exist in localStorage').to.be.a('string').and.not.be.empty;

//       cy.request({
//         method: 'POST',
//         url: 'https://qauto.forstudy.space/api/expenses',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: {
//           carId: carId,
//           date: expenseData.date,
//           mileage: expenseData.mileage,
//           liters: expenseData.liters,
//           totalCost: expenseData.totalCost,
//         }
//       }).then((response) => {
//         // Перевірка статусу відповіді
//         expect(response.status).to.eq(201);

//         // Логуємо респонс
//         cy.log('Expense created:', response.body);

//         // Перевірка наявності коректних даних в респонсі
//         expect(response.body.data).to.have.property('carId', carId);
//         expect(response.body.data).to.have.property('date', expenseData.date);
//         expect(response.body.data).to.have.property('mileage', expenseData.mileage);
//         expect(response.body.data).to.have.property('liters', expenseData.liters);
//         expect(response.body.data).to.have.property('totalCost', expenseData.totalCost);
//       });
//     });
//   });
// });

//Custom command apiLogin
//   Cypress.Commands.add('apiLogin', (email, password) => {
//     cy.request({
//       method: 'POST',
//       url: 'https://qauto.forstudy.space/api/auth/signin',
//       body: { email, password }
//     }).then((response) => {
//       expect(response.status).to.eq(200); // Перевірка, що отримано статус 200
//       const token = response.body.token;
//       expect(token).to.be.a('string').and.not.be.empty; // Перевірка, що токен існує
  
//       // Saves token to localStorage
//       cy.window().then((win) => {
//         win.localStorage.setItem('token', token);
//       });
//     });
//   });

//Custom command to add expense
Cypress.Commands.add('createExpense', (carId, expenseData) => {
    // НSend request to add expense
    cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/expenses',
      body: {
        carId: carId,
        reportedAt: expenseData.reportedAt,
        mileage: expenseData.mileage,
        liters: expenseData.liters,
        totalCost: expenseData.totalCost,
      }
    }).then((response) => {
      // Validates reposnse status
    //   expect(response.status).to.eq(200);
  
      // Logs response
      cy.log('Expense created:', JSON.stringify(response.body));
  
      // Validates data
      // expect(response).to.not.be.null;
      // expect(response).to.have.property('status');
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('status', 'ok');
      expect(response.body.data).to.have.property('carId', carId);
      expect(response.body.data).to.have.property('reportedAt', expenseData.reportedAt);
      expect(response.body.data).to.have.property('mileage', expenseData.mileage);
      expect(response.body.data).to.have.property('liters', expenseData.liters);
      expect(response.body.data).to.have.property('totalCost', expenseData.totalCost);

      return cy.wrap(response);
    });
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
// Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
//     if (options && options.sensitive) {
//     // turn off original log
//     options.log = false
//     // create our own log with masked message
//     Cypress.log({
//         $el: element,
//         name: 'type',
//         message: '*'.repeat(text.length),
//     })
//     }
    
//     return originalFn(element, text, options)
//   })
  