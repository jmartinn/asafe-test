'use client';

import { type IncidentsResponse } from '@/app/actions/incidents';
import { useIncidents } from '@/hooks/use-incidents';

import { columns } from './columns';
import { DataTable } from './data-table';

interface IncidentsTableWrapperProps {
  initialData: IncidentsResponse;
}

export function IncidentsTableWrapper({ initialData }: IncidentsTableWrapperProps) {
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
      isLoading={isLoading}
    />
  );
}
