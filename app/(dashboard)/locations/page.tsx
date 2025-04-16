import { LocationsTable } from '@/app/(dashboard)/locations/components/locations-table';

export default function LocationsPage() {
  return (
    <section className="space-y-6 p-6">
      <div>
        <LocationsTable />
      </div>
    </section>
  );
}
