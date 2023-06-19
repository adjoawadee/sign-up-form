describe('Sign Up', () => {
    it('successfully submits the form', () => {
        cy.visit('localhost:3000'); // Replace with the URL path to your sign-up page
        
        cy.get('#firstName').type('Adjoa');
        cy.get('#lastName').type('Wadee');
        cy.get('#email').type('adjoa@example.com');
        cy.get('#password').type('SecurePass123');

        cy.intercept('POST', 'https://demo-api.now.sh/users', (req) => {
            req.reply({});
          }).as('submitRequest');

        cy.intercept('GET', 'https://demo-api.now.sh/users', (req) => {
        req.reply({ data: {} });
        }).as('fetchRequest');

        cy.get('button').click().click();


        cy.wait('@submitRequest').its('request.body').should('deep.eq', {
        firstName: 'Adjoa',
        lastName: 'Wadee',
        email: 'adjoa@example.com',
        password: 'SecurePass123',
        });

        cy.wait(4000);

        cy.wait('@fetchRequest');

        cy.get('[data-testid="success-message"]').should('be.visible');

        });
  });