import axios from "axios";
import type { Activity } from "@/types/api";

const API_BASE_URL = "https://localhost:5001/api";

export const activitiesApi = {
  getAll: async (): Promise<Activity[]> => {
    const response = await axios.get<Activity[]>(`${API_BASE_URL}/activities`);
    return response.data;
  },

  getById: async (id: string): Promise<Activity> => {
    const response = await axios.get<Activity>(
      `${API_BASE_URL}/activities/${id}`
    );
    return response.data;
  },

  create: async (
    activity: Omit<Activity, "id" | "createdDate" | "updatedAt">
  ): Promise<Activity> => {
    const response = await axios.post<Activity>(
      `${API_BASE_URL}/activities`,
      activity
    );
    return response.data;
  },

  update: async (
    id: string,
    activity: Partial<Activity>
  ): Promise<Activity> => {
    const response = await axios.put<Activity>(
      `${API_BASE_URL}/activities/${id}`,
      activity
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/activities/${id}`);
  },
};
