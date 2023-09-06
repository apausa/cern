import React from 'react';

// Types
import { RejectedOutputProps } from '@/(private)/_types/components/simulationTypes';

export default function RejectedOutput({ rejectedOutput }: RejectedOutputProps) {
  return (
    <div className="my-2">
      <p className="text-bold text-sm">Error reason</p>
      <p className="text-bold">{rejectedOutput}</p>
    </div>
  );
}
