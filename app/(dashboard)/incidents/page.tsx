import { Download, Filter, Plus } from 'lucide-react';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { getIncidents } from '@/app/actions/incidents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { IncidentsTableWrapper } from './components/incidents-table-wrapper';
import { LocationChart } from './components/location-incidents-chart';
import { RecentActivityTimeline } from './components/recent-activity-timeline';
import { SeverityChart } from './components/severity-distribution-chart';
import { StatBadge } from './components/stat-badge';

export async function generateMetadata(): Promise<Metadata> {
  const initialData = await getIncidents({
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [],
    columnFilters: [],
    globalFilter: '',
  });

  const openIncidents = initialData.data.filter((i) => i.status !== 'Resolved').length;
  const criticalIncidents = initialData.data.filter((i) => i.severity === 'Critical').length;

  return {
    title: `Incidents (${initialData.totalCount})`,
    description: `Technical Demo: Track and manage safety incidents. Currently ${openIncidents} open incidents.`,
    openGraph: {
      title: 'Safety Incidents Management | A-SAFE Demo',
      description: `Technical Demo: Track ${initialData.totalCount} incidents with ${criticalIncidents} critical issues (Technical Test Project)`,
    },
  };
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <div className="rounded-md border">
        <div className="h-16 border-b bg-muted/10 px-4" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 border-b p-4">
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[70px]" />
      </div>
    </div>
  );
}

function ChartsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-[350px] w-full rounded-xl" />
      ))}
    </div>
  );
}

export default async function IncidentsPage() {
  const initialData = await getIncidents({
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [],
    columnFilters: [],
    globalFilter: '',
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Incidents</h1>
          <p className="text-muted-foreground">
            Manage and track all safety incidents across locations
          </p>
        </div>

        <div className="flex gap-4">
          <StatBadge label="Total" value={`${initialData.totalCount}`} />
          <StatBadge
            label="Open"
            value={`${initialData.data.filter((i) => i.status !== 'Resolved').length}`}
            variant="warning"
          />
          <StatBadge
            label="Critical"
            value={`${initialData.data.filter((i) => i.severity === 'Critical').length}`}
            variant="danger"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 gap-2">
          <Input placeholder="Search incidents..." className="max-w-md" />
          <Button variant="outline" size="icon">
            <Filter className="size-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Download className="size-4" />
            <span className="sr-only">Export</span>
          </Button>
          <Button>
            <Plus className="mr-2 size-4" />
            New Incident
          </Button>
        </div>
      </div>

      <Tabs defaultValue="table" className="w-full">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="space-y-4">
          <Suspense fallback={<TableSkeleton />}>
            <IncidentsTableWrapper initialData={initialData} />
          </Suspense>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Suspense fallback={<ChartsSkeleton />}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <SeverityChart />
              <LocationChart />
              <RecentActivityTimeline />
            </div>
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
