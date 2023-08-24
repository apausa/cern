import {
  Button, Divider, Textarea,
} from '@nextui-org/react';
import React from 'react';

// Types
import { Metadata } from '@/types/lib';
import { RunProps } from '@/types/components/run';

// Lib
import formActionCreator from '@/lib/actions/form';
import metadataActionCreators from '@/lib/actions/metadata';

export default function Run({
  selectedMetadata, setSelectedMetadata, dispatchForm, dispatchMetadata,
}: RunProps) {
  const checkTestStatus = ({ testScript: { scriptStatus } }: Metadata): boolean => (
    scriptStatus === 'PENDING' || scriptStatus === 'FULFILLED');
  const checkProdStatus = ({ testScript, prodScript }: Metadata): boolean => (
    testScript.scriptStatus !== 'FULFILLED'
    || prodScript.scriptStatus === 'PENDING'
    || prodScript.scriptStatus === 'REJECTED'
  );

  const handleRecreate = (): any => {
    setSelectedMetadata(null);
    formActionCreator.createForm(dispatchForm, selectedMetadata.form);
  };

  return (
    <>
      <header className="p-6">Job details</header>
      <Divider />
      <main>
        {selectedMetadata ? (
          <>
            <Textarea
              className="p-4"
              isReadOnly
              variant="bordered"
              label="Command"
              labelPlacement="outside"
              value={selectedMetadata.form.cmdStr}
            />
            <div className="flex flex-col">
              <Button
                className="m-4"
                color="primary"
                isDisabled={checkTestStatus(selectedMetadata)}
                onClick={() => {
                  metadataActionCreators.updateMetadata(dispatchMetadata, selectedMetadata);
                }}
              >
                Run locally
              </Button>
              <Button
                className="m-4"
                color="primary"
                isDisabled={checkProdStatus(selectedMetadata)}
                onClick={() => {
                  metadataActionCreators.updateMetadata(dispatchMetadata, selectedMetadata);
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
