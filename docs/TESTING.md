# Testing Documentation

This document outlines the testing strategy for the A-Safe Digital Safety Dashboard application.

## Testing Stack

- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **Lighthouse**: Performance testing

## Unit Testing

### Example: Testing the Incident Schema

```typescript
// __tests__/schemas/incident.test.ts
import { incidentSchema } from '@/lib/schemas/incident';

describe('Incident Schema', () => {
  it('validates a valid incident', () => {
    const validIncident = {
      id: 'INC-001',
      location: 'Warehouse A',
      type: 'Impact Detection',
      severity: 'Medium',
      status: 'Resolved',
      date: '2024-03-20',
    };
    
    const result = incidentSchema.safeParse(validIncident);
    expect(result.success).toBe(true);
  });
  
  it('rejects an incident with invalid severity', () => {
    const invalidIncident = {
      id: 'INC-001',
      location: 'Warehouse A',
      type: 'Impact Detection',
      severity: 'Unknown', // Invalid
      status: 'Resolved',
      date: '2024-03-20',
    };
    
    const result = incidentSchema.safeParse(invalidIncident);
    expect(result.success).toBe(false);
  });
  
  it('rejects an incident with missing fields', () => {
    const incompleteIncident = {
      id: 'INC-001',
      location: 'Warehouse A',
      // Missing type, severity, status
      date: '2024-03-20',
    };
    
    const result = incidentSchema.safeParse(incompleteIncident);
    expect(result.success).toBe(false);
  });
});
```

### Example: Testing Custom Hooks

```typescript
// __tests__/hooks/use-incidents.test.ts
import { renderHook, act } from '@testing-library/react';
import { useIncidents } from '@/hooks/use-incidents';

// Mock the server action
jest.mock('@/app/actions/incidents', () => ({
  getIncidents: jest.fn().mockResolvedValue({
    data: [{ id: 'test-id', /* other fields */ }],
    pageCount: 1,
    totalCount: 1,
  }),
}));

describe('useIncidents', () => {
  it('initializes with provided data', () => {
    const initialData = {
      data: [{ id: 'initial', /* other fields */ }],
      pageCount: 1,
      totalCount: 1,
    };
    
    const { result } = renderHook(() => useIncidents({ initialData }));
    
    expect(result.current.data).toEqual(initialData.data);
    expect(result.current.pageCount).toBe(1);
    expect(result.current.totalCount).toBe(1);
  });
  
  it('updates pagination state', () => {
    const { result } = renderHook(() => useIncidents());
    
    act(() => {
      result.current.setPagination({ pageIndex: 1, pageSize: 20 });
    });
    
    expect(result.current.pagination.pageIndex).toBe(1);
    expect(result.current.pagination.pageSize).toBe(20);
  });
  
  it('applies filters and fetches data', async () => {
    const { result } = renderHook(() => useIncidents());
    
    act(() => {
      result.current.setGlobalFilter('test-filter');
    });
    
    // Wait for data fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.isLoading).toBe(false);
    // Verify data was fetched with correct parameters
  });
});
```

## Component Testing

### Example: Testing the DataTable

```typescript
// __tests__/components/data-table.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from '@/app/(dashboard)/incidents/components/data-table';

describe('DataTable', () => {
  const mockColumns = [
    { id: 'id', accessorKey: 'id', header: 'ID' },
    { id: 'status', accessorKey: 'status', header: 'Status' },
  ];
  
  const mockData = [
    { id: 'INC-001', status: 'Resolved' },
    { id: 'INC-002', status: 'Pending' },
  ];
  
  it('renders with data', () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    
    expect(screen.getByText('INC-001')).toBeInTheDocument();
    expect(screen.getByText('INC-002')).toBeInTheDocument();
    expect(screen.getByText('Resolved')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
  
  it('shows loading state', () => {
    render(<DataTable columns={mockColumns} data={[]} isLoading={true} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  it('shows empty state when no data', () => {
    render(<DataTable columns={mockColumns} data={[]} />);
    
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });
  
  it('handles pagination', () => {
    const mockSetPagination = jest.fn();
    
    render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        pagination={{ pageIndex: 0, pageSize: 10 }}
        setPagination={mockSetPagination}
      />
    );
    
    fireEvent.click(screen.getByText('Next'));
    
    expect(mockSetPagination).toHaveBeenCalledWith(expect.objectContaining({
      pageIndex: 1,
    }));
  });
});
```

### Example: Testing the Login Form

```typescript
// __tests__/components/login-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/app/(auth)/login/components/login-form';
import { signIn } from 'next-auth/react';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    (signIn as jest.Mock).mockClear();
  });
  
  it('renders login form', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
  
  it('shows validation errors for invalid email', async () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
    });
    
    expect(signIn).not.toHaveBeenCalled();
  });
  
  it('submits the form with valid credentials', async () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'user@example.com',
        password: 'password123',
      });
    });
  });
  
  it('toggles password visibility', () => {
    render(<LoginForm />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(screen.getByRole('button', { name: /show password/i }));
    
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
```

## End-to-End Testing

### Example: Cypress Test for Authentication

```typescript
// cypress/e2e/auth.cy.ts
describe('Authentication', () => {
  it('redirects unauthenticated user to login', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });
  
  it('shows error with invalid credentials', () => {
    cy.visit('/login');
    
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    // Check for error message
    cy.contains('Invalid credentials').should('be.visible');
    cy.url().should('include', '/login');
  });
  
  it('logs in successfully with valid credentials', () => {
    cy.visit('/login');
    
    cy.get('input[name="email"]').type('user@asafe.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Check redirect to dashboard
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // Check for dashboard content
    cy.contains('Overview').should('be.visible');
  });
  
  it('logs out successfully', () => {
    // Log in first
    cy.login('user@asafe.com', 'password123');
    
    // Find and click logout button
    cy.get('button').contains('Sign out').click();
    
    // Check redirect to login
    cy.url().should('include', '/login');
  });
});
```

### Example: Cypress Test for Incidents Table

```typescript
// cypress/e2e/incidents-table.cy.ts
describe('Incidents Table', () => {
  beforeEach(() => {
    // Log in before each test
    cy.login('user@asafe.com', 'password123');
    cy.visit('/incidents');
  });
  
  it('displays incidents table', () => {
    cy.get('table').should('be.visible');
    cy.get('table tbody tr').should('have.length.at.least', 1);
  });
  
  it('filters incidents by search', () => {
    // Get initial count
    cy.get('table tbody tr').then($rows => {
      const initialCount = $rows.length;
      
      // Enter search term
      cy.get('input[placeholder*="Filter"]').type('Warehouse');
      
      // Check filtered results
      cy.get('table tbody tr').should($filteredRows => {
        expect($filteredRows.length).to.be.lessThan(initialCount);
      });
      
      // Check that all visible rows contain the search term
      cy.get('table tbody tr').each($row => {
        cy.wrap($row).should('contain.text', 'Warehouse');
      });
    });
  });
  
  it('sorts incidents by column', () => {
    // Click on ID column to sort
    cy.get('th').contains('ID').click();
    
    // Get the sorted order
    const sortedIds: string[] = [];
    cy.get('table tbody tr td:first-child').each($cell => {
      sortedIds.push($cell.text());
    }).then(() => {
      // Check that IDs are in ascending order
      const sortedIdsCopy = [...sortedIds].sort();
      expect(sortedIds).to.deep.equal(sortedIdsCopy);
    });
    
    // Click again to reverse sort
    cy.get('th').contains('ID').click();
    
    // Get the reverse sorted order
    const reverseSortedIds: string[] = [];
    cy.get('table tbody tr td:first-child').each($cell => {
      reverseSortedIds.push($cell.text());
    }).then(() => {
      // Check that IDs are in descending order
      const reverseSortedIdsCopy = [...reverseSortedIds].sort().reverse();
      expect(reverseSortedIds).to.deep.equal(reverseSortedIdsCopy);
    });
  });
  
  it('paginates through results', () => {
    // Get IDs from first page
    const firstPageIds: string[] = [];
    cy.get('table tbody tr td:first-child').each($cell => {
      firstPageIds.push($cell.text());
    });
    
    // Go to next page
    cy.get('button').contains('Next').click();
    
    // Get IDs from second page
    const secondPageIds: string[] = [];
    cy.get('table tbody tr td:first-child').each($cell => {
      secondPageIds.push($cell.text());
    }).then(() => {
      // Ensure no overlap between pages
      secondPageIds.forEach(id => {
        expect(firstPageIds).not.to.include(id);
      });
    });
    
    // Go back to first page
    cy.get('button').contains('Previous').click();
    
    // Confirm we're back to the first page
    cy.get('table tbody tr td:first-child').each(($cell, index) => {
      expect($cell.text()).to.equal(firstPageIds[index]);
    });
  });
});
```

## Performance Testing

### Example: Lighthouse Test Script

```typescript
// scripts/lighthouse.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'html',
    port: chrome.port,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  };
  
  const urls = [
    'http://localhost:3000/login',
    'http://localhost:3000/',
    'http://localhost:3000/incidents',
  ];
  
  const results = {};
  
  for (const url of urls) {
    console.log(`Testing ${url}...`);
    const runnerResult = await lighthouse(url, options);
    
    const reportPath = path.join('lighthouse-reports', `${url.replace(/[^a-z0-9]/gi, '_')}.html`);
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, runnerResult.report);
    
    const scores = Object.entries(runnerResult.lhr.categories).reduce((acc, [key, value]) => {
      acc[key] = value.score * 100;
      return acc;
    }, {});
    
    results[url] = scores;
    console.log(`Report saved to ${reportPath}`);
  }
  
  console.log('\nSummary:');
  console.table(results);
  
  await chrome.kill();
}

runLighthouse().catch(console.error);
```

## Test Coverage Goals

- **Unit Tests**: 80%+ coverage of utility functions and hooks
- **Component Tests**: 70%+ coverage of UI components
- **E2E Tests**: Cover all critical user flows
- **Performance Tests**: Score 90+ on Lighthouse for all key pages

## Running Tests

```bash
# Run unit and component tests
npm test

# Run a specific test file
npm test -- login-form.test.tsx

# Generate coverage report
npm test -- --coverage

# Run E2E tests
npm run cypress:run

# Run performance tests
npm run lighthouse
``` 