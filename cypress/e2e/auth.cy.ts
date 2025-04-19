describe('Authentication', () => {
  it('should redirect to login when accessing protected routes', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });

  it('should display login form with all elements', () => {
    cy.visit('/login');

    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.contains('button', 'Login').should('exist');
    cy.contains('a', 'Forgot password?').should('exist');
  });

  it('should show validation errors with invalid credentials', () => {
    cy.visit('/login');

    // Try to submit with invalid email
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', 'Login').click();

    // Validation error should appear
    cy.contains('Please enter a valid email address').should('be.visible');

    // Clear and try with empty password
    cy.get('input[type="email"]').clear().type('valid@asafe.com');
    cy.get('input[type="password"]').clear();
    cy.contains('button', 'Login').click();

    // Validation error should appear
    cy.contains('Please enter a valid password').should('be.visible');
  });

  it('should allow toggling password visibility', () => {
    cy.visit('/login');

    // Password should be hidden initially
    cy.get('input[type="password"]').should('exist');

    // Click the show password button
    cy.get('button').find('[class*="EyeOff"], [class*="Eye"]').parent().click();

    // Password should now be visible
    cy.get('input[type="text"]').should('exist');

    // Click again to hide
    cy.get('button').find('[class*="EyeOff"], [class*="Eye"]').parent().click();

    // Password should be hidden again
    cy.get('input[type="password"]').should('exist');
  });

  // This test assumes the app has authentication and will redirect to dashboard after login
  it('should allow login with valid credentials', () => {
    cy.visit('/login');

    // Enter valid credentials
    cy.get('input[type="email"]').type('user@asafe.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', 'Login').click();

    // Check that navigation happens to dashboard
    // This might need to be adjusted depending on the actual redirect path
    cy.url().should('not.include', '/login');

    // Check for elements that would only appear when logged in
    cy.get('header').should('exist');
    cy.contains('Sign out').should('exist');
  });
});
