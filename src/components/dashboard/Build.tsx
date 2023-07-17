'use client';

import React from 'react';

export default async function Build({ handleClick }: any) {
  return (
    <div className="pt-20 pl-4 h-screen border-l-2">
      <h2 className="font-bold">Build</h2>
      <button
        type="button"
        className="button"
        onClick={() => handleClick}
      >
        Run simulation

      </button>
    </div>
  );
}
