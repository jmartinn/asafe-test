import { cn } from '@/lib/utils';

interface StatBadgeProps {
  label: string;
  value: string;
  variant?: 'default' | 'warning' | 'danger';
}

export function StatBadge({
  label,
  value,
  variant = 'default',
}: StatBadgeProps) {
  return (
    <div
      className={cn(
        'flex min-w-[80px] flex-col items-center rounded-md border px-3 py-2',
        variant === 'warning' &&
          'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950',
        variant === 'danger' &&
          'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950',
      )}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={cn(
          'text-lg font-semibold',
          variant === 'warning' && 'text-orange-600 dark:text-orange-400',
          variant === 'danger' && 'text-red-600 dark:text-red-400',
        )}
      >
        {value}
      </span>
    </div>
  );
}
