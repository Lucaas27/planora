import axios from "axios";
import { useEffect, useState } from "react";
import env from "@/lib/environment";
import "@/index.css";
import Layout from "@/components/layout";
import type { Activity } from "@/features/activities/types/activity";
import { ActivityDashboard } from "@/features/activities/components/dashboard/activity-dashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const handleOnCloseDetails = () => setSelectedId(undefined);
  const handleOnSelect = (id: string) => setSelectedId(id);
  const selectedActivity = activities?.find((a) => a.id === selectedId);

  useEffect(() => {
    axios
      .get<Activity[]>(`${env.API_BASE_URL}/activities`)
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <Layout>
      <ActivityDashboard
        activities={activities}
        selectedActivity={selectedActivity}
        onCloseDetails={handleOnCloseDetails}
        onSelect={handleOnSelect}
      />
    </Layout>
  );
}

export default App;
