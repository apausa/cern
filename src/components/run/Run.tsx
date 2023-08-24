import {
  Button, Divider, Textarea,
} from '@nextui-org/react';
import React from 'react';

// Types
import { Metadata } from '@/types/dashboard';
import { RunProps } from '@/types/run';

// Lib
import formActions from '@/lib/actions/form';
import metadataActions from '@/lib/actions/metadata';

export default function Run({ selectedMetadata, dispatchForm, dispatchMetadata }: RunProps) {
  const checkTestStatus = ({ testScript: { scriptStatus } }: Metadata): boolean => (
    scriptStatus === 'PENDING' || scriptStatus === 'FULFILLED');
  const checkProdStatus = ({ testScript, prodScript }: Metadata): boolean => (
    testScript.scriptStatus !== 'FULFILLED'
    || prodScript.scriptStatus === 'PENDING'
    || prodScript.scriptStatus === 'REJECTED'
  );

  const handleRecreate = (): any => {
    formActions.setForm(dispatchForm, selectedMetadata);
  };

  return (
    <>
      <header className="p-4">Job details</header>
      <Divider />
      <main>
        {selectedMetadata ? (
          <>
            <Textarea
              className="p-4"
              isDisabled
              label="Command"
              labelPlacement="outside"
              defaultValue={selectedMetadata.form.cmdStr}
            />
            <div className="flex flex-col">
              <Button
                className="m-4"
                color="primary"
                isDisabled={checkTestStatus(selectedMetadata)}
                onClick={() => {
                  metadataActions.updateMetadata(dispatchMetadata, selectedMetadata);
                }}
              >
                Run locally
              </Button>
              <Button
                className="m-4"
                color="primary"
                isDisabled={checkProdStatus(selectedMetadata)}
                onClick={() => {
                  metadataActions.updateMetadata(dispatchMetadata, selectedMetadata);
                }}
              >
                Run in WLCG
              </Button>
            </div>
            <Divider />
            <div className="m-4">
              <Button
                color="default"
                onClick={handleRecreate}
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
        ) : (<div>Nothing selected</div>)}
      </main>
    </>
  );
}
