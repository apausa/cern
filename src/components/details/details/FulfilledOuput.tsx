import { Link } from '@nextui-org/react';
import React from 'react';

// Types
import { FulfilledOutputProps } from '@/types/components/details';

export default function FulfilledOutput({ fulfilledOutput }: FulfilledOutputProps) {
  return (
    <>
      <div className="mb-4">
        <p className="text-bold text-sm">WLCG ID</p>
        <p className="text-bold">{fulfilledOutput?.gridId || 'Not available'}</p>
      </div>
      <div className="my-2">
        <p className="text-bold text-sm">WLCG URL</p>
        <p className="text-bold">
          {fulfilledOutput?.gridUrl ? (
            <Link
              href={fulfilledOutput?.gridUrl}
              isExternal
              showAnchorIcon
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
