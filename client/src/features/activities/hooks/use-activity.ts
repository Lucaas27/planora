import { useEffect, useState } from "react";
import { activitiesApi } from "@/features/activities/api/activities-api";
import type { Activity } from "@/types/api";

export function useActivity(id: string) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivity() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await activitiesApi.getById(id);
        setActivity(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch activity"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, [id]);

  return {
    activity,
    loading,
    error,
  };
}
