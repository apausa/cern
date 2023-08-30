import React from 'react';

// Types
import { RejectedOutputProps } from '@/types/components/details';

export default function RejectedOutput({ rejectedOutput }: RejectedOutputProps) {
  return (
    <div className="my-2">
      <p className="text-bold text-tiny capitalize text-default-400">Error reason</p>
      <p className="text-bold text-small">{rejectedOutput}</p>
    </div>
  );
}
