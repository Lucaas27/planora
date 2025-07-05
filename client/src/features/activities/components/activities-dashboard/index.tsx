import { ActivityCard } from "@/features/activities/components/activity-card";
import type { Activity } from "@/features/activities/types/activity";

interface ActivitiesDashboardProps {
  activities: Activity[];
}
export function ActivitiesDashboard({ activities }: ActivitiesDashboardProps) {
  return (
    <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] p-4">
      {activities.length === 0 ? (
        <div className="col-span-full py-12 text-center text-muted-foreground">
          No activities found.
        </div>
      ) : (
        activities.map((activity) => <ActivityCard key={activity.id} activity={activity} />)
      )}
    </div>
  );
}
