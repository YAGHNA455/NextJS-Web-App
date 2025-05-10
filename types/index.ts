export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate?: string;
  manager: string;
  budget: number;
  progress: number;
  images: string[];
  videos: string[];
  tags: string[];
}

export interface ChartData {
  name: string;
  value: number;
}

export type ProjectSection = 'images' | 'videos';

export type TabsConfig = {
  value: string;
  label: string;
  icon: React.ReactNode;
}[];