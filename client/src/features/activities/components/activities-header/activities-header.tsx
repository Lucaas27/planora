import { Plus, Filter, Search, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ActivitiesHeaderProps {
  onCreateNew?: () => void;
}

export function ActivitiesHeader({
  onCreateNew,
}: Readonly<ActivitiesHeaderProps>) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            My Events
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and organize all your amazing events in one place
          </p>
        </div>

        {onCreateNew && (
          <Button
            onClick={onCreateNew}
            className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Event
          </Button>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search your events..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filter and View Controls */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>

          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3 py-1.5 rounded-lg"
              aria-label="Grid view"
              title="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3 py-1.5 rounded-lg"
              aria-label="List view"
              title="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
