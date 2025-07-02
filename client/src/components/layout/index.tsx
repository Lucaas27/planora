import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-primary/30 via-white gap-4">
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Container for the main content */}
        <div className="container mx-auto px-6">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
export default Layout;
