import { act, renderHook, waitFor } from '@testing-library/react';

import * as incidentActions from '@/app/actions/incidents';
import { useIncidents } from '@/hooks/use-incidents';

jest.mock('@/app/actions/incidents', () => ({
  getIncidents: jest.fn(),
}));

describe('useIncidents hook', () => {
  const mockIncidentsResponse = {
    data: [
      {
        id: 'INC-0001',
        severity: 'High',
        status: 'In Progress',
        type: 'Impact Detection',
        location: 'Warehouse A',
        date: '2023-06-15',
      },
    ],
    pageCount: 1,
    totalCount: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (incidentActions.getIncidents as jest.Mock).mockResolvedValue(mockIncidentsResponse);
  });

  it('should initialize with default values', async () => {
    const { result } = renderHook(() => useIncidents());

    expect(result.current.data).toEqual([]);
    expect(result.current.pagination).toEqual({ pageIndex: 0, pageSize: 10 });
    expect(result.current.sorting).toEqual([]);
    expect(result.current.columnFilters).toEqual([]);
    expect(result.current.globalFilter).toBe('');

    await waitFor(() => {
      expect(incidentActions.getIncidents).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockIncidentsResponse.data);
    });
  });

  it('should initialize with provided initial data', () => {
    const { result } = renderHook(() => useIncidents({ initialData: mockIncidentsResponse }));

    expect(result.current.data).toEqual(mockIncidentsResponse.data);
    expect(result.current.totalCount).toBe(mockIncidentsResponse.totalCount);
  });

  it('should update pagination and refetch data', async () => {
    const { result } = renderHook(() => useIncidents());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockIncidentsResponse.data);
    });

    act(() => {
      result.current.setPagination({ pageIndex: 1, pageSize: 10 });
    });

    await waitFor(() => {
      expect(incidentActions.getIncidents).toHaveBeenCalledWith(
        expect.objectContaining({
          pagination: { pageIndex: 1, pageSize: 10 },
        }),
      );
    });
  });

  it('should update filters and refetch data', async () => {
    const { result } = renderHook(() => useIncidents());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockIncidentsResponse.data);
    });

    act(() => {
      result.current.setColumnFilters([{ id: 'severity', value: ['High'] }]);
    });

    await waitFor(() => {
      expect(incidentActions.getIncidents).toHaveBeenCalledWith(
        expect.objectContaining({
          columnFilters: [{ id: 'severity', value: ['High'] }],
        }),
      );
    });
  });

  it('should update sorting and refetch data', async () => {
    const { result } = renderHook(() => useIncidents());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockIncidentsResponse.data);
    });

    act(() => {
      result.current.setSorting([{ id: 'date', desc: true }]);
    });

    await waitFor(() => {
      expect(incidentActions.getIncidents).toHaveBeenCalledWith(
        expect.objectContaining({
          sorting: [{ id: 'date', desc: true }],
        }),
      );
    });
  });
});
