'use client';

import React from 'react';
import { Metadata } from '@/types/dashboard';

export default function Run({ dashboardState, handleUpdateMetadata }: any) {
  const isDisabled = (metadata: Metadata): boolean => (
    (metadata.testScript.scriptStatus !== 'FULFILLED' && metadata.prodScript.scriptStatus === null)
    || (metadata.testScript.scriptStatus === 'FULFILLED' && metadata.prodScript.scriptStatus !== null)
  );

  return (
    <div>
      <h2 className="font-bold">Run</h2>
      <ul>
        {dashboardState && dashboardState.map((metadata: Metadata, index: number) => (
          <li key={`${index}`}>
            <br />
            <br />
            <div>{metadata.id}</div>
            <div>
              Test status  →
              {' '}
              {(metadata.testScript.scriptStatus === null) ? 'Ready' : metadata.testScript.scriptStatus}
            </div>
            <div>
              GRID status  →
              {' '}
              {(metadata.testScript.scriptStatus !== 'FULFILLED')
                ? 'Not ready'
                : (metadata.prodScript.scriptStatus === null) ? 'Ready' : metadata.prodScript.scriptStatus}
            </div>
            <br />
            <button
              type="button"
              disabled={isDisabled(metadata)}
              onClick={() => { handleUpdateMetadata(metadata); }}
            >
              [BUTTON] Run in GRID
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
