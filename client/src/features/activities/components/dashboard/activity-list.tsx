import type { Activity } from "@/features/activities/types/activity.ts";
import { ActivityCard } from "@/features/activities/components/dashboard/activity-card.tsx";

interface ActivityListProps {
  activities: Activity[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
}

export function ActivityList({ activities, selectedId, onSelect }: ActivityListProps) {
  return (
    <div className="flex flex-col justify-center gap-4">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          onSelect={onSelect}
          activity={activity}
          isActivitySelected={activity.id === selectedId}
        />
      ))}
    </div>
  );
}
