'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

// Define the severity options
const severityOptions = [
  {
    label: 'Low',
    value: 'Low',
    color: 'bg-green-500',
  },
  {
    label: 'Medium',
    value: 'Medium',
    color: 'bg-yellow-500',
  },
  {
    label: 'High',
    value: 'High',
    color: 'bg-red-500',
  },
  {
    label: 'Critical',
    value: 'Critical',
    color: 'bg-purple-600',
  },
];

// Define the status options
const statusOptions = [
  {
    label: 'Resolved',
    value: 'Resolved',
    color: 'bg-green-500',
  },
  {
    label: 'In Progress',
    value: 'In Progress',
    color: 'bg-blue-500',
  },
  {
    label: 'Pending',
    value: 'Pending',
    color: 'bg-zinc-500',
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter = '',
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || globalFilter !== '';

  // Handle filter state based on props or table state
  const handleFilterChange = (value: string) => {
    if (setGlobalFilter) {
      setGlobalFilter(value);
    } else {
      table.setGlobalFilter(value);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter incidents..."
          value={globalFilter}
          onChange={(event) => handleFilterChange(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('severity') && (
          <DataTableFacetedFilter
            column={table.getColumn('severity')}
            title="Severity"
            options={severityOptions}
          />
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statusOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              handleFilterChange('');
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
