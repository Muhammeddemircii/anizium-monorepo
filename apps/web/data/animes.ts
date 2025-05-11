import { Anime } from '@/types/anime'

export const animeCovers = [
  'https://anizium.com/assets/poster/one-piece-fan-letter.webp',
  'https://anizium.com/assets/poster/attack-on-titan.webp',
  'https://anizium.com/assets/poster/one-piece-9454.webp',
  'https://anizium.com/assets/poster/frieren-beyond-journeys-end-4050.webp',
  'https://anizium.com/assets/poster/dan-da-dan-9948.webp',
  'https://anizium.com/assets/poster/naruto-shippuden-7281.webp',
  'https://anizium.com/assets/poster/gintama-1710.webp',
  'https://anizium.com/assets/poster/monster-7156.webp',
]

export const animes: Anime[] = [
  {
    id: '7',
    title: 'Dan Da Dan',
    image: 'https://anizium.com/assets/poster/dan-da-dan-9948.webp',
    rating: '8.7',
    year: '2024',
    genres: ['Aksiyon', 'Komedi', 'Doğaüstü'],
    episodes: [
      { id: 's1e1', title: 'Başlangıç', season: 1, episode: 1 },
      { id: 's1e2', title: 'Ayako ve Okarun', season: 1, episode: 2 },
      { id: 's1e3', title: 'Turbo-Granny', season: 1, episode: 3 },
    ],
    description:
      'Doğaüstü olaylara ilgi duyan iki lise öğrencisinin, hayaletler ve uzaylılarla dolu maceraları.',
    type: 'TV',
    status: 'Devam Ediyor',
    quality: '4K',
  },
  {
    id: '8',
    title: 'Naruto Shippuden',
    image: 'https://anizium.com/assets/poster/naruto-shippuden-7281.webp',
    rating: '8.7',
    year: '2007',
    genres: ['Aksiyon', 'Macera', 'Fantastik'],
    episodes: [
      { id: 's1e1', title: 'Evine Dönüş', season: 1, episode: 1 },
      { id: 's1e2', title: 'Akatsuki Harekete Geçiyor', season: 1, episode: 2 },
      { id: 's1e3', title: 'Sonuçlar', season: 1, episode: 3 },
    ],
    description:
      "Naruto'nun Hokage olma yolundaki zorlu mücadelesi ve ninja dünyasını bekleyen büyük savaş.",
    type: 'TV',
    status: 'Tamamlandı',
    quality: '4K',
  },
  {
    id: '9',
    title: 'Gintama',
    image: 'https://anizium.com/assets/poster/gintama-1710.webp',
    rating: '9.0',
    year: '2006',
    genres: ['Aksiyon', 'Komedi', 'Bilim Kurgu'],
    episodes: [
      { id: 's1e1', title: 'Yeni Bir Başlangıç', season: 1, episode: 1 },
      { id: 's1e2', title: 'Yorozuya', season: 1, episode: 2 },
      { id: 's1e3', title: 'Samuray Ruhu', season: 1, episode: 3 },
    ],
    description:
      "Edo döneminde uzaylıların istilasına uğrayan Japonya'da, eski bir samuray olan Gintoki'nin absürt maceraları.",
    type: 'TV',
    status: 'Tamamlandı',
    quality: '4K',
  },
  {
    id: '10',
    title: 'Monster',
    image: 'https://anizium.com/assets/poster/monster-7156.webp',
    rating: '9.0',
    year: '2004',
    genres: ['Gizem', 'Dram', 'Gerilim'],
    episodes: [
      { id: 's1e1', title: 'Başlangıç', season: 1, episode: 1 },
      { id: 's1e2', title: 'Doktor Tenma', season: 1, episode: 2 },
      { id: 's1e3', title: 'Johan', season: 1, episode: 3 },
    ],
    description:
      "Dr. Kenzo Tenma'nın, kurtardığı çocuğun aslında tehlikeli bir seri katil olduğunu keşfetmesiyle başlayan psikolojik gerilim.",
    type: 'TV',
    status: 'Tamamlandı',
    quality: '4K',
  },
  {
    id: '11',
    title: 'One Piece Fan Letter',
    image: 'https://anizium.com/assets/poster/one-piece-fan-letter.webp',
    rating: '9.6',
    year: '2024',
    genres: ['Dram', 'Fantastik'],
    episodes: [{ id: 's1e1', title: 'Fan Letter', season: 1, episode: 1 }],
    description: "One Piece hayranlarının Oda sensei'ye yazdığı mektupları konu alan özel film.",
    type: 'Film',
    status: 'Tamamlandı',
    quality: '4K',
  },
]

export const featuredAnime = {
  title: 'Demon Slayer: Kimetsu no Yaiba',
  description:
    'Ailesi katledilen ve kız kardeşi şeytana dönüştürülen Tanjiro Kamado, bir şeytan avcısı olmak için yola çıkar. Soluk kesici animasyonları ve etkileyici hikayesiyle anime dünyasının en popüler serilerinden biri.',
  coverImage: 'https://anizium.com/assets/banner/demon-slayer-kimetsu-no-yaiba-1184.webp',
  backgroundImage: 'https://anizium.com/assets/banner/demon-slayer-kimetsu-no-yaiba-1184.webp',
  rating: '8.9',
  year: '2023',
  episodes: '44',
  genres: ['Aksiyon', 'Fantastik', 'Dram', 'Doğaüstü'],
}
