import axios from "axios";
import { useEffect, useState } from "react";
import env from "@/lib/environment";
import type { Activity } from "@/types/api";
import "@/index.css";
import Layout from "@/components/layout";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>(`${env.API_BASE_URL}/activities`)
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <Layout>
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <span className="text-body">{activity.name}</span>
        </div>
      ))}
    </Layout>
  );
}

export default App;
