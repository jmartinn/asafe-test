import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  description?: string;
  actionIcon?: React.ReactNode;
  statusIcon?: boolean;
}

export function MetricCard({
  title,
  value,
  trend,
  trendUp,
  description,
  actionIcon,
  statusIcon,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {actionIcon && (
          <Button variant="ghost" size="icon" className="size-8">
            {actionIcon}
            <span className="sr-only">Add {title}</span>
          </Button>
        )}
        {statusIcon && (
          <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p
            className={`text-xs ${trendUp ? 'text-green-500' : 'text-red-500'}`}
          >
            {trend}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
