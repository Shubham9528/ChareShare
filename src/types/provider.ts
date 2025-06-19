export interface Provider {
  id: string;
  category: string;
  name: string;
  svgIcon: string; // Custom SVG as string
  iconColor: string;
  iconBg: string;
  avatar?: string;
  rating?: number;
  specialization?: string;
  experience?: string;
}

export interface DetailedProvider {
  id: string;
  name: string;
  specialization: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  estimatedTime: string;
  availability: string;
  hours: string;
  yearsOfExperience: number;
  consultationFee: number;
}