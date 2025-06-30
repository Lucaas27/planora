import { Suspense } from "react";
import {
  ActivitiesStats,
  RecentActivities,
  QuickActions,
  StatsCardSkeleton,
  RecentActivitiesSkeleton,
} from "@/features/dashboard/components";

function DashboardContent() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 px-8 py-16 text-white">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl">
            Find and create unforgettable experiences in your city. From
            workshops to concerts, networking events to festivals - your next
            adventure awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
              Browse Events
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-orange-600 transition-colors">
              Create Event
            </button>
          </div>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Stats Cards with React 19 Suspense and use() */}
      <Suspense fallback={<StatsCardSkeleton />}>
        <ActivitiesStats />
      </Suspense>

      {/* Recent Activities */}
      <Suspense fallback={<RecentActivitiesSkeleton />}>
        <RecentActivities />
      </Suspense>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}

export function DashboardPage() {
  return <DashboardContent />;
}
