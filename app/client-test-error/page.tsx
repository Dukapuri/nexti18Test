'use client';

import { useState } from 'react';

export default function TestErrorPage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('렌더링 단계에서 발생시킨 테스트 에러');
  }

  return (
    <div>
      <h1>Test Error Page</h1>
      <button onClick={() => setShouldThrow(true)}>
        에러 발생
      </button>
    </div>
  );
}