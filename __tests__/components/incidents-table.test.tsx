import { render, screen } from '@testing-library/react';
import React from 'react';

import { IncidentsTable } from '@/components/incidents-table';

jest.mock('@/app/actions/incidents', () => ({
  getIncidents: jest.fn(),
  getIncidentFilterOptions: jest.fn(),
}));

describe('IncidentsTable', () => {
  it('renders the incidents table with column headers', () => {
    render(<IncidentsTable />);

    expect(screen.getByText(/id/i)).toBeInTheDocument();
    expect(screen.getByText(/location/i)).toBeInTheDocument();
    expect(screen.getByText(/type/i)).toBeInTheDocument();
    expect(screen.getByText(/severity/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/date/i)).toBeInTheDocument();
  });
});
