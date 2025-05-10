import { Project, ChartData } from '@/types';

export const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Harbor View Condominiums',
    description: 'Luxury waterfront condominium development with 120 units featuring premium amenities and panoramic ocean views.',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: '123 Ocean Drive, Los Angeles, CA'
    },
    status: 'active',
    startDate: '2023-10-15',
    endDate: '2025-06-30',
    manager: 'Jennifer Martinez',
    budget: 45000000,
    progress: 35,
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
    ],
    videos: [
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    tags: ['Residential', 'Luxury', 'Waterfront']
  },
  {
    id: '2',
    name: 'Greenfield Business Park',
    description: 'Sustainable commercial business park with LEED certification, featuring 10 office buildings and shared green spaces.',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '456 Tech Blvd, San Francisco, CA'
    },
    status: 'active',
    startDate: '2023-05-20',
    endDate: '2024-12-15',
    manager: 'Robert Wilson',
    budget: 78000000,
    progress: 60,
    images: [
      'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg',
      'https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg',
      'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg'
    ],
    videos: [
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    tags: ['Commercial', 'Sustainable', 'LEED']
  },
  {
    id: '3',
    name: 'Riverside Hospital Expansion',
    description: 'Major expansion of existing medical facility, adding 250,000 sq ft for new emergency department and specialty care units.',
    location: {
      lat: 41.8781,
      lng: -87.6298,
      address: '789 Health Way, Chicago, IL'
    },
    status: 'on-hold',
    startDate: '2024-02-10',
    endDate: '2026-09-01',
    manager: 'Sarah Johnson',
    budget: 120000000,
    progress: 15,
    images: [
      'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg',
      'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg',
      'https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg'
    ],
    videos: [
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    tags: ['Healthcare', 'Expansion', 'Public']
  },
  {
    id: '4',
    name: 'Central Transit Hub',
    description: 'Modern transportation center connecting subway, bus, and high-speed rail with retail space and public plazas.',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '100 Union Square, New York, NY'
    },
    status: 'completed',
    startDate: '2022-04-15',
    endDate: '2024-01-28',
    manager: 'Michael Chen',
    budget: 250000000,
    progress: 100,
    images: [
      'https://images.pexels.com/photos/1755683/pexels-photo-1755683.jpeg',
      'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg',
      'https://images.pexels.com/photos/3933881/pexels-photo-3933881.jpeg'
    ],
    videos: [
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    tags: ['Infrastructure', 'Transit', 'Urban']
  }
];

export const projectTimelineData: ChartData[] = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 15 },
  { name: 'Mar', value: 12 },
  { name: 'Apr', value: 18 },
  { name: 'May', value: 22 },
  { name: 'Jun', value: 25 },
  { name: 'Jul', value: 20 },
  { name: 'Aug', value: 28 },
  { name: 'Sep', value: 30 },
  { name: 'Oct', value: 35 },
  { name: 'Nov', value: 32 },
  { name: 'Dec', value: 40 },
];

export const projectBudgetData: ChartData[] = [
  { name: 'Q1', value: 3500000 },
  { name: 'Q2', value: 7800000 },
  { name: 'Q3', value: 12000000 },
  { name: 'Q4', value: 8500000 },
];

export const projectStatusData = [
  { name: 'Active', value: 15 },
  { name: 'Completed', value: 8 },
  { name: 'On Hold', value: 3 },
];

export const projectTypesData = [
  { name: 'Residential', value: 12 },
  { name: 'Commercial', value: 8 },
  { name: 'Infrastructure', value: 5 },
  { name: 'Healthcare', value: 3 },
  { name: 'Education', value: 2 },
];