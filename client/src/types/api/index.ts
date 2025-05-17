export interface Activity {
    id: string;
    name: string;
    description: string;
    date: string;
    category: string;
    isActive: boolean;
    city: string;
    location: string;
    latitude: number;
    longitude: number;
    createdDate: string;
    updatedAt: string | null;
}