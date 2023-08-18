'use client';

import React from 'react';
import { Button, Divider } from '@nextui-org/react';

import { Metadata } from '@/types/dashboard';

export default function Run({ dashboardState, handleUpdateMetadata }: any) {
  const isDisabled = (metadata: Metadata): boolean => (
    (metadata.testScript.scriptStatus !== 'FULFILLED' && metadata.prodScript.scriptStatus === null)
    || (metadata.testScript.scriptStatus === 'FULFILLED' && metadata.prodScript.scriptStatus !== null)
  );

  return (
    <div>
      <h2 className="font-bold">Timeline</h2>
      <Divider />
      <ul>
        {dashboardState && dashboardState.map((metadata: Metadata) => (
          <li key={metadata.id}>
            <div>{metadata.id}</div>
            <div>
              <div>
                Test status  →
                {' '}
                {(metadata.testScript.scriptStatus === null) ? 'Ready' : metadata.testScript.scriptStatus}
              </div>
              <Button
                color="primary"
                isDisabled={metadata.testScript.scriptStatus !== null}
                onClick={() => { handleUpdateMetadata(metadata); }}
              >
                Run in test
              </Button>
            </div>
            <div>
              <div>
                Prod status  →
                {' '}
                {(metadata.testScript.scriptStatus !== 'FULFILLED')
                  ? 'Not ready'
                  : (metadata.prodScript.scriptStatus === null) ? 'Ready' : metadata.prodScript.scriptStatus}
              </div>
              <Button
                color="primary"
                isDisabled={isDisabled(metadata)}
                onClick={() => { handleUpdateMetadata(metadata); }}
              >
                Run in prod
              </Button>
            </div>
            <Divider />
          </li>
        ))}
      </ul>
    </div>
  );
}
