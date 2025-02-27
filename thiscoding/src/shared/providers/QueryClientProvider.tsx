'use client';

import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from '@tanstack/react-query';

const QueryClientProvider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime: Infinity,
          },
        },
      }),
  );

  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
};

export default QueryClientProvider;
