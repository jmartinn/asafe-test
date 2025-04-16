import { incidents } from './incidents';

// Calculate severity distribution from incidents data
export const severityChartData = [
  {
    severity: 'Low',
    incidents: incidents.filter((i) => i.severity === 'Low').length,
    fill: 'var(--color-low)',
  },
  {
    severity: 'Medium',
    incidents: incidents.filter((i) => i.severity === 'Medium').length,
    fill: 'var(--color-medium)',
  },
  {
    severity: 'High',
    incidents: incidents.filter((i) => i.severity === 'High').length,
    fill: 'var(--color-high)',
  },
  {
    severity: 'Critical',
    incidents: incidents.filter((i) => i.severity === 'Critical').length,
    fill: 'var(--color-critical)',
  },
];

// Group incidents by location for location chart
const locationCounts = incidents.reduce(
  (acc, incident) => {
    const locationKey = incident.location.includes(' ')
      ? incident.location.split(' ')[0] // Take just the first part of location
      : incident.location;

    acc[locationKey] = (acc[locationKey] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);

// Convert to chart format and sort by incident count (descending)
export const locationChartData = Object.entries(locationCounts)
  .map(([location, incidents]) => ({ location, incidents }))
  .sort((a, b) => b.incidents - a.incidents)
  .slice(0, 5); // Take top 5 locations

// Monthly trend data for incidents
export const monthlyIncidentData = [
  { month: 'Jan', incidents: 25 },
  { month: 'Feb', incidents: 30 },
  { month: 'Mar', incidents: 35 },
  { month: 'Apr', incidents: 30 },
  { month: 'May', incidents: 25 },
  { month: 'Jun', incidents: 30 },
  { month: 'Jul', incidents: 40 },
  { month: 'Aug', incidents: 55 },
  { month: 'Sep', incidents: 50 },
  { month: 'Oct', incidents: 45 },
  { month: 'Nov', incidents: 50 },
  { month: 'Dec', incidents: 45 },
];

// Chart config for severity distribution
export const severityChartConfig = {
  incidents: {
    label: 'Incidents',
  },
  low: {
    label: 'Low',
    color: 'hsl(var(--chart-1))',
  },
  medium: {
    label: 'Medium',
    color: 'hsl(var(--chart-2))',
  },
  high: {
    label: 'High',
    color: 'hsl(var(--chart-3))',
  },
  critical: {
    label: 'Critical',
    color: 'hsl(var(--chart-4))',
  },
};

// Chart config for location chart
export const locationChartConfig = {
  incidents: {
    label: 'Incidents',
    color: 'hsl(var(--chart-1))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
};

// Chart config for monthly incident chart
export const monthlyChartConfig = {
  incidents: {
    label: 'Incidents',
    color: 'hsl(var(--chart-1))',
  },
};
