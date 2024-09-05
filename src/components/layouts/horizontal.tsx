'use client'

import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

// Add this new import

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action."

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  {
    icon: ShoppingCart,
    label: "Orders",
    badge: "6",
    children: [
      { href: "/orders", label: "All Orders" },
      { href: "/orders/pending", label: "Pending" },
    ]
  },
  { href: "#", icon: Package, label: "Products" },
  { href: "#", icon: Users, label: "Customers" },
  { href: "#", icon: LineChart, label: "Analytics" },
]

const NavLink = ({ item, isMobile = false }: {
  item: typeof navItems[0];
  isMobile?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const hasChildren = 'children' in item;

  const isActive = item.href === pathname ||
    (hasChildren && item.children?.some(child => child.href === pathname));

  const linkClass = `flex items-center gap-3 w-full rounded-lg px-3 py-2 transition-all hover:text-primary
    ${isActive ? "bg-muted text-primary dark:bg-muted/70" : "text-muted-foreground"}
    ${isMobile ? "mx-[-0.65rem] gap-4 text-lg" : ""}`;

  const content = (
    <>
      {item.icon && <item.icon className={isMobile ? "h-5 w-5" : "h-4 w-4"} />}
      {item.label}
      <div className="ml-auto flex items-center">
        {item.badge && (
          <Badge className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full mr-2">
            {item.badge}
          </Badge>
        )}
        {hasChildren && (
          isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
      </div>
    </>
  );

  return (
    <div>
      {hasChildren ? (
        <button onClick={() => setIsOpen(!isOpen)} className={linkClass}>
          {content}
        </button>
      ) : (
        <Link href={item.href!} className={linkClass}>
          {content}
        </Link>
      )}
      {hasChildren && (
        <div
          className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40" : "max-h-0"
            }`}
        >
          <div className="py-2">
            {item.children!.map((child, index) => (
              <Link
                key={index}
                href={child.href}
                className={`block py-2 px-3 rounded-lg transition-all hover:text-primary
                  ${child.href === pathname ? "text-primary" : "text-muted-foreground"}
                  ${isMobile ? "text-lg" : ""}`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const UpgradeCard = ({ className = "" }) => (
  <Card className={`${className} dark:bg-muted/70`}>
    <CardHeader className="p-2 pt-0 md:p-4">
      <CardTitle>Upgrade to Pro</CardTitle>
      <CardDescription className="dark:text-muted-foreground">
        Unlock all features and get unlimited access to our support team.
      </CardDescription>
    </CardHeader>
    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
      <Button size="sm" className="w-full">
        Upgrade
      </Button>
    </CardContent>
  </Card>
)

// Add this new Breadcrumb component
const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = navItems.find(item => item.href === href)?.label || segment;
    const isActive = index === pathSegments.length - 1;

    return (
      <li key={href} className="flex items-center">
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href={href}
          className={`text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary'}`}
        >
          {label}
        </Link>
      </li>
    );
  });

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center">
        <li>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary">
            Home
          </Link>
        </li>
        {breadcrumbs}
      </ol>
    </nav>
  );
};

export default function HorizontalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] dark:bg-background">
      <div className="hidden border-r bg-slate-50 md:block overflow-y-auto dark:bg-slate-900 dark:border-muted">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6 shrink-0">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="dark:text-foreground">Acme Inc</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8 dark:bg-muted/70 dark:hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item, index) => (
                <NavLink key={index} item={item} isMobile />
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 shrink-0">
            <UpgradeCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden">
        <header className="flex h-14 items-center gap-4 bg-muted/0 px-4 lg:h-[60px] lg:px-6 shrink-0 dark:bg-muted/10">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                {navItems.map((item, index) => (
                  <NavLink key={index} item={item} isMobile />
                ))}
              </nav>
              <div className="mt-auto">
                <UpgradeCard />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Breadcrumb />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 dark:bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
