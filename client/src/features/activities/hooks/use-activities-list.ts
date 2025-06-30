import { useEffect, useState } from "react";
import { activitiesApi } from "@/features/activities/api/activities-api";
import type { Activity } from "@/types/api";

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await activitiesApi.getAll();
      setActivities(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch activities"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const refetch = fetchActivities;

  return {
    activities,
    loading,
    error,
    refetch,
  };
}
