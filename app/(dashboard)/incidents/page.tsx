import { Download, Filter, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { incidents } from '@/lib/data/incidents';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { LocationChart } from './components/location-incidents-chart';
import { RecentActivityTimeline } from './components/recent-activity-timeline';
import { SeverityChart } from './components/severity-distribution-chart';
import { StatBadge } from './components/stat-badge';

export default function IncidentsPage() {
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
          <StatBadge label="Total" value="573" />
          <StatBadge label="Open" value="24" variant="warning" />
          <StatBadge label="Critical" value="2" variant="danger" />
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
          {/* Data Table */}
          <DataTable columns={columns} data={incidents} />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <SeverityChart />
            <LocationChart />
            <RecentActivityTimeline />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
