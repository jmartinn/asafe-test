'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Incident } from '@/lib/schemas/incident';

import { DataTableColumnHeader } from './data-table-column-header';

export const columns: ColumnDef<Incident>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
    cell: ({ row }) => <div>{row.getValue('location')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => <div>{row.getValue('type')}</div>,
    filterFn: 'arrIncludesSome',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'severity',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Severity" />,
    cell: ({ row }) => {
      const severity = row.getValue('severity') as string;

      const colorMap: Record<string, string> = {
        Low: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
        Medium: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
        High: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
        Critical: 'bg-purple-600/10 text-purple-600 hover:bg-purple-600/20',
      };

      return (
        <Badge variant="outline" className={colorMap[severity] || ''}>
          {severity}
        </Badge>
      );
    },
    filterFn: 'arrIncludesSome',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;

      const colorMap: Record<string, string> = {
        'Resolved': 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
        'In Progress': 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
        'Pending': 'bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/20',
      };

      return (
        <Badge variant="outline" className={colorMap[status] || ''}>
          {status}
        </Badge>
      );
    },
    filterFn: 'arrIncludesSome',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return (
        <div>
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const incident = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(incident.id)}>
              Copy incident ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Update status</DropdownMenuItem>
            <DropdownMenuItem>Assign to team</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
