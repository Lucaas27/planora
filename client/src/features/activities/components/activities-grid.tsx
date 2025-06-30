import { ActivityCard } from "@/features/activities/components/activities-card/activity-card";
import type { Activity } from "@/types/api";

interface ActivitiesGridProps {
  activities: Activity[];
  onViewActivity?: (activity: Activity) => void;
  onEditActivity?: (activity: Activity) => void;
}

export function ActivitiesGrid({
  activities,
  onViewActivity,
  onEditActivity,
}: Readonly<ActivitiesGridProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onView={onViewActivity}
          onEdit={onEditActivity}
        />
      ))}
    </div>
  );
}
