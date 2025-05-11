'use client'
import { Container } from '@/components/container'
import { Policy } from '@/components/policy'
import { Shield, Mail, Lock, Cookie, Link as LinkIcon, AlertTriangle, FileText } from 'lucide-react'

const sections = [
  {
    id: 'item-1',
    icon: Shield,
    title: 'Kullanıcı Bilgileri ve Analiz Hakkında Politika',
    content: [
      {
        text: 'Ziyaretçilerimizden elde ettiğimiz bilgileri her türlü analiz amacıyla kullanma hakkına sahibiz.',
        emphasis: false,
      },
      {
        text: 'Bu bilgileri Anizium olarak adlandırdığımız platformun iş ortaklarıyla paylaşma hakkını saklı tutuyoruz.',
        emphasis: false,
      },
      {
        text: 'Önemli Not: E-posta ve diğer kişisel bilgiler, kullanıcının açık izni olmadan hiçbir iş ortağı, şirket, kurum veya kuruluşla paylaşılmayacaktır.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'item-2',
    icon: Mail,
    title: 'İletişim Bilgilerinin Gizliliği',
    content: [
      {
        text: 'Anizium, kayıtlı ve misafir kullanıcıların iletişim bilgilerini (örneğin e-posta adresi, telefon numarası gibi) platformunda yayınlamaz.',
        emphasis: false,
      },
      {
        text: 'Önemli: Kullanıcı aksi belirlemediği sürece, bu tür bilgiler hiçbir iş ortağı, şirket, kurum veya diğer kuruluşla paylaşılmaz.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'item-3',
    icon: Shield,
    title: 'Kişisel Bilgilerin Üçüncü Taraflarla Paylaşılması',
    content: [
      {
        text: 'Kişisel bilgileri yasal durumlar ve yasal prosedürler çerçevesinde sadece aşağıdaki durumlar için üçüncü taraflara açabilir:',
        emphasis: false,
      },
      {
        text: 'Bilgilerin paylaşılabileceği durumlar:',
        emphasis: true,
        list: [
          'Yasal mercilerden yazılı bir talep olması halinde',
          'Anizium mülkiyet haklarını korumak ve savunmak amacıyla',
          'Üyelik Sözleşmesinde kabul ettiğiniz kurallar çerçevesinde',
        ],
      },
    ],
  },
  {
    id: 'item-4',
    icon: Lock,
    title: 'Bilgilerin Güvenli Saklanması',
    content: [
      {
        text: 'Anizium tarafından toplanan bilgiler, genel kullanıma açık olmayan güvenli bir ortamda saklanır.',
        emphasis: true,
      },
      {
        text: 'Güvenlik Önlemleri: Anizium, bilgileri korumak için endüstri standardı güvenlik yöntemlerini kullanmaktadır. Ancak güvenlik konusunda kesin bir garanti verilemez.',
        emphasis: false,
      },
    ],
  },
  {
    id: 'item-5',
    icon: FileText,
    title: 'Kişisel Bilgi Güncelleme ve Değiştirme Hakkı',
    content: [
      {
        text: 'Haklarınız: Kayıt sırasında girdiğiniz kişisel bilgileri istediğiniz zaman güncelleme veya değiştirme hakkınız bulunmaktadır.',
        emphasis: true,
      },
      {
        text: 'Uyarı: Anizium, "Gizlilik Politikası" ve "Üyelik Sözleşmesi" uymadığınız takdirde üyeliğinizi silmeye veya askıya almaya yetkilidir.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'item-6',
    icon: Cookie,
    title: 'Çerezler ve İnternet Tarayıcı Ayarları',
    content: [
      {
        text: 'Çerez Kullanımı:',
        emphasis: true,
        list: [
          'Sitemizi ziyaret ettiğinizde bilgisayarınıza çerez (cookie) veya benzeri dosyalar yerleştirilebilir',
          'Bu bilgi, siteleri ve reklamları ilgi alanlarınıza göre düzenlememiz için yardımcı olur',
        ],
      },
      {
        text: 'Çerez Kontrolü:',
        emphasis: true,
        list: [
          'Tarayıcınızın ayarlarını kullanarak çerezleri silebilir veya engelleyebilirsiniz',
          'Daha fazla bilgi için tarayıcınızın yardım dosyalarına ve kullanım bilgilerine başvurabilirsiniz',
        ],
      },
    ],
  },
  {
    id: 'item-7',
    icon: LinkIcon,
    title: 'Bağlantılı Web Siteleri ve Kapsamı',
    content: [
      {
        text: 'Önemli Bilgilendirme:',
        emphasis: true,
        list: [
          'Bu web sitesi diğer web sitelerine bağlantılar içerebilir',
          'Gizlilik Politikası sadece bu web sitesi için geçerlidir ve diğer web sitelerini kapsamaz',
          'Diğer sitelerde geçerli olan Gizlilik Politikası ve Üyelik Sözleşmesi hükümleri geçerlidir',
        ],
      },
      {
        text: 'Tavsiye: Diğer web sitelerinin politika metinlerini okumanız önerilir.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'item-8',
    icon: AlertTriangle,
    title: 'Sorumluluk Reddi',
    content: [
      {
        text: 'Yasal Statü:',
        emphasis: true,
        list: [
          '5651 sayılı yasanın 5. maddesinde tanımlanan yer sağlayıcı olarak hizmet vermektedir',
          'Web site yönetiminin hukuka aykırı içerikleri kontrol etme yükümlülüğü yoktur',
          'Sitemiz "uyar ve kaldır" prensibini benimsemiştir',
        ],
      },
      {
        text: 'Telif Hakkı İhlali Bildirimi:',
        emphasis: true,
        list: [
          'Telif hakkı ihlali bildirimi için: aniziumdestek@gmail.com',
          'Talepler hukuksal olarak incelenecektir',
          'İhlal tespit edilirse, içerikler kaldırılacaktır',
        ],
      },
      {
        text: 'İlgili Yasa Maddeleri:',
        emphasis: true,
        list: [
          'MADDE 5-(1): Yer sağlayıcı, içerik kontrolü veya hukuka aykırılık araştırması yapmakla yükümlü değildir',
          'MADDE 5-(2): Yer sağlayıcı, bildirim üzerine ve teknik imkan dahilinde hukuka aykırı içeriği kaldırmakla yükümlüdür',
        ],
      },
    ],
  },
  {
    id: 'item-9',
    icon: FileText,
    title: 'Politika Değişiklikleri ve Kabul Edilmiş Sayılma',
    content: [
      {
        text: 'Önemli Bilgilendirme:',
        emphasis: true,
        list: [
          'Anizium, bu metindeki her türlü bilgiyi değiştirme hakkını saklı tutar',
          'Bu web sitesini kullanarak gerçekleşen değişiklikleri kabul etmiş sayılırsınız',
        ],
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <Container>
      <Policy
        title="Gizlilik Politikası"
        subtitle="Son güncelleme – 1 Eylül 2024"
        sections={sections}
      />
    </Container>
  )
}
