'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export const usePagination = (defaultPage = 1) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || defaultPage;

  const setPage = (newPage: number) => {
    router.push(`?page=${newPage}`, { scroll: false });
  };

  return { page, setPage };
};
