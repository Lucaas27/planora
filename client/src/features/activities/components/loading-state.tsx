import { Loader2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function LoadingState() {
  return (
    <div className="space-y-6">
      {/* Enhanced Loading Header */}
      <div className="text-center space-y-4 py-8">
        <div className="relative inline-flex items-center justify-center">
          <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <Loader2 className="absolute -bottom-1 -right-1 h-6 w-6 text-orange-500 animate-spin" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Loading your events...
          </h3>
          <p className="text-gray-600">Getting everything ready for you</p>
        </div>
      </div>

      {/* Loading Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <Card
            key={`skeleton-card-${index + 1}`}
            className="overflow-hidden bg-white border-0 shadow-md rounded-2xl"
          >
            {/* Image skeleton */}
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />

            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Title skeleton */}
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
                </div>

                {/* Details skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3" />
                </div>

                {/* Buttons skeleton */}
                <div className="flex gap-2 pt-2">
                  <div className="h-8 bg-gray-200 animate-pulse rounded-xl flex-1" />
                  <div className="h-8 bg-gray-200 animate-pulse rounded-xl flex-1" />
                </div>

                {/* Footer skeleton */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-16" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
