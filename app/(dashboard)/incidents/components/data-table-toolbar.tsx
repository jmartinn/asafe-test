'use client';

import type { Table } from '@tanstack/react-table';
import { X as CrossIcon } from 'lucide-react';
import { AlertTriangle, Flame, Shield, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter incidents by id..."
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('type') && (
          <DataTableFacetedFilter
            column={table.getColumn('type')}
            title="Type"
            options={[
              {
                label: 'Impact Detection',
                value: 'Impact Detection',
                icon: AlertTriangle,
              },
              {
                label: 'Barrier Breach',
                value: 'Barrier Breach',
                icon: Shield,
              },
              {
                label: 'System Offline',
                value: 'System Offline',
                icon: Zap,
              },
              {
                label: 'Unauthorized Access',
                value: 'Unauthorized Access',
                icon: Shield,
              },
              {
                label: 'Fire Alarm',
                value: 'Fire Alarm',
                icon: Flame,
              },
              {
                label: 'Equipment Failure',
                value: 'Equipment Failure',
                icon: AlertTriangle,
              },
            ]}
          />
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={[
              {
                label: 'Resolved',
                value: 'Resolved',
              },
              {
                label: 'In Progress',
                value: 'In Progress',
              },
              {
                label: 'Pending',
                value: 'Pending',
              },
            ]}
          />
        )}
        {table.getColumn('severity') && (
          <DataTableFacetedFilter
            column={table.getColumn('severity')}
            title="Severity"
            options={[
              {
                label: 'Low',
                value: 'Low',
              },
              {
                label: 'Medium',
                value: 'Medium',
              },
              {
                label: 'High',
                value: 'High',
              },
              {
                label: 'Critical',
                value: 'Critical',
              },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <CrossIcon className="ml-2 size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
