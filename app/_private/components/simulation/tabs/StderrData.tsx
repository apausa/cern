import React from 'react';

// Types
import { StderrDataProps } from '@/_private/types/components/simulationTypes';

export default function StderrData({ stderrData }: StderrDataProps) {
  return (
    <div className="my-2">
      <p className="text-bold">{stderrData}</p>
    </div>
  );
}
