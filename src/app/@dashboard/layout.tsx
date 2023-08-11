import React from 'react';

export default function Layout({
  build,
  monitor,
  run,
}: {
  build: React.ReactNode,
  monitor: React.ReactNode,
  run: React.ReactNode
}) {
  return (
    <main className="columns-1 md:columns-3">
      {build}
      {monitor}
      {run}
    </main>
  );
}
