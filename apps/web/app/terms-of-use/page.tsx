'use client'

import { Container } from '@/components/container'
import { Policy } from '@/components/policy'
import { UserPlus, RefreshCcw, AlertTriangle, Mail, FileText } from 'lucide-react'

const sections = [
  {
    id: 'item-1',
    icon: UserPlus,
    title: 'Üyelik ve Hizmetler',
    content: [
      {
        text: 'Üyelik Süreçleri:',
        emphasis: true,
        list: [
          'Siteye üye olan kullanıcılar, 3 günlük ücretsiz deneme üyeliğinden faydalanabilirler',
          'Deneme süresi sonunda kullanıcı, premium üyelik paketine geçiş yapabilir veya üyelik iptalini gerçekleştirebilir',
        ],
      },
      {
        text: 'Premium Üyelik:',
        emphasis: true,
        list: [
          'Kullanıcı, Deneme, 30 günlük veya daha uzun süreli premium üyelik paketlerinden birini satın alarak sitedeki içeriklere tam erişim sağlayabilir',
          'Üyelik süresi sonunda, eğer kullanıcı iptal etmezse, üyelik seçilen paket süresine göre otomatik olarak yenilenecektir',
        ],
      },
      {
        text: 'Otomatik yenileme işlemi, kullanıcı tarafından iptal edilmediği sürece her dönem sonunda gerçekleşir ve ilgili ödeme yöntemi üzerinden ücret tahsil edilir.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'item-2',
    icon: RefreshCcw,
    title: 'Üyelik İptali ve Ücret İadesi',
    content: [
      {
        text: 'Üyelik İptali:',
        emphasis: true,
        list: [
          'Kullanıcılar, üyeliklerini yenileme tarihinden önce herhangi bir zamanda iptal etme hakkına sahiptir',
          'İptal talebi yazılı olarak aniziumdestek@gmail.com adresine iletilmelidir',
          'İptal işlemi, mevcut üyelik süresinin sonunda geçerli olacaktır',
          'İptal edilen dönem için ücret alınmayacaktır',
        ],
      },
      {
        text: 'İade Süreci:',
        emphasis: true,
        list: [
          'Premium üyelik satın alındıktan sonra iade talebinde bulunulabilir',
          'İade talepleri satın alma tarihinden itibaren 7 gün içerisinde yapılmalıdır',
          'İade işlemi için aniziumdestek@gmail.com adresine başvuru yapılmalıdır',
          'İade ve iptal talepleri koşulsuz şartsız kabul edilir',
          'İade işlemi en geç 14 iş günü içerisinde yapılır',
        ],
      },
      {
        text: 'Önemli Not: İade, yalnızca ilk premium üyelik alımı için geçerlidir. Daha önce iade talebinde bulunmuş kullanıcılar, sonraki üyeliklerinde iade talebinde bulunamazlar.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'item-3',
    icon: AlertTriangle,
    title: 'Sorumluluk Reddi',
    content: [
      {
        text: 'Hizmet Sunumu:',
        emphasis: true,
        list: [
          'Sitemiz "olduğu gibi" ve "mevcut olduğu şekliyle" sunulmaktadır',
          'Herhangi bir garantisi veya koşulu olmaksızın sunulmaktadır',
          'Belirli bir amaca uygunluk veya ihlal etmeme garantisi olmaksızın sunulmaktadır',
        ],
      },
    ],
  },
  {
    id: 'item-4',
    icon: Mail,
    title: 'İletişim',
    content: [
      {
        text: 'Bu şartlar ve koşullarla ilgili her türlü soru veya talep için aniziumdestek@gmail.com adresinden bizimle iletişime geçebilirsiniz.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'item-5',
    icon: FileText,
    title: 'Değişiklikler',
    content: [
      {
        text: 'Güncelleme Politikası:',
        emphasis: true,
        list: [
          "Şartlar ve Koşullar'ı zaman zaman güncelleyebiliriz",
          'Değişiklikler yapıldığında, bu sayfada güncellenecektir',
          'Bu sayfayı düzenli olarak gözden geçirmenizi öneririz',
        ],
      },
    ],
  },
]

export default function TermsOfUsePage() {
  return (
    <Container>
      <Policy
        title="Şartlar ve Koşullar"
        subtitle="Son güncelleme – 1 Eylül 2024"
        sections={sections}
      />
    </Container>
  )
}
