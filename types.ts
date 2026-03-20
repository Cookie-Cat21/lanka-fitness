export interface Trainer {
  id: number;
  name: string;
  role: string;
  image: string;
  specialization: string[];
}

export interface ClassItem {
  id: number;
  title: string;
  time: string;
  days: string[];
  image: string;
}

export interface PricingTier {
  name: string;
  price: string; // LKR
  period: string;
  features: string[];
  highlight?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  result: string;
}
