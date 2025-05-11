interface Route {
  path: string
  label: string
  getPath?: () => string
}

interface Routes {
  root: Route
  home: Route
  animes: Route
  premium: Route
  login: Route
  register: Route
  watch: Route
  privacyPolicy: Route
  commentPolicy: Route
  termsOfUse: Route
}

export const routes: Routes = {
  root: {
    path: '/',
    label: 'Ana Sayfa',
  },
  home: {
    path: '/',
    label: 'Ana Sayfa',
  },
  animes: {
    path: '/animes',
    label: 'Animeler',
  },
  premium: {
    path: '/premium',
    label: 'Premium',
  },
  privacyPolicy: {
    path: '/privacy-policy',
    label: 'Gizlilik Politikası',
  },
  commentPolicy: {
    path: '/comment-policy',
    label: 'Yorum Politikası',
  },
  termsOfUse: {
    path: '/terms-of-use',
    label: 'Şartlar ve Koşullar',
  },
  login: {
    path: '/auth/login',
    label: 'GİRİŞ YAP',
  },
  register: {
    path: '/auth/register',
    label: 'ÜCRETSİZ DENE!',
  },
  watch: {
    path: '/watch',
    label: 'İzlemeye Başla',
    getPath: () => `/watch`,
  },
}
