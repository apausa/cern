import React from 'react';

export default function StdoutData(
  { stdoutData }:
  { stdoutData: string },
) {
  return (
    <div className="my-2">
      <p className="text-bold">{stdoutData}</p>
    </div>
  );
}
