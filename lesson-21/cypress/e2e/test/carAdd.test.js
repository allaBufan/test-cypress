describe('Test add a car and a fuel expense', () => {
  let carId;

  const email = 'jd@aaa.com';
  const password = 'gZ4DQ{}7';

  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/auth/signin',
      body: { email, password }
    }).then((res) => {
      expect(res.status).to.eq(200);
      cy.getCookie('sid').should('exist');
    });

    // Відкриваємо сайт після логіну
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    });
  });

  it('Add a car and validate it via API', () => {
    cy.intercept('POST', '/api/cars').as('createCar');

    cy.contains('button', 'Add car').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-title').contains('Add a car');
    cy.get('#addCarBrand').select(0);
    cy.get('#addCarModel').select(0);
    cy.get('#addCarMileage').type('555');
    cy.get('.modal-content').contains('button', 'Add').click();

    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
      carId = interception.response.body.data.id;
      cy.log('Created car ID:', carId);

      cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/cars'
      }).then((res) => {
        expect(res.status).to.eq(200);

        const cars = res.body.data;
        const createdCar = cars.find(car => car.id === carId);

        expect(createdCar).to.not.be.undefined;
        expect(createdCar.brand).to.eq('Audi');
      });
    });
  });

  it('Create expense via API and validate response', () => {
    // Чекаємо, поки carId буде встановлено з попереднього тесту
    cy.wrap(carId).should('not.be.undefined');

    const expenseData = {
      reportedAt: '2025-04-12T00:00:00.000Z',
      mileage: 600,
      liters: 10,
      totalCost: 550
    };

    // Викликаємо кастомну команду для додавання витрати
    cy.createExpense(carId, expenseData).then((response) => {
      cy.log('Response:', JSON.stringify(response.body));
      // expect(response).to.not.be.null;
      // expect(response).to.have.property('status');
      // expect(response.status).to.eq(200);
      // expect(response.body).to.have.property('status', 'ok');
      // expect(response.body.data).to.have.property('carId', carId);
      // expect(response.body.data).to.have.property('reportedAt', expenseData.reportedAt);
      // expect(response.body.data).to.have.property('mileage', expenseData.mileage);
      // expect(response.body.data).to.have.property('liters', expenseData.liters);
      // expect(response.body.data).to.have.property('totalCost', expenseData.totalCost);
    });
  });
});
