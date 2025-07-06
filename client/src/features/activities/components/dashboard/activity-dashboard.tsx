import type { Activity } from "@/features/activities/types/activity";
import { ActivityList } from "@/features/activities/components/dashboard/activity-list.tsx";
import { ActivityDetails } from "@/features/activities/components/details/activity-details.tsx";
import { useState } from "react";

interface ActivityDashboardProps {
  activities: Activity[];
}
export function ActivityDashboard({ activities }: ActivityDashboardProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const selectedActivity = activities?.find((a) => a.id === selectedId);
  const handleOnCloseDetails = () => setSelectedId(undefined);

  const noActivityFound = () => (
    <div className="py-12 text-center text-muted-foreground">No activities found.</div>
  );

  if (!activities || activities.length === 0) {
    return noActivityFound();
  }

  return (
    <div className="p-4 flex gap-8">
      <div
        className={
          selectedActivity
            ? "w-full max-w-sm transition-all duration-200"
            : "w-full transition-all duration-200 max-w-2xl"
        }
        data-testid="activity-list-panel"
      >
        <ActivityList activities={activities} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
      {selectedActivity && (
        <div className="flex-1" data-testid="activity-details-panel">
          <ActivityDetails
            activity={selectedActivity}
            handleOnCloseDetails={handleOnCloseDetails}
          />
        </div>
      )}
    </div>
  );
}
