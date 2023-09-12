import React from 'react';

export default function StderrData(
  { stderrData }:
  { stderrData: string },
) {
  return (
    <div className="my-2">
      <p className="text-bold">{stderrData}</p>
    </div>
  );
}
