import { Link } from '@nextui-org/react';
import React from 'react';

// Types
import { FulfilledOutputProps } from '@/types/components/details';

export default function FulfilledOutput({ fulfilledOutput }: FulfilledOutputProps) {
  return (
    <>
      <div className="mb-2">
        <p className="text-bold text-tiny">WLCG ID</p>
        <p className="text-bold text-small">{fulfilledOutput?.gridId}</p>
      </div>
      <div className="my-2">
        <p className="text-bold text-tiny">WLCG URL</p>
        <p className="text-bold text-small">
          <Link
            href={fulfilledOutput?.gridUrl}
            isExternal
            showAnchorIcon
          >
            {fulfilledOutput?.gridUrl}
          </Link>
        </p>
      </div>
      <div className="my-2">
        <p className="text-bold text-tiny">WLCG directory</p>
        <p className="text-bold text-small">{fulfilledOutput?.gridDirectory}</p>
      </div>
      <div className="my-2">
        <p className="text-bold text-tiny">Local directory</p>
        <p className="text-bold text-small">{fulfilledOutput?.localDirectory}</p>
      </div>
    </>
  );
}
