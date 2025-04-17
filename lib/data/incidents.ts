import { Incident } from '../schemas/incident';

// Initial set of incident examples
export const sampleIncidents: Incident[] = [
  {
    id: 'INC-001',
    location: 'Warehouse A',
    type: 'Impact Detection',
    severity: 'Medium',
    status: 'Resolved',
    date: '2024-03-20',
  },
  {
    id: 'INC-002',
    location: 'Loading Bay 3',
    type: 'Barrier Breach',
    severity: 'High',
    status: 'In Progress',
    date: '2024-03-19',
  },
  {
    id: 'INC-003',
    location: 'Storage Area B',
    type: 'System Offline',
    severity: 'Low',
    status: 'Resolved',
    date: '2024-03-18',
  },
  {
    id: 'INC-004',
    location: 'Dispatch Zone',
    type: 'Impact Detection',
    severity: 'Medium',
    status: 'Pending',
    date: '2024-03-17',
  },
  {
    id: 'INC-005',
    location: 'Entrance Gate',
    type: 'Unauthorized Access',
    severity: 'High',
    status: 'Resolved',
    date: '2024-03-16',
  },
  {
    id: 'INC-006',
    location: 'Storage Area C',
    type: 'Fire Alarm',
    severity: 'Critical',
    status: 'In Progress',
    date: '2024-03-15',
  },
  {
    id: 'INC-007',
    location: 'Loading Dock 2',
    type: 'Equipment Failure',
    severity: 'Medium',
    status: 'Resolved',
    date: '2024-03-14',
  },
  {
    id: 'INC-008',
    location: 'Warehouse B',
    type: 'Impact Detection',
    severity: 'Low',
    status: 'Pending',
    date: '2024-03-13',
  },
  {
    id: 'INC-009',
    location: 'Main Office',
    type: 'System Offline',
    severity: 'High',
    status: 'Resolved',
    date: '2024-03-12',
  },
  {
    id: 'INC-010',
    location: 'Security Booth',
    type: 'Unauthorized Access',
    severity: 'Critical',
    status: 'Resolved',
    date: '2024-03-11',
  },
];

// Generate a large dataset of 1000+ incidents
const generateLargeDataset = (count: number = 1000): Incident[] => {
  const severities = ['Low', 'Medium', 'High', 'Critical'] as const;
  const statuses = ['Resolved', 'In Progress', 'Pending'] as const;
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
    'North Wing',
    'South Wing',
    'East Wing',
    'West Wing',
    'Parking Lot',
    'Admin Building',
    'Maintenance Room',
    'Server Room',
    'Control Center',
    'Meeting Room',
  ];

  const result: Incident[] = [...sampleIncidents]; // Include our sample incidents

  // Start from 11 to avoid ID conflicts with sample data
  for (let i = 11; i < count + 11; i++) {
    const id = `INC-${String(i).padStart(4, '0')}`;
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
};

// Export a large dataset of incidents
export const incidents = generateLargeDataset(1000);

// Useful for components that need a subset of incident data (like the dashboard table)
export const recentIncidents = incidents.slice(0, 5);
