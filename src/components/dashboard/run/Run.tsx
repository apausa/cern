import {
  Button, Divider, Textarea,
} from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

// Types
import { Metadata } from '@/types/dashboard';
import { RunProps } from '@/types/run';

// Lib
import { getAllMetadata } from '@/lib/services/dashboard';

export default function Run({ selectedKey, handleUpdateMetadata }: RunProps) {
  const [selectedMetadata, setSelectedMetadata]: any = useState(null);

  const checkTestStatus = ({ testScript: { scriptStatus } }: Metadata): boolean => (
    scriptStatus === 'PENDING' || scriptStatus === 'FULFILLED');
  const checkProdStatus = ({ testScript, prodScript }: Metadata): boolean => (
    testScript.scriptStatus !== 'FULFILLED'
    || prodScript.scriptStatus === 'PENDING'
    || prodScript.scriptStatus === 'REJECTED'
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
        {selectedMetadata && (
          <>
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
                isDisabled={checkTestStatus(selectedMetadata)}
                onClick={() => { handleUpdateMetadata(selectedMetadata); }}
              >
                Run locally
              </Button>
              <Button
                className="m-4"
                color="primary"
                isDisabled={checkProdStatus(selectedMetadata)}
                onClick={() => { handleUpdateMetadata(selectedMetadata); }}
              >
                Run in WLCG
              </Button>
            </div>
            <Divider />
            <div className="m-4">
              <Button
                color="default"
              >
                Recreate
              </Button>
              <Button
                color="default"
              >
                Star
              </Button>
            </div>

          </>
        )}
      </main>
    </>
  );
}
