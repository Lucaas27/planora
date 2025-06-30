import { use } from "react";
import { activitiesApi } from "@/features/activities/api/activities-api";

/**
 * React 19 hook using the `use()` primitive for data fetching
 * This hook leverages React 19's built-in data fetching capabilities
 */
export function useActivitiesData() {
  // React 19's use() hook automatically handles suspense and error boundaries
  const activities = use(activitiesApi.getAll());

  return activities;
}

/**
 * React 19 hook for fetching a single activity
 */
export function useActivityData(id: string) {
  const activity = use(activitiesApi.getById(id));

  return activity;
}
