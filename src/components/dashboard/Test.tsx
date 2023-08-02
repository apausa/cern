import React from 'react';

// @todo: delete functionality

export default function Test({ dashboardState }: any) {
  return (
    <div className="pt-20 pl-4 h-screen border-l-2">
      <h2 className="font-bold">Test</h2>
      <li>
        {dashboardState && dashboardState.map((simulation: any, index: number) => (
          <ul key={`${index}`}>
            <div>{simulation.date}</div>
            <div>{simulation.status}</div>
          </ul>
        ))}
      </li>
    </div>
  );
}
