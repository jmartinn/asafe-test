'use client';

import { usePathname } from 'next/navigation';
import { Fragment, useMemo } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { ModeToggle } from './theme-switcher';

interface NavItem {
  label: string;
  href: string;
}

export function SiteHeader() {
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    return createBreadcrumbItems(pathname);
  }, [pathname]);

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-14 z-50 flex h-14 shrink-0 items-center gap-2 rounded-t-xl border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <Fragment key={`breadcrumb-${index}`}>
                  {index < breadcrumbItems.length - 1 ? (
                    <BreadcrumbItem>
                      <BreadcrumbLink href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}

function createBreadcrumbItems(pathname: string): NavItem[] {
  const segments = pathname.split('/').filter(Boolean);

  const items: NavItem[] = [];

  items.push({ label: 'Dashboard', href: '/' });

  if (segments.length === 0) {
    items.push({ label: 'Overview', href: '/' });
    return items;
  }

  let currentPath = '';

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = formatSegmentLabel(segment);
    items.push({ label, href: currentPath });
  });

  return items;
}

function formatSegmentLabel(segment: string): string {
  if (segment === 'new') return 'New';

  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
