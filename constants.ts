import { Trainer, PricingTier, ClassItem, Testimonial } from './types';

/* =========================
   TRAINERS
========================= */

export const TRAINERS: Trainer[] = [
  {
    id: 1,
    name: "Kavi Perera",
    role: "Head Performance Coach",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80",
    specialization: ["Strength & Conditioning", "Athlete Prep", "Hypertrophy"]
  },
  {
    id: 2,
    name: "Sarah Jayawardena",
    role: "Lead HIIT Instructor",
    image:
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=600&q=80",
    specialization: ["Fat Loss", "Functional Training", "Mobility"]
  },
  {
    id: 3,
    name: "Malik De Silva",
    role: "Bodybuilding Specialist",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    specialization: ["Competition Prep", "Nutrition", "Muscle Gain"]
  }
];

/* =========================
   PRICING
========================= */

export const PRICING: PricingTier[] = [
  {
    name: "Basic",
    price: "8,500",
    period: "Month",
    features: [
      "Access to Gym Floor (Off-peak)",
      "Locker Usage",
      "1 Intro Session",
      "Free WiFi"
    ]
  },
  {
    name: "Elite",
    price: "15,000",
    period: "Month",
    highlight: true,
    features: [
      "Unlimited 24/7 Access",
      "All Group Classes Included",
      "Sauna & Steam Room",
      "Quarterly Body Analysis",
      "Bring a Friend (1x/month)"
    ]
  },
  {
    name: "Transformation",
    price: "45,000",
    period: "3 Months",
    features: [
      "Everything in Elite",
      "12 Personal Training Sessions",
      "Custom Nutrition Plan",
      "Weekly Check-ins",
      "Fitness Lanka Merch Pack"
    ]
  }
];

/* =========================
   CLASSES (UPGRADED + 4 ITEMS)
========================= */

export const CLASSES: ClassItem[] = [
  {
    id: 1,
    title: "Power HIIT",
    time: "06:00 AM - 07:00 AM",
    days: ["Mon", "Wed", "Fri"],
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop&fm=webp",
  },
  {
    id: 2,
    title: "Iron Pump",
    time: "05:30 PM - 06:30 PM",
    days: ["Tue", "Thu"],
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop&fm=webp",
  },
  {
    id: 3,
    title: "Mobility Flow",
    time: "08:00 AM - 09:00 AM",
    days: ["Sat", "Sun"],
    image:
      "https://images.unsplash.com/photo-1599447292180-45d6d9a0b4b7?q=80&w=1000&auto=format&fit=crop&fm=webp",
  },
  {
    id: 4,
    title: "Strength Foundations",
    time: "07:30 PM - 08:30 PM",
    days: ["Mon", "Thu"],
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop&fm=webp",
  },
];


/* =========================
   TESTIMONIALS
========================= */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Dilshan R.",
    role: "Software Engineer",
    quote:
      "I tried 4 different gyms in Colombo before finding Fitness Lanka. The atmosphere here is unmatched. It pushes you to be better.",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80&fm=webp",
    result: "Lost 12kg in 3 Months"
  },
  {
    id: 2,
    name: "Ayesha M.",
    role: "Medical Student",
    quote:
      "Clean, safe, and professional. The trainers actually care about your form. It’s my escape from university stress.",
    image:
      "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?auto=format&fit=crop&w=200&q=80",
    result: "Gained Significant Strength"
  }
];

export const REVIEWS = [
  {
    name: "Nimal S.",
    rating: 5,
    text: "Best gym vibe in Colombo. Equipment is top tier and trainers are super helpful.",
    tag: "Strength training",
  },
  {
    name: "Ayesha K.",
    rating: 5,
    text: "Clean, premium, and the community energy is amazing. Classes are intense but fun.",
    tag: "Group classes",
  },
  {
    name: "Tharindu M.",
    rating: 4,
    text: "Solid facilities and good coaching. Peak hours get busy but the atmosphere is great.",
    tag: "Coaching",
  },
];


