export type Project = {
  slug: string;
  name: string;
  year: string;
  role: string;
  services: string[];
  selling: string;
  thumbnail: string;
  accent: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: 'helix-bank',
    name: 'Helix Bank',
    year: '2025',
    role: 'Lead Product Designer',
    services: ['Product Design', 'Design System'],
    selling: 'A mobile-first neobank for the Gen-Z wallet.',
    thumbnail: '/placeholders/thumb-01.svg',
    accent: '#C9F500',
    summary:
      'Mock summary — redesigned the core onboarding and card-creation flow. Replace with real outcomes and metrics.',
    sections: [
      {
        heading: 'The problem',
        body: 'Placeholder narrative about the user pain, market gap, and constraints. Swap with your own writing.',
      },
      {
        heading: 'Approach',
        body: 'Describe the research, design decisions, and trade-offs. Keep it outcome-oriented.',
      },
      {
        heading: 'Impact',
        body: 'Numbers go here — activation lift, churn drop, NPS, retention curve.',
      },
    ],
  },
  {
    slug: 'lumen-protocol',
    name: 'Lumen Protocol',
    year: '2024',
    role: 'Design Lead',
    services: ['Brand', 'Product Design'],
    selling: 'On-chain credit rails, built for clarity.',
    thumbnail: '/placeholders/thumb-02.svg',
    accent: '#6EE7FF',
    summary:
      'Mock summary — established the identity and dashboard IA for a DeFi protocol. Replace with real outcomes and metrics.',
    sections: [
      { heading: 'The problem', body: 'Placeholder narrative — swap with your own writing.' },
      { heading: 'Approach', body: 'Placeholder approach — research, systems, explorations.' },
      { heading: 'Impact', body: 'Placeholder outcomes.' },
    ],
  },
  {
    slug: 'orbit-invest',
    name: 'Orbit Invest',
    year: '2023',
    role: 'Product Designer',
    services: ['Product Design', 'Illustration'],
    selling: 'Retirement that actually speaks to people.',
    thumbnail: '/placeholders/thumb-03.svg',
    accent: '#E5FF00',
    summary:
      'Mock summary — reimagined the goals flow for a long-horizon investment app. Replace with real outcomes and metrics.',
    sections: [
      { heading: 'The problem', body: 'Placeholder narrative — swap with your own writing.' },
      { heading: 'Approach', body: 'Placeholder approach — research, systems, explorations.' },
      { heading: 'Impact', body: 'Placeholder outcomes.' },
    ],
  },
  {
    slug: 'velvet-pay',
    name: 'Velvet Pay',
    year: '2023',
    role: 'Senior Designer',
    services: ['Brand', 'Motion'],
    selling: 'Payment UX with a craftsman touch.',
    thumbnail: '/placeholders/thumb-04.svg',
    accent: '#FF66C4',
    summary:
      'Mock summary — crafted the checkout sequence and its micro-interactions. Replace with real outcomes and metrics.',
    sections: [
      { heading: 'The problem', body: 'Placeholder narrative — swap with your own writing.' },
      { heading: 'Approach', body: 'Placeholder approach — research, systems, explorations.' },
      { heading: 'Impact', body: 'Placeholder outcomes.' },
    ],
  },
];

export const testimonials = [
  {
    quote: 'Placeholder testimonial one — swap with something a real collaborator actually said about your work.',
    author: 'Jane Collaborator',
    role: 'Head of Product, Placeholder Co.',
  },
  {
    quote: 'Placeholder testimonial two — keep it specific. Vague praise reads as filler.',
    author: 'Kerem Müşteri',
    role: 'CEO, Placeholder Labs',
  },
  {
    quote: 'Placeholder testimonial three — quotes about craft, clarity, and shipping beat adjectives.',
    author: 'Amaranta Example',
    role: 'CTO, Placeholder Ventures',
  },
];

export const clientLogos = [
  'Helix',
  'Lumen',
  'Orbit',
  'Velvet',
  'Nimbus',
  'Quanta',
  'Zenith',
  'Axiom',
  'Paragon',
];
