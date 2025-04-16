import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { recentIncidents } from '@/lib/data/incidents';
import { Severity, Status } from '@/lib/schemas/incident';

export function IncidentsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentIncidents.map((incident) => (
          <TableRow key={incident.id}>
            <TableCell className="font-medium">{incident.id}</TableCell>
            <TableCell>{incident.location}</TableCell>
            <TableCell>{incident.type}</TableCell>
            <TableCell>
              <SeverityBadge severity={incident.severity} />
            </TableCell>
            <TableCell>
              <StatusBadge status={incident.status} />
            </TableCell>
            <TableCell className="text-right">
              {formatDate(incident.date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  const colorMap: Record<Severity, string> = {
    Low: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
    High: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    Critical: 'bg-purple-600/10 text-purple-600 hover:bg-purple-600/20',
  };

  return (
    <Badge variant="outline" className={colorMap[severity]}>
      {severity}
    </Badge>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const colorMap: Record<Status, string> = {
    'Resolved': 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
    'In Progress': 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
    'Pending': 'bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/20',
  };

  return (
    <Badge variant="outline" className={colorMap[status]}>
      {status}
    </Badge>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
