'use client';

import { useCallback, useEffect, useOptimistic, useState, useTransition } from 'react';
import {
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
  type VisibilityState,
} from '@tanstack/react-table';

import {
  getIncidents,
  type IncidentsParams,
  type IncidentsResponse,
} from '@/app/actions/incidents';
import { Incident } from '@/lib/schemas/incident';

interface UseIncidentsOptions {
  initialData?: IncidentsResponse;
}

export function useIncidents({ initialData }: UseIncidentsOptions = {}) {
  const [isPending, startTransition] = useTransition();

  // Table state
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Data state
  const [data, setData] = useState<IncidentsResponse>(
    initialData || { data: [], pageCount: 0, totalCount: 0 },
  );

  // Optimistic state for immediate UI updates
  const [optimisticData, setOptimisticData] = useOptimistic(
    data,
    (state, action: { type: 'filter' | 'sort' | 'paginate' }) => {
      // Return an optimistic version of the state while waiting for the server
      // In a real app, you might do more sophisticated calculations here
      return { ...state, isLoading: true };
    },
  );

  // Fetch data function
  const fetchData = useCallback(async () => {
    const params: IncidentsParams = {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
    };

    // Start a transition to avoid blocking the UI
    startTransition(async () => {
      try {
        // Apply optimistic update
        setOptimisticData({ type: 'filter' });

        // Fetch real data
        const result = await getIncidents(params);
        setData(result);
      } catch (error) {
        console.error('Error fetching incidents:', error);
        // You could set an error state here
      }
    });
  }, [pagination, sorting, columnFilters, globalFilter, setOptimisticData]);

  // Fetch data when table state changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derived states
  const isLoading = isPending;
  const pageCount = data.pageCount;

  return {
    // Data
    data: optimisticData.data,
    pageCount,
    totalCount: data.totalCount,

    // State
    pagination,
    setPagination,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,

    // Loading state
    isLoading,

    // Actions
    refetch: fetchData,
  };
}
