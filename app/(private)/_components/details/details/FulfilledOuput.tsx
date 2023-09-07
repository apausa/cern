import React from 'react';

// Types
import Link from 'next/link';
import { FulfilledOutputProps } from '@/(private)/_types/components/simulationTypes';

export default function FulfilledOutput({ fulfilledOutput }: FulfilledOutputProps) {
  return (
    <>
      <div className="mb-4">
        <p className="text-bold text-sm">Job name</p>
        <p className="text-bold">{fulfilledOutput?.gridId || 'Not available'}</p>
      </div>
      <div className="my-2">
        <p className="text-bold text-sm">WLCG URL</p>
        <p className="text-bold">
          {fulfilledOutput?.gridUrl ? (
            <Link
              as={fulfilledOutput?.gridUrl}
              href={fulfilledOutput?.gridUrl}
            >
              {fulfilledOutput?.gridUrl}
            </Link>
          ) : 'Not available'}
        </p>
      </div>
      <div className="my-2">
        <p className="text-bold text-sm">WLCG directory</p>
        <p className="text-bold">{fulfilledOutput?.gridDirectory || 'Not available'}</p>
      </div>
      <div className="my-2">
        <p className="text-bold text-sm">Local directory</p>
        <p className="text-bold">{fulfilledOutput?.localDirectory || 'Not available'}</p>
      </div>
    </>
  );
}
