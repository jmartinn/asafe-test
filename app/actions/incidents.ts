'use server';

import { type ColumnFiltersState, type SortingState } from '@tanstack/react-table';

import { incidents } from '@/lib/data/incidents';
import { Incident, type Severity, type Status } from '@/lib/schemas/incident';

// Function to simulate network delay for demo purposes
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type IncidentsParams = {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
};

export type IncidentsResponse = {
  data: Incident[];
  pageCount: number;
  totalCount: number;
};

export async function getIncidents({
  pagination,
  sorting,
  columnFilters,
  globalFilter,
}: IncidentsParams): Promise<IncidentsResponse> {
  // Simulate network delay
  await delay(Math.random() * 1000 + 500);

  // Start with all incidents
  let filteredData = [...incidents];

  // Apply column filters
  if (columnFilters.length > 0) {
    filteredData = filteredData.filter((incident) => {
      return columnFilters.every((filter) => {
        const { id, value } = filter;

        // Handle different filter types
        if (id === 'severity' && value) {
          return (value as string[]).includes(incident.severity);
        }

        if (id === 'status' && value) {
          return (value as string[]).includes(incident.status);
        }

        if (id === 'type' && value) {
          return (value as string[]).includes(incident.type);
        }

        if (typeof value === 'string') {
          const itemValue = String(incident[id as keyof Incident] || '');
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }

        return true;
      });
    });
  }

  // Apply global filter
  if (globalFilter) {
    const searchLower = globalFilter.toLowerCase();
    filteredData = filteredData.filter((incident) => {
      return (
        incident.id.toLowerCase().includes(searchLower) ||
        incident.location.toLowerCase().includes(searchLower) ||
        incident.type.toLowerCase().includes(searchLower) ||
        incident.severity.toLowerCase().includes(searchLower) ||
        incident.status.toLowerCase().includes(searchLower) ||
        incident.date.toLowerCase().includes(searchLower)
      );
    });
  }

  // Calculate total before pagination
  const totalCount = filteredData.length;

  // Apply sorting
  if (sorting.length > 0) {
    const { id, desc } = sorting[0];

    filteredData = [...filteredData].sort((a, b) => {
      const aValue = a[id as keyof Incident];
      const bValue = b[id as keyof Incident];

      if (aValue === bValue) return 0;

      // Handle date sorting separately
      if (id === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return desc ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      }

      const result = aValue < bValue ? -1 : 1;
      return desc ? -result : result;
    });
  }

  // Apply pagination
  const { pageIndex, pageSize } = pagination;
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredData.length / pageSize);

  return {
    data: paginatedData,
    pageCount,
    totalCount,
  };
}

// For generating filter options
export async function getIncidentFilterOptions() {
  await delay(300); // Small delay for realism

  const severities = Array.from(new Set(incidents.map((incident) => incident.severity)));
  const statuses = Array.from(new Set(incidents.map((incident) => incident.status)));
  const types = Array.from(new Set(incidents.map((incident) => incident.type)));

  return {
    severities,
    statuses,
    types,
  };
}

// Function to generate a large dataset (1000+ records)
export async function generateLargeDataset(count: number = 1000): Promise<Incident[]> {
  const severities: Severity[] = ['Low', 'Medium', 'High', 'Critical'];
  const statuses: Status[] = ['Resolved', 'In Progress', 'Pending'];
  const types = [
    'Impact Detection',
    'Barrier Breach',
    'System Offline',
    'Unauthorized Access',
    'Fire Alarm',
    'Equipment Failure',
  ] as const;
  const locations = [
    'Warehouse A',
    'Loading Bay 3',
    'Storage Area B',
    'Dispatch Zone',
    'Main Office',
    'Security Booth',
    'Loading Dock 2',
    'Warehouse B',
    'Storage Area C',
    'Entrance Gate',
  ];

  const result: Incident[] = [];

  for (let i = 0; i < count; i++) {
    const id = `INC-${String(i + 1).padStart(4, '0')}`;
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    // Generate a random date within the last year
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    const dateString = date.toISOString().split('T')[0];

    result.push({
      id,
      severity,
      status,
      type,
      location,
      date: dateString,
    });
  }

  return result;
}
