import { Link, useLocation } from "react-router-dom";
import { Search, Plus, Calendar, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavbarProps {
  className?: string;
}

const navigation = [
  { name: "Browse Events", href: "/", exact: true, icon: Calendar },
  { name: "My Activities", href: "/activities", exact: false, icon: User },
];

export function Navbar({ className }: Readonly<NavbarProps>) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActiveRoute = (href: string, exact: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg shadow-sm border-gray-200/50",
        className
      )}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text hover:from-orange-700 hover:to-red-600 transition-all duration-200"
            >
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span>Planora</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities and events..."
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-2xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-gray-100",
                    isActiveRoute(item.href, item.exact)
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Create Activity Button */}
            <Button className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-3 text-sm font-medium rounded-lg transition-all",
                        isActiveRoute(item.href, item.exact)
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Actions */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white rounded-xl py-3 font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl py-3 border-gray-200"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
