'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, Info } from 'lucide-react'
import Link from 'next/link'
import { AnimeCard } from '@/components/anime-card'
import { animes } from '@/data/animes'
import { Container } from '@/components/container'
import { Player } from '@/components/player'
// Bu veriler normalde API'den gelecek
const animeData = {
  ...animes[0], // Attack on Titan'ın tüm verilerini al
  episode: {
    number: 1,
    title: 'To You, 2000 Years From Now',
    duration: '24:00',
    nextEpisode: {
      id: '2',
      title: 'That Day',
    },
    video: {
      qualities: [
        {
          label: '4K',
          src: '/assets/anime-4k.mp4',
        },
        {
          label: '1080p',
          src: '/assets/anime-1080p.mp4',
        },
      ],
      subtitles: [
        {
          label: 'Türkçe',
          srclang: 'tr',
          src: '/assets/anime.vtt',
        },
        {
          label: 'English',
          srclang: 'en',
          src: '/assets/anime.vtt',
        },
      ],
      audioTracks: [
        {
          label: 'Türkçe Dublaj',
          language: 'tr',
          src: '/assets/anime.m3u8',
        },
        {
          label: 'Japonca',
          language: 'ja',
          src: '/assets/anime.m3u8',
        },
        {
          label: 'English Dub',
          language: 'en',
          src: '/assets/anime.m3u8',
        },
      ],
      skipTimes: [
        {
          id: 'intro',
          label: 'İntroyu Geç',
          start: 0,
          end: 90,
        },
        {
          id: 'recap',
          label: 'Özeti Geç',
          start: 90,
          end: 180,
        },
        {
          id: 'preview',
          label: 'Ön İzlemeyi Geç',
          start: 550,
          end: 580,
        },
        {
          id: 'outro',
          label: 'Sonraki Bölüm',
          start: 580,
          end: 610,
        },
      ],
    },
  },
  videoUrl: '/assets/anime-4k.mp4',
  thumbnailUrl: '/assets/anime.jpg',
}

export default function WatchPage() {
  return (
    <div>
      {/* Video Player Container */}
      {/* <div className="relative"> */}
      <Player />
      {/* </div> */}

      <div className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Left Content */}
          <div className="space-y-8 lg:col-span-3">
            {/* Episode Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-white">{animeData.title}</h1>
                  <h2 className="text-xl text-white/80">
                    {animeData.episode.number}. Bölüm: {animeData.episode.title}
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-white/60">
                      Süre: {animeData.episode.duration}
                    </span>
                    <span className="text-white/60">•</span>
                    <span className="text-sm text-white/60">Yayın Tarihi: 24 Mart 2024</span>
                  </div>
                </div>
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Info className="mr-2 h-5 w-5" />
                  Bildir
                </Button>
              </div>
              <div className="rounded-xl bg-white/5 p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">Bölüm hakkında</h3>
                <p className="leading-relaxed text-white/80">{animeData.description}</p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">YORUMLAR</h3>
                <p className="text-sm text-white/60">
                  Lütfen yorum yapmadan önce{' '}
                  <Link href="/comment-policy" className="text-primary-red hover:underline">
                    Yorum Politikamızı
                  </Link>{' '}
                  okuyun.
                </p>
              </div>

              <div className="space-y-6 rounded-xl bg-white/5 p-6">
                <p className="text-center text-white/80">Yorum yapmak için üye olmalısınız.</p>

                {/* Sample Comments */}
                <div className="space-y-6 border-t border-white/10 pt-6">
                  {[
                    {
                      user: 'lilium',
                      time: '1 ay önce',
                      comment: 'Lütfen Türkçe dublaj yapinnnnnnnnn',
                      replies: [
                        { user: 'seqa', time: '9 gün önce', comment: 'geldi' },
                        {
                          user: 'neyonoır',
                          time: '8 gün önce',
                          comment:
                            'geldi çoğu yer güzel olmuş ama yeşil montlu adamın yeterince kazanamadım dediği yeri çocuğa sözde don alacaktık diye çevirmeniz ve bazı yerlerde buna benzeyen şakalar bence olmasa daha iyi elinize sağlık',
                        },
                      ],
                    },
                    {
                      user: 'emirreis',
                      time: '21 gün önce',
                      comment: 'güzel başladı',
                      replies: [],
                    },
                    {
                      user: 'efedodi',
                      time: '9 gün önce',
                      comment: 'dublaj güzel olmuş elinize sağlık',
                      replies: [{ user: 'seqa', time: '9 gün önce', comment: 'teşekkür ederiz' }],
                    },
                  ].map((comment, i) => (
                    <div key={i} className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-white/10" />
                          <div>
                            <p className="font-medium text-white">{comment.user}</p>
                            <p className="text-sm text-white/60">{comment.time}</p>
                          </div>
                        </div>
                        <p className="pl-[52px] text-white/80">{comment.comment}</p>
                        <div className="pl-[52px]">
                          <Button
                            variant="ghost"
                            className="text-primary-red hover:bg-primary-red/10 h-8 text-sm"
                          >
                            Yanıtla
                          </Button>
                        </div>
                      </div>

                      {/* Replies */}
                      {comment.replies.map((reply, j) => (
                        <div key={j} className="space-y-2 pl-[52px]">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/10" />
                            <div>
                              <p className="font-medium text-white">{reply.user}</p>
                              <p className="text-sm text-white/60">{reply.time}</p>
                            </div>
                          </div>
                          <p className="pl-[52px] text-white/80">{reply.comment}</p>
                          <div className="pl-[52px]">
                            <Button
                              variant="ghost"
                              className="text-primary-red hover:bg-primary-red/10 h-8 text-sm"
                            >
                              Yanıtla
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8 lg:col-span-1">
            {/* Episode List */}
            <div className="rounded-xl bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Sezon 1</h3>
              <div className="space-y-2">
                {Array.from({ length: 12 }, (_, i) => (
                  <Link
                    key={i + 1}
                    href={`/watch/${i + 1}`}
                    className={`block rounded-lg p-3 ${
                      i + 1 === animeData.episode.number
                        ? 'bg-primary-red text-white'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {i + 1} Bölüm {i === 0 ? '(TR Dub)' : ''}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4 rounded-xl bg-white/5 p-6">
              <div className="space-y-2">
                <h4 className="font-medium text-white">
                  Çekilişler, sohbetler ve daha fazlası için Discord sunucumuza katılın!
                </h4>
                <Button className="w-full bg-[#5865F2] hover:bg-[#5865F2]/80">
                  Discord'a Katıl
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-white">
                  Instagram sayfamızı da takip ederek yeni gelecek animeleri takip edebilirsiniz.
                </h4>
                <Button className="w-full bg-[#E4405F] hover:bg-[#E4405F]/80">
                  Instagram'da Takip Et
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Animes */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-white">BENZER</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {animes.slice(0, 5).map((anime, index) => (
              <AnimeCard key={index} anime={anime} variant="grid" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
