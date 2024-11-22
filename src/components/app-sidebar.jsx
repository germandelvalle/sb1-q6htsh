'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Importa usePathname para obtener la ruta actual
import {
  DollarSign,
  Home,
  LogOutIcon,
  Search,
  Settings,
  UserRound,
  Users2Icon,
} from 'lucide-react';
import Image from 'next/image';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

function year() {
  const date = new Date();
  const year = date.getFullYear();
  return year;
}


// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/backoffice/dashboard',
    icon: Home,
  },
  {
    title: 'Invoices',
    url: '/invoices',
    icon: DollarSign,
  },
  {
    title: 'Clients',
    url: '/backoffice/clients',
    icon: UserRound,
  },
  {
    title: 'Team Members',
    url: '/backoffice/team-members',
    icon: Users2Icon,
  },
  {
    title: 'New scope',
    url: '/backoffice/new-scope',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

const firm = {
  title: 'Digifianz',
  img: '/images/BoomLogo.svg',
  firmImg: '/images/Digifianz-logo-web.svg',
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="basis-full">
          <SidebarGroupLabel className="mb-10 mt-8 flex gap-4 items-center">
            <Image src={firm.img} alt={firm.title} width={40} height={40} />
            <Image src={firm.firmImg} alt={firm.firmImg} width={150} height={40} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`h-11 ${isActive ? 'bg-gray-700 text-white' : ''}`}
                      asChild
                    >
                      <Link href={item.url} passHref>
                        <div className="flex items-center gap-3 text-sm">
                          <item.icon size={18} />
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="#" passHref className="flex items-center gap-1 font-size-sm">
              <span className="font-bold">Log out</span>
              <LogOutIcon height={15} />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupLabel>
            <span>Digifianz {year()} - All rights reserved.</span>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
