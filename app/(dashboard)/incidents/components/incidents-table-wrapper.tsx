'use client';

import { useState } from 'react';
import { type IncidentsResponse } from '@/app/actions/incidents';
import { useIncidents } from '@/hooks/use-incidents';

import { DataTable } from './data-table';
import { columns } from './columns';

interface IncidentsTableWrapperProps {
  initialData: IncidentsResponse;
}

export function IncidentsTableWrapper({ initialData }: IncidentsTableWrapperProps) {
  // Use our custom hook with initial data from server
  const {
    data,
    pageCount,
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
    isLoading,
  } = useIncidents({ initialData });

  return (
    <DataTable
      data={data}
      columns={columns}
      pageCount={pageCount}
      // State
      pagination={pagination}
      setPagination={setPagination}
      sorting={sorting}
      setSorting={setSorting}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
      columnVisibility={columnVisibility}
      setColumnVisibility={setColumnVisibility}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      // Loading state
      isLoading={isLoading}
    />
  );
}
