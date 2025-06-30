import { ActivitiesList } from "@/features/activities/components/activities-list";
import type { Activity } from "@/types/api";

export function ActivitiesPage() {
  const handleCreateNew = () => {
    // TODO: Implement create activity modal/page
    console.log("Create new activity");
  };

  const handleViewActivity = (activity: Activity) => {
    // TODO: Implement view activity modal/page
    console.log("View activity:", activity);
  };

  const handleEditActivity = (activity: Activity) => {
    // TODO: Implement edit activity modal/page
    console.log("Edit activity:", activity);
  };

  return (
    <ActivitiesList
      onCreateNew={handleCreateNew}
      onViewActivity={handleViewActivity}
      onEditActivity={handleEditActivity}
    />
  );
}
