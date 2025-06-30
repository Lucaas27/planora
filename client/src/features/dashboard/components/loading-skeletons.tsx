import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function StatsCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {["total", "active", "upcoming"].map((type) => (
        <Card key={type} className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                <div className="h-8 bg-gray-200 animate-pulse rounded w-16" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-32" />
              </div>
              <div className="p-3 rounded-2xl bg-gray-100">
                <div className="h-6 w-6 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function RecentActivitiesSkeleton() {
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardHeader className="pb-4">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3" />
        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {["recent-1", "recent-2", "recent-3", "recent-4", "recent-5"].map(
            (id) => (
              <div
                key={id}
                className="flex items-start space-x-4 rounded-xl border border-gray-100 p-4"
              >
                {/* Event Image Placeholder */}
                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 animate-pulse rounded-xl" />

                <div className="flex-1 space-y-2">
                  <div className="space-y-1">
                    <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-16" />
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-20" />
                    </div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded-full w-16" />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
