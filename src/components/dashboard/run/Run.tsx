/* eslint-disable consistent-return */
import {
  Button, Divider, Textarea,
} from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { Metadata } from '@/types/dashboard';
import { getAllMetadata } from '@/lib/services/dashboard';

export default function Run({ selectedKey, handleUpdateMetadata }: any) {
  const [selectedMetadata, setSelectedMetadata]: any = useState();
  const isDisabled = (metadata: Metadata): boolean => (
    (metadata?.testScript?.scriptStatus !== 'FULFILLED' && metadata?.prodScript?.scriptStatus === null)
    || (metadata?.testScript?.scriptStatus === 'FULFILLED'
    && metadata?.prodScript?.scriptStatus !== null)
  );
  useEffect(() => {
    const parsedResponse: Metadata[] | null = getAllMetadata();
    if (parsedResponse && selectedKey) {
      setSelectedMetadata(
        parsedResponse.find((metadata: Metadata): Metadata => (selectedKey.has(metadata.id))),
      );
    }
  }, [selectedKey]);

  return (
    <>
      <header className="p-4">Run</header>
      <Divider />
      <main>
        <Textarea
          className="p-4"
          isDisabled
          label="Command"
          labelPlacement="outside"
          defaultValue={selectedMetadata?.form?.cmdStr}
        />
        <div className="flex flex-col">
          <Button
            className="m-4"
            color="primary"
            isDisabled={selectedMetadata?.testScript?.scriptStatus !== null}
            onClick={() => { handleUpdateMetadata(selectedMetadata); }}
          >
            Run in test
          </Button>
          <Button
            className="m-4"
            color="primary"
            isDisabled={isDisabled(selectedMetadata)}
            onClick={() => { handleUpdateMetadata(selectedMetadata); }}
          >
            Run in prod
          </Button>
        </div>
        <Divider />
        <div className="m-4">
          <Button
            color="default"
          >
            Fork
          </Button>
          <Button
            color="default"
          >
            Bookmark
          </Button>
        </div>
      </main>
    </>
  );
}
