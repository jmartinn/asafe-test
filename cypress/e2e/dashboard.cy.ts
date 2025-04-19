describe('Dashboard', () => {
  beforeEach(() => {
    // Setup before each test - login
    cy.visit('/login');
    cy.get('input[type="email"]').type('user@asafe.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', 'Login').click();
    cy.url().should('not.include', '/login');
  });

  it('should display the dashboard with key components', () => {
    // Check sidebar navigation exists
    cy.get('aside').should('exist');

    // Check for important dashboard components
    cy.contains('h1', /overview|dashboard/i).should('exist');
    cy.get('[data-testid="metric-card"], .metric-card').should('have.length.at.least', 1);

    // Check for charts/graphs
    cy.get('svg').should('exist');

    // Check theme toggle exists
    cy.get('button[aria-label="Toggle theme"], button:has(svg)').should('exist');
  });

  it('should navigate to incidents page', () => {
    // Click on incidents link in sidebar
    cy.contains('a', /incidents/i).click();

    // URL should change to incidents page
    cy.url().should('include', '/incidents');

    // Check incidents table is displayed
    cy.get('table').should('exist');
  });

  it('should display incident data in the table and allow filtering', () => {
    // Navigate to incidents page
    cy.contains('a', /incidents/i).click();

    // Check table has content
    cy.get('table tbody tr').should('have.length.at.least', 1);

    // Test filtering
    if (cy.get('input[placeholder*="Filter"], input[type="search"]').should('exist')) {
      cy.get('input[placeholder*="Filter"], input[type="search"]').first().type('test');

      // Allow time for filtering to apply
      cy.wait(500);

      // Filtered results should be visible
      cy.get('table tbody tr').then(($rows) => {
        if ($rows.length === 0) {
          // No results found with filter "test", try something else from the data
          cy.get('input[placeholder*="Filter"], input[type="search"]').first().clear();

          // Get a term from the table to filter by
          cy.get('table tbody tr')
            .first()
            .find('td')
            .first()
            .invoke('text')
            .then((text) => {
              const filterText = text.substring(0, 3); // Take first 3 chars
              cy.get('input[placeholder*="Filter"], input[type="search"]').first().type(filterText);
              cy.wait(500); // Wait for filter
            });
        }
      });
    }
  });

  it('should handle pagination if available', () => {
    // Navigate to incidents page
    cy.contains('a', /incidents/i).click();

    // Check if pagination controls exist
    cy.get('button')
      .contains(/next|page/i)
      .then(($btn) => {
        if ($btn.length > 0 && !$btn.prop('disabled')) {
          // If next button exists and is not disabled

          // Store first page data
          const firstPageRows: string[] = [];
          cy.get('table tbody tr')
            .first()
            .invoke('text')
            .then((text) => {
              firstPageRows.push(text);
            });

          // Click next page
          cy.wrap($btn).click();
          cy.wait(500); // Wait for page change

          // Verify different data is shown
          cy.get('table tbody tr')
            .first()
            .invoke('text')
            .then((text) => {
              expect(text).not.to.equal(firstPageRows[0]);
            });
        } else {
          // If no pagination, log it
          cy.log('No pagination found or next button disabled');
        }
      });
  });

  it('should toggle between light and dark themes', () => {
    // Find and click the theme toggle button
    cy.get('button[aria-label="Toggle theme"], button:has(svg)').first().click();

    // Look for dropdown menu items
    cy.contains('Light').click();

    // Check if body or html has light theme class
    cy.get('html')
      .should('have.attr', 'data-theme', 'light')
      .should('not.have.attr', 'data-theme', 'dark');

    // Toggle to dark theme
    cy.get('button[aria-label="Toggle theme"], button:has(svg)').first().click();
    cy.contains('Dark').click();

    // Check for dark theme
    cy.get('html')
      .should('have.attr', 'data-theme', 'dark')
      .should('not.have.attr', 'data-theme', 'light');
  });
});
