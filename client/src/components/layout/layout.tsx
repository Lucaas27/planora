import { Navbar } from "@/components/layout/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-100 to-transparent rounded-full opacity-60 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-100 to-transparent rounded-full opacity-60 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-6 py-8 max-w-7xl relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
