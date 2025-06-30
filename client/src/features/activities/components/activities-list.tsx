import { useActivities } from "@/features/activities/hooks";
import { ActivitiesHeader } from "@/features/activities/components/activities-header/activities-header";
import { ActivitiesGrid } from "@/features/activities/components/activities-grid";
import { EmptyState } from "@/features/activities/components/empty-state";
import { LoadingState } from "@/features/activities/components/loading-state";
import { ErrorState } from "@/features/activities/components/error-state";
import type { Activity } from "@/types/api";

interface ActivitiesListProps {
  onCreateNew?: () => void;
  onViewActivity?: (activity: Activity) => void;
  onEditActivity?: (activity: Activity) => void;
}

export function ActivitiesList({
  onCreateNew,
  onViewActivity,
  onEditActivity,
}: Readonly<ActivitiesListProps>) {
  const { activities, loading, error, refetch } = useActivities();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (activities.length === 0) {
    return <EmptyState onCreateNew={onCreateNew} />;
  }

  return (
    <div className="space-y-6">
      <ActivitiesHeader onCreateNew={onCreateNew} />
      <ActivitiesGrid
        activities={activities}
        onViewActivity={onViewActivity}
        onEditActivity={onEditActivity}
      />
    </div>
  );
}
