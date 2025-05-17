import axios from "axios";
import { useEffect, useState } from "react";
import type { Activity } from "@/types/api";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function App() {

    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>("https://localhost:5001/api/activities")
                .then(response => setActivities(response.data));
    }, []);


    return (
            <>
                <Typography variant={"h3"}>
                    Planora
                </Typography>

                <List>
                    {activities.map(activity => (
                            <ListItem key={activity.id}>
                                <ListItemText>
                                    {activity.name}
                                </ListItemText>
                            </ListItem>
                    ))}
                </List>
            </>
    );
}

export default App;
