'use client'

import { Container } from '@/components/container'
import { Policy } from '@/components/policy'
import { AlertCircle, MessageSquare, Ban, ShieldAlert } from 'lucide-react'

const sections = [
  {
    id: 'item-1',
    icon: AlertCircle,
    title: 'Spoiler',
    content: [
      {
        text: 'Yorum yaparken, eğer yorumunuz animeyle ilgili spoiler veya önemli bir detay içeriyorsa, lütfen "Spoiler" butonunu işaretleyin.',
        emphasis: true,
      },
      {
        text: 'Önemli Uyarı:',
        emphasis: true,
        list: [
          'Spoiler butonu işaretlenmeden yapılan yorumlar için birkaç uyarı sonrası yasaklama uygulanabilir',
          'Bazı durumlarda doğrudan yasaklama da uygulanabilir',
          'Bu konuda tolerans gösterilmemektedir',
        ],
      },
    ],
  },
  {
    id: 'item-2',
    icon: Ban,
    title: 'Küfür & argo vb.',
    content: [
      {
        text: 'Kesinlikle Yasak Olan İçerikler:',
        emphasis: true,
        list: [
          'Küfür ve hakaret içeren yorumlar',
          'Argo kullanımı',
          'Nefret söylemi',
          'Irkçılık ve ayrımcılık içeren ifadeler',
        ],
      },
      {
        text: 'Uyarı: Bu tür yorumlar yapan kullanıcılar, herhangi bir uyarı yapılmaksızın platformdan uzaklaştırılacaktır.',
        emphasis: true,
      },
      {
        text: 'Ayrıca engellenen kelimeleri aşmaya çalışmak veya sansürü delme girişiminde bulunmak da yasaktır. Topluluğumuzun huzurunu korumak için lütfen bu kurala uyun.',
        emphasis: false,
      },
    ],
  },
  {
    id: 'item-3',
    icon: MessageSquare,
    title: 'Reklam',
    content: [
      {
        text: 'Yasak Olan Reklamlar:',
        emphasis: true,
        list: [
          'Diğer sitelerin reklamları',
          'Telegram grupları',
          'Instagram sayfaları',
          'TikTok sayfaları',
        ],
      },
      {
        text: 'İzin Verilen İçerikler:',
        emphasis: true,
        list: ['Edit/AMV linkleri', 'Anime hakkında bilgi veren linkler'],
      },
      {
        text: 'Uyarı: Reklam içerikleri paylaşan kullanıcılar, uyarı almaksızın platformdan uzaklaştırılabilir.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'item-4',
    icon: ShieldAlert,
    title: 'Saygısızlık',
    content: [
      {
        text: 'Yasak Olan Davranışlar:',
        emphasis: true,
        list: [
          'Ekip üyelerine karşı saygısızlık',
          'Bilgiçlik taslamak',
          'Alaycı tavırlar sergilemek',
          'Bölüm talepleriyle sabırsız davranmak',
        ],
      },
      {
        text: 'Bu tür davranışlar, topluluk içindeki uyumu bozabileceğinden, ciddi şekilde değerlendirilir.',
        emphasis: true,
      },
    ],
  },
]

export default function CommentPolicyPage() {
  return (
    <Container>
      <Policy
        title="Yorum Politikası"
        subtitle="Son güncelleme – 1 Eylül 2024"
        sections={sections}
      />
    </Container>
  )
}
