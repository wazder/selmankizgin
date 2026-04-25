export type Project = {
  slug: string;
  name: string;
  year: string;
  role: string;
  services: string[];
  selling: string;
  thumbnail: string;
  clip?: string;
  views?: string;
  accent: string;
  summary: string;
  sections: { heading: string; body: string }[];
  href?: string;
  external?: boolean;
};

const youtubeThumb = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

export const projects: Project[] = [
  {
    slug: 'cinematic-01',
    name: 'Melis Fis — Nefesini Tut',
    year: '2026',
    role: 'AI Director',
    services: ['AI Visuals', 'Prompt Engineering'],
    selling: 'Sinematik ışık ve kompozisyonla kurgulanmış AI sahnesi.',
    thumbnail: youtubeThumb('E1aYPYaT5Cc'),
    clip: '/videos/cinematic-01.mp4',
    views: '230B',
    accent: '#C9F500',
    summary:
      'Sinematik bir atmosferi prompt engineering ile piksele döktüğüm kısa film denemesi.',
    sections: [
      { heading: 'Yaklaşım', body: 'Işık, lens ve renk paletini prompt seviyesinde kurgulayarak sahnenin tonunu sabitledim.' },
      { heading: 'Sonuç', body: 'Tek bir görsel akış — gerçekçilikten ödün vermeden, tekrar üretilebilir bir sahne.' },
    ],
    href: 'https://www.youtube.com/watch?v=E1aYPYaT5Cc',
    external: true,
  },
  {
    slug: 'cinematic-02',
    name: 'PUBG Mobile × Apollo',
    year: '2026',
    role: 'AI Director',
    services: ['AI Visuals', 'Motion'],
    selling: 'Karakter ve mekan arasındaki dengeyi test eden AI çalışması.',
    thumbnail: youtubeThumb('XVJznw96YUc'),
    clip: '/videos/cinematic-02.mp4',
    views: '1M',
    accent: '#6EE7FF',
    summary:
      'Karakter yönetimi ve sahne tutarlılığını öne çıkaran ikinci sinematik deneme.',
    sections: [
      { heading: 'Yaklaşım', body: 'Karakter seed sabitlemesi ve sahne-sahne stil tutarlılığı üzerine kurulu bir workflow.' },
      { heading: 'Sonuç', body: 'Farklı açılardan tutarlı görünen bir AI karakteri.' },
    ],
    href: 'https://www.youtube.com/watch?v=XVJznw96YUc',
    external: true,
  },
  {
    slug: 'cinematic-03',
    name: 'Çakal — Susmam Lazım',
    year: '2026',
    role: 'AI Director',
    services: ['AI Visuals', 'Storytelling'],
    selling: 'Hikaye odaklı, AI ile üretilmiş kısa anlatı.',
    thumbnail: youtubeThumb('YqUnJ8ZSIlQ'),
    clip: '/videos/cinematic-03.mp4',
    views: '925B',
    accent: '#E5FF00',
    summary:
      'Kısa bir anlatıyı AI ile sahneleme üzerine üçüncü deneme.',
    sections: [
      { heading: 'Yaklaşım', body: 'Hikaye beat’leri üzerinden prompt planlaması ve stil kilidi.' },
      { heading: 'Sonuç', body: 'Uçtan uca tek elden üretilmiş, sinematik kısa anlatı.' },
    ],
    href: 'https://www.youtube.com/watch?v=YqUnJ8ZSIlQ',
    external: true,
  },
  {
    slug: 'ai-reel',
    name: 'PUBG Mobile',
    year: '2026',
    role: 'AI Creator',
    services: ['AI Influencer', 'Social'],
    selling: '7/24 üretim yapan dijital karakterin Instagram reel’i.',
    thumbnail: '/placeholders/thumb-04.svg',
    clip: '/videos/ai-reel.mp4',
    views: '443B',
    accent: '#FF66C4',
    summary:
      'Sıfırdan kurulan AI Influencer karakterinin sosyal medya çıktısı.',
    sections: [
      { heading: 'Yaklaşım', body: 'Karakter kimliği, ses tonu ve görsel dilin reel formatına uyarlanması.' },
      { heading: 'Sonuç', body: 'Markalarla işbirliğine hazır, tekrar üretilebilir bir dijital kimlik.' },
    ],
    href: 'https://www.instagram.com/reel/DWY-LwOjCuS/',
    external: true,
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
