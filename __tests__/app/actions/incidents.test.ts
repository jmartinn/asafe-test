import { getIncidentFilterOptions, getIncidents } from '@/app/actions/incidents';

jest.mock('@/lib/data/incidents', () => ({
  incidents: [
    {
      id: 'INC-0001',
      severity: 'High',
      status: 'In Progress',
      type: 'Impact Detection',
      location: 'Warehouse A',
      date: '2023-06-15',
    },
    {
      id: 'INC-0002',
      severity: 'Low',
      status: 'Resolved',
      type: 'System Offline',
      location: 'Loading Bay 3',
      date: '2023-07-20',
    },
    {
      id: 'INC-0003',
      severity: 'Medium',
      status: 'Pending',
      type: 'Fire Alarm',
      location: 'Storage Area B',
      date: '2023-05-10',
    },
  ],
}));

jest.mock('next/server', () => ({
  unstable_after: jest.fn(),
}));

describe('Incident Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset timers
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getIncidents', () => {
    it('should return paginated incidents', async () => {
      const params = {
        pagination: { pageIndex: 0, pageSize: 2 },
        sorting: [],
        columnFilters: [],
        globalFilter: '',
      };

      const promise = getIncidents(params);
      jest.runAllTimers(); // Skip the delay
      const result = await promise;

      expect(result.data.length).toBe(2);
      expect(result.pageCount).toBe(2);
      expect(result.totalCount).toBe(3);
      expect(result.data[0].id).toBe('INC-0001');
      expect(result.data[1].id).toBe('INC-0002');
    });

    it('should apply filters', async () => {
      const params = {
        pagination: { pageIndex: 0, pageSize: 10 },
        sorting: [],
        columnFilters: [{ id: 'severity', value: ['High'] }],
        globalFilter: '',
      };

      const promise = getIncidents(params);
      jest.runAllTimers();
      const result = await promise;

      expect(result.data.length).toBe(1);
      expect(result.data[0].severity).toBe('High');
      expect(result.totalCount).toBe(1);
    });

    it('should apply global search', async () => {
      const params = {
        pagination: { pageIndex: 0, pageSize: 10 },
        sorting: [],
        columnFilters: [],
        globalFilter: 'warehouse',
      };

      const promise = getIncidents(params);
      jest.runAllTimers();
      const result = await promise;

      expect(result.data.length).toBe(1);
      expect(result.data[0].location).toBe('Warehouse A');
      expect(result.totalCount).toBe(1);
    });

    it('should apply sorting', async () => {
      const params = {
        pagination: { pageIndex: 0, pageSize: 10 },
        sorting: [{ id: 'date', desc: true }],
        columnFilters: [],
        globalFilter: '',
      };

      const promise = getIncidents(params);
      jest.runAllTimers();
      const result = await promise;

      expect(result.data.length).toBe(3);
      expect(result.data[0].date).toBe('2023-07-20'); // Most recent date first
      expect(result.data[2].date).toBe('2023-05-10'); // Oldest date last
    });
  });

  describe('getIncidentFilterOptions', () => {
    it('should return unique filter options from all incidents', async () => {
      const promise = getIncidentFilterOptions();
      jest.runAllTimers();
      const result = await promise;

      expect(result.severities).toContain('High');
      expect(result.severities).toContain('Low');
      expect(result.severities).toContain('Medium');

      expect(result.statuses).toContain('In Progress');
      expect(result.statuses).toContain('Resolved');
      expect(result.statuses).toContain('Pending');

      expect(result.types).toContain('Impact Detection');
      expect(result.types).toContain('System Offline');
      expect(result.types).toContain('Fire Alarm');
    });
  });
});
