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
    name: 'Melis Fis — PUBG',
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
    name: 'PUBG Mobile 8. Yıl',
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

export type Testimonial = {
  quote: string[];
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: [
      'Gemiyi her zaman en son kaptan terk edermiş; ben de öyle biliyordum.',
      'Bugüne kadar birçok proje yönettim; birçok süreçten geçtim. Bu süreçlerde genelde projelerimin 360° tüm aşamasında başında olurum; çoğu zaman dar vakitlerde ürettiğim işlerin son exportlarını bile kendim alırım. Post prodüksiyon ekipleri bazen yorulur; bazen yaratıcı bakış açıları yorgunlukla zayıflar ve gemiyi terk edip evlerine giderler.',
      '"Ben de öyle biliyordum."',
      'Ta ki bir genç tanıyana kadar… Benimle birlikte gemiyi terk etmeyen; son ana kadar süreçte kalan. Savaşçı ruhu; yaratıcı düşünceleri ve pozitif motivasyonuyla son ana kadar yanımda duran bir genç…',
      'Geç tanıdığım için üzüldüğüm; kısa zamanda birlikte güzel projelere imza attığım ekip arkadaşım Selman, seninle çalışmaktan memnunum. Bol başarılar.',
    ],
    author: 'Burak Kılıçkaya',
    role: 'Yönetmen',
  },
  {
    quote: [
      'Selman, çizim yeteneği ve tasarımcı kimliği sayesinde her zaman sıra dışı ve kendine özgü çalışmalarıyla dikkat çekmeyi başarmıştı. Şimdi ise yaratım sürecine yapay zeka araçlarını dahil ederek, daha da etkileyici çalışmalar üretmeye başladı. Onun yeni eserlerini ve projelerini takip etmeyi sabırsızlıkla bekliyorum.',
    ],
    author: 'Umut Doğan Akgün',
    role: 'Kreatif Ada Ajansı Kurucu Ortağı, Akademisyen',
  },
  {
    quote: [
      'Selman is one of those people who just gets it. He keeps things simple, listens carefully, and delivers work that feels thoughtful and well put together. Working with him felt easy the whole way through.',
    ],
    author: 'Hadi Haijou',
    role: 'Global E-Ticaret Uzmanı, Girişimci',
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
