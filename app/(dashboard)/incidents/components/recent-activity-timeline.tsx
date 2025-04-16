import {
  Calendar,
  CheckCircle,
  Clock,
  MessageSquare,
  RefreshCw,
  UserPlus,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Activity = {
  id: string;
  type: 'created' | 'resolved' | 'updated' | 'assigned' | 'commented';
  incident: string;
  user: string;
  time: string;
};

const activities: Activity[] = [
  {
    id: 'act-1',
    type: 'created',
    incident: 'INC-011',
    user: 'John Doe',
    time: '2 hours ago',
  },
  {
    id: 'act-2',
    type: 'resolved',
    incident: 'INC-008',
    user: 'Sarah Smith',
    time: '4 hours ago',
  },
  {
    id: 'act-3',
    type: 'updated',
    incident: 'INC-005',
    user: 'Mike Johnson',
    time: 'Yesterday',
  },
  {
    id: 'act-4',
    type: 'assigned',
    incident: 'INC-010',
    user: 'Emily Chen',
    time: 'Yesterday',
  },
  {
    id: 'act-5',
    type: 'commented',
    incident: 'INC-007',
    user: 'Alex Brown',
    time: '2 days ago',
  },
];

const activityConfig = {
  created: {
    icon: Clock,
    variant: 'default' as const,
    text: 'created',
  },
  resolved: {
    icon: CheckCircle,
    variant: 'success' as const,
    text: 'resolved',
  },
  updated: {
    icon: RefreshCw,
    variant: 'warning' as const,
    text: 'updated',
  },
  assigned: {
    icon: UserPlus,
    variant: 'secondary' as const,
    text: 'was assigned to',
  },
  commented: {
    icon: MessageSquare,
    variant: 'outline' as const,
    text: 'commented on',
  },
};

export function RecentActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 size-4 text-brand" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => {
              const config = activityConfig[activity.type];
              const Icon = config.icon;

              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Icon
                      className={cn(
                        'size-4',
                        activity.type === 'created' && 'text-primary',
                        activity.type === 'resolved' && 'text-green-500',
                        activity.type === 'updated' && 'text-amber-500',
                        activity.type === 'assigned' && 'text-purple-500',
                        activity.type === 'commented' &&
                          'text-muted-foreground',
                      )}
                    />
                  </div>
                  <div>
                    <p className="text-sm leading-none">
                      <span className="font-semibold">{activity.user}</span>{' '}
                      {config.text}{' '}
                      <Badge variant="outline" className="ml-1 font-medium">
                        {activity.incident}
                      </Badge>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
