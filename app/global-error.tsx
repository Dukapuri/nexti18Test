'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div style={{ padding: 24 }}>
          <h1>치명적인 오류가 발생했습니다.</h1>
          <p>{error.message}</p>
          <button onClick={() => reset()}>다시 시도</button>
        </div>
      </body>
    </html>
  );
}