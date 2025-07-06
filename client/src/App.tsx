import axios from "axios";
import { useEffect, useState } from "react";
import env from "@/lib/environment";
import "@/index.css";
import Layout from "@/components/layout";
import type { Activity } from "@/features/activities/types/activity";
import { ActivityDashboard } from "@/features/activities/components/dashboard/activity-dashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>(`${env.API_BASE_URL}/activities`)
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <Layout>
      <ActivityDashboard activities={activities} />
    </Layout>
  );
}

export default App;
