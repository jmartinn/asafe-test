'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { monthlyChartConfig, monthlyIncidentData } from '@/lib/data/charts';

export function IncidentChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Incidents Overview</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={monthlyChartConfig as ChartConfig}
          className="h-[300px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={monthlyIncidentData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="incidents"
              type="natural"
              stroke="var(--color-incidents)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="size-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
