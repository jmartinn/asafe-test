'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;

  pagination?: PaginationState;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
  sorting?: SortingState;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  columnVisibility?: VisibilityState;
  setColumnVisibility?: React.Dispatch<React.SetStateAction<VisibilityState>>;
  rowSelection?: Record<string, boolean>;
  setRowSelection?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;

  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount = 0,

  pagination,
  setPagination,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  globalFilter,
  setGlobalFilter,
  columnVisibility,
  setColumnVisibility,
  rowSelection,
  setRowSelection,

  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [internalRowSelection, setInternalRowSelection] = React.useState({});
  const [internalColumnVisibility, setInternalColumnVisibility] = React.useState<VisibilityState>(
    {},
  );
  const [internalColumnFilters, setInternalColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [internalGlobalFilter, setInternalGlobalFilter] = React.useState<string>('');
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    manualPagination: !!pageCount,
    manualSorting: !!pageCount,
    manualFiltering: !!pageCount,
    pageCount: pageCount,

    state: {
      sorting: sorting || internalSorting,
      columnVisibility: columnVisibility || internalColumnVisibility,
      rowSelection: rowSelection || internalRowSelection,
      columnFilters: columnFilters || internalColumnFilters,
      globalFilter: globalFilter || internalGlobalFilter,
      pagination: pagination || internalPagination,
    },

    enableRowSelection: true,
    onRowSelectionChange: setRowSelection || setInternalRowSelection,
    onSortingChange: setSorting || setInternalSorting,
    onColumnFiltersChange: setColumnFilters || setInternalColumnFilters,
    onGlobalFilterChange: setGlobalFilter || setInternalGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility || setInternalColumnVisibility,
    onPaginationChange: setPagination || setInternalPagination,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter || internalGlobalFilter}
        setGlobalFilter={setGlobalFilter || setInternalGlobalFilter}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <div className="size-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span className="ml-2">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : !isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
