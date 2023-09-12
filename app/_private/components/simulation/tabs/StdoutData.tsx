import React from 'react';

// Types
import { StdoutDataProps } from '@/_private/types/components/simulationTypes';

export default function StdoutData({ stdoutData }: StdoutDataProps) {
  return (
    <div className="my-2">
      <p className="text-bold">{stdoutData}</p>
    </div>
  );
}
