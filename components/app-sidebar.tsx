'use client';

import {
  AlertTriangle,
  FileBarChart,
  LayoutDashboard,
  MapPin,
  Package,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import { Icons } from './icons';
import { NavUser } from './nav-user';

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Locations', href: '/locations', icon: MapPin },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
  { name: 'Incidents', href: '/incidents', icon: AlertTriangle },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const data = {
  user: {
    name: 'John Doe',
    email: 'panic@thedis.co',
    avatar: 'https://github.com/jmartinn.png',
  },
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <ShadcnSidebar className="border-r bg-sidebar">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3 pt-2">
          <span className="sr-only">A-SAFE</span>
          <Link href="/">
            <Icons.logo className="h-9 cursor-pointer" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      'transition-colors data-[active=true]:bg-brand-light data-[active=true]:text-brand',
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 size-4" />
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
