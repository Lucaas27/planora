import { use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Calendar, TrendingUp } from "lucide-react";
import { activitiesApi } from "@/features/activities";

export function ActivitiesStats() {
  const activities = use(activitiesApi.getAll());

  const activeActivities = activities.filter(
    (activity) => activity.isActive
  ).length;
  const totalActivities = activities.length;
  const upcomingActivities = activities.filter(
    (activity) => new Date(activity.date) > new Date()
  ).length;

  const stats = [
    {
      title: "Total Events",
      value: totalActivities,
      subtitle: "All time events created",
      icon: Activity,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Active Events",
      value: activeActivities,
      subtitle: "Currently running",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Upcoming",
      value: upcomingActivities,
      subtitle: "Events scheduled ahead",
      icon: Calendar,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
