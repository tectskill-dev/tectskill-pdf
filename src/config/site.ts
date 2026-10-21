/**
 * Site configuration
 */
export const siteConfig = {
  name: 'TectSkill PDF',
  description: 'Professional PDF Tools - Free, Private & Browser-Based. Merge, split, compress, convert, and edit PDF files online without uploading to servers.',
  url: 'https://tool.tectskill.com',
  ogImage: '/images/og-image.png',
  links: {
    github: 'https://github.com/tectskill-dev/tectskill-pdf',
    twitter: 'https://tectskill.com',
  },
  creator: 'TectSkill',
  keywords: [
    'PDF tools',
    'PDF editor',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'convert PDF',
    'free PDF tools',
    'online PDF editor',
    'browser-based PDF',
    'private PDF processing',
  ],
  // SEO-related settings
  seo: {
    titleTemplate: '%s | TectSkill PDF',
    defaultTitle: 'TectSkill PDF - Professional PDF Tools',
    twitterHandle: '@tectskill',
    locale: 'th_TH',
  },
};

/**
 * Navigation configuration
 */
export const navConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'Tools', href: '/tools' },
    { title: 'About', href: '/about' },
    { title: 'FAQ', href: '/faq' },
  ],
  footerNav: [
    { title: 'Privacy', href: '/privacy' },
    { title: 'Contact', href: '/contact' },
  ],
};
