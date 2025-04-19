import type { Metadata } from 'next';

import { LocationsTable } from '@/app/(dashboard)/locations/components/locations-table';

export const metadata: Metadata = {
  title: 'Locations',
  description: 'Manage and monitor facility locations (Technical Test Demo)',
  openGraph: {
    title: 'Locations Management | A-SAFE Demo',
    description: 'View and manage workplace locations (Technical Test Demo)',
  },
};

export default function LocationsPage() {
  return (
    <section className="space-y-6 p-6">
      <div>
        <LocationsTable />
      </div>
    </section>
  );
}
