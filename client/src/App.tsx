import axios from "axios";
import { useEffect, useState } from "react";
import type { Activity } from "@/types/api";
import env from "@/lib/environment";

function App() {

    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>(`${env.API_BASE_URL}/activities`)
                .then(response => setActivities(response.data));
    }, []);


    return (
        <>
            <h1 className="text-heading-lg mb-6">
                Planora
            </h1>

            <div className="space-y-4">
                {activities.map(activity => (
                    <div key={activity.id} className="activity-item">
                        <span className="text-body">
                            {activity.name}
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
