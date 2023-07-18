import React from 'react';

// @todo: delete functionality

export default async function Test({ simulations }: any) {
  return (
    <div className="pt-20 pl-4 h-screen border-l-2">
      <h2 className="font-bold">Test</h2>
      <ul>
        {
        simulations.map((simulation: any, index: number) => (
          <li>
            <div>{index}</div>
            <div>{simulation.date}</div>
            <div>{simulation.status}</div>
          </li>
        ))
        }

      </ul>
    </div>
  );
}
