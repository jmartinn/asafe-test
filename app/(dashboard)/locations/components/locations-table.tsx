'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const locations = [
  {
    id: 'LOC-001',
    name: 'Warehouse A',
    address: '123 Industrial Park, Manchester',
    type: 'Warehouse',
    status: 'Active',
    devices: 24,
  },
  {
    id: 'LOC-002',
    name: 'Distribution Center B',
    address: '456 Logistics Way, Birmingham',
    type: 'Distribution',
    status: 'Active',
    devices: 36,
  },
  {
    id: 'LOC-003',
    name: 'Storage Facility C',
    address: '789 Storage Road, Leeds',
    type: 'Storage',
    status: 'Maintenance',
    devices: 18,
  },
  {
    id: 'LOC-004',
    name: 'Loading Bay D',
    address: '321 Shipping Lane, Liverpool',
    type: 'Loading',
    status: 'Active',
    devices: 12,
  },
];

export function LocationsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Devices</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations.map((location) => (
          <TableRow key={location.id}>
            <TableCell className="font-medium">{location.id}</TableCell>
            <TableCell>{location.name}</TableCell>
            <TableCell>{location.address}</TableCell>
            <TableCell>{location.type}</TableCell>
            <TableCell>
              <Badge
                variant={location.status === 'Active' ? 'default' : 'secondary'}
              >
                {location.status}
              </Badge>
            </TableCell>
            <TableCell>{location.devices}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
