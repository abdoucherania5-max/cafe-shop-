/**
 * Core data and pure utility functions for Lumière Café
 */

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  tag: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  alt: string;
  category: string;
  aspect: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  city: string;
}

export interface ReservationPayload {
  name: string;
  date: string;
  time: string;
  guests: number;
  seating?: string;
  notes?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'latte',
    name: 'Classic Caffè Latte',
    price: '$4.00',
    description: 'Freshly pulled double espresso with silky steamed milk and a smooth layer of foam.',
    tag: 'Classic',
    image: 'images/latte.jpg'
  },
  {
    id: 'coffee',
    name: 'Fresh Brewed Coffee',
    price: '$3.00',
    description: 'Balanced, rich medium roast coffee brewed fresh in small batches all day long.',
    tag: 'Daily Brew',
    image: 'images/geisha.jpg'
  },
  {
    id: 'coldbrew',
    name: 'Iced Cold Brew',
    price: '$4.00',
    description: 'Smooth, slow-steeped cold brew served chilled over ice with optional sweet cold foam.',
    tag: 'Iced Coffee',
    image: 'images/coldbrew.jpg'
  },
  {
    id: 'matcha',
    name: 'Matcha Latte',
    price: '$4.50',
    description: 'Traditional green tea matcha whisked with warm milk and a gentle touch of honey.',
    tag: 'Tea Favorite',
    image: 'images/matcha.jpg'
  },
  {
    id: 'croissant',
    name: 'Butter Croissant',
    price: '$3.00',
    description: 'Flaky, golden, all-butter French croissant baked fresh in-house every morning.',
    tag: 'Fresh Bakery',
    image: 'images/brioche.jpg'
  },
  {
    id: 'cake',
    name: 'Lemon Cake Slice',
    price: '$3.50',
    description: 'Tender, moist bakery-style lemon loaf finished with a light sweet citrus glaze.',
    tag: 'Sweet Pastry',
    image: 'images/cake.jpg'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', src: 'images/gallery-1.jpg', title: 'The Arched Morning Nook', alt: 'Sunlight filtering through linen curtains onto a cozy velvet reading nook', category: 'Atmosphere', aspect: 'tall' },
  { id: 'g2', src: 'images/gallery-2.jpg', title: 'Morning Viennoiserie', alt: 'Freshly baked flaky pastries dusted with powdered sugar and pistachio', category: 'Bakery', aspect: 'square' },
  { id: 'g3', src: 'images/gallery-3.jpg', title: 'Classic Latte Craft', alt: 'Barista pouring intricate swan latte art dusted with organic rose petals', category: 'Coffee Bar', aspect: 'wide' },
  { id: 'g4', src: 'images/gallery-4.jpg', title: 'Ceremonial Whisk Ritual', alt: 'Bamboo chasen whisking bright green ceremonial matcha in a handcrafted ceramic bowl', category: 'Matcha', aspect: 'tall' },
  { id: 'g5', src: 'images/gallery-5.jpg', title: 'Thursday Literary Salon', alt: 'Intimate circle of women gathered around warm tea and fiction literature', category: 'Gatherings', aspect: 'square' },
  { id: 'g6', src: 'images/gallery-6.jpg', title: 'Cold Brew over Crystal Ice', alt: 'Amber cold brew gently meeting swirling bourbon vanilla cream in fluted glassware', category: 'Drinks', aspect: 'square' },
  { id: 'g7', src: 'images/gallery-7.jpg', title: 'Fairly Sourced Micro-Lots', alt: 'Freshly roasted whole bean coffee sourced exclusively from female smallholder farms', category: 'Sourcing', aspect: 'wide' },
  { id: 'g8', src: 'images/gallery-8.jpg', title: 'Candlelit Evening Solitude', alt: 'Warm ambient glow illuminating books, porcelain cups, and quiet conversations', category: 'Evenings', aspect: 'tall' }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'Lumière is my cherished weekly ritual. Stepping past the soft linen drapery into Didouche Mourad feels like a deep, restoring exhale. The classic latte is sheer comfort.',
    author: 'Elena Vance',
    role: 'Editorial Director, M Muse Magazine',
    city: 'Alger Centre'
  },
  {
    id: 't2',
    quote: 'The women’s book nights have given me some of the most profound friendships of my life. It is exceptionally rare to find a cafe so intentionally curated for calm and real connection.',
    author: 'Dr. Maya Lin',
    role: 'Neuroscientist & Author',
    city: 'Hydra, Alger'
  },
  {
    id: 't3',
    quote: 'Every architectural detail honors quiet luxury—from the acoustic warmth of the reading nooks to the tactile custom ceramics. My mornings here set the tone for my entire creative week.',
    author: 'Camille Laurent',
    role: 'Interior Architect',
    city: 'El Biar, Alger'
  }
];

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

export function validateReservation(payload: Partial<ReservationPayload>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = 'Please provide your full name (at least 2 characters).';
  }

  if (!payload.date) {
    errors.date = 'Please select a reservation date.';
  } else {
    // Check if date is in the past
    const selected = new Date(payload.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selected.getTime()) || selected < today) {
      errors.date = 'Reservation date must be today or a future date.';
    }
  }

  if (!payload.time || payload.time.trim() === '') {
    errors.time = 'Please select a preferred seating time.';
  }

  const guests = Number(payload.guests);
  if (!guests || isNaN(guests) || guests < 1 || guests > 8) {
    errors.guests = 'Please select party size between 1 and 8 guests.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function getNextSlideIndex(current: number, total: number, direction: 'next' | 'prev' = 'next'): number {
  if (total <= 0) return 0;
  if (direction === 'next') {
    return (current + 1) % total;
  }
  return (current - 1 + total) % total;
}
