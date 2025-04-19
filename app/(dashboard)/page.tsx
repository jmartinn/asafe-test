import { MapPin, Siren, TriangleAlert } from 'lucide-react';
import type { Metadata } from 'next';

import { IncidentChart } from '@/components/incident-chart';
import { IncidentsTable } from '@/components/incidents-table';
import { MetricCard } from '@/components/metric-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <section className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Alerts"
          value="12"
          trend="+2 since last hour"
          trendUp={true}
          actionIcon={<Siren className="size-4" />}
        />
        <MetricCard
          title="Systems Online"
          value="98.2%"
          trend="+0.5% from last week"
          trendUp={true}
          statusIcon
        />
        <MetricCard
          title="Total Incidents"
          value="573"
          trend="-2% from last month"
          trendUp={false}
          actionIcon={<TriangleAlert className="size-4" />}
        />
        <MetricCard
          title="Active Locations"
          value="24"
          description="All systems operational"
          actionIcon={<MapPin className="size-4" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <IncidentChart />
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <IncidentsTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Overview of safety management data and key metrics (Technical Test Demo)',
};
