import { Calendar, Home, MenuIcon, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Activities",
    icon: Calendar,
    href: "/activities",
  },
  {
    title: "Contact",
    icon: Phone,
    href: "/contact",
  },
];

function Navbar() {
  const desktopNavLinks = routes.map((route) => {
    const Icon = route.icon;
    return (
      <NavigationMenuItem key={route.title}>
        <NavigationMenuLink href={route.href} className={navigationMenuTriggerStyle()}>
          <span className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {route.title}
          </span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  });

  const mobileNavLinks = routes.map((route) => {
    const Icon = route.icon;
    return (
      <a
        key={route.title}
        href={route.href}
        className="flex items-center gap-2 font-medium py-2 px-2 rounded hover:bg-muted transition-colors"
      >
        <Icon className="h-4 w-4" />
        {route.title}
      </a>
    );
  });

  return (
    <header className="py-4 container mx-auto px-4 max-w-7xl">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex justify-center items-center gap-2 text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text font-semibold hover:opacity-80 transition-opacity duration-200"
        >
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl tracking-tighter">Planora</span>
        </a>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>{desktopNavLinks}</NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            <Button>Sign In</Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          {/* Trigger Button for Mobile Menu */}
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon">
              <MenuIcon className="h-4 w-4" />
            </Button>
          </SheetTrigger>

          {/* Mobile Menu Content */}
          <SheetContent side="right" className="max-h-screen overflow-auto">
            {/* Mobile Logo */}
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-center items-center gap-2 text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text font-semibold hover:opacity-80 transition-opacity duration-200">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-2xl tracking-tighter">Planora</span>
                </div>
              </SheetTitle>
            </SheetHeader>
            {/* Mobile Navigation Links */}
            <div className="flex flex-col p-4">
              <div className="flex flex-col text-center gap-4">{mobileNavLinks}</div>
              <div className="mt-6 flex flex-col gap-4">
                <Button>Sign in</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

export { Navbar };
