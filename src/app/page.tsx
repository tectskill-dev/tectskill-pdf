'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n/config';

// TectSkill PDF: always open in Thai (users can switch language from the header)
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return null;
}
