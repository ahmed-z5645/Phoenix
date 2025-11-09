export interface HelpRequest {
  id: string;
  userName: string;
  age: number;
  severity: 'critical' | 'urgent' | 'low';
  type: 'medical' | 'evacuation' | 'food' | 'shelter' | 'other';
  description: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
}

export interface User {
  id: string;
  name: string;
  age: number;
  status: string;
}

