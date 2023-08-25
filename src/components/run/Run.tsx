import {
  Button, Tab, Tabs,
} from '@nextui-org/react';
import React from 'react';

// Types
import { RunProps } from '@/types/components/run';

// Actions
import formActionCreator from '@/lib/actions/form';
import metadataActionCreators from '@/lib/actions/metadata';

// Components
import ReadOnlyTextarea from './inputs/ReadOnlyTextarea';
import ReadOnlyInput from './inputs/ReadOnlyInput';

// Utils
import { getSelectedVersion } from '@/utils/getDate';
import { getStatusColor, getStatusIsDisabled, getStatusName } from '@/utils/getStatus';

export default function Run({
  selectedMetadata, setSelectedMetadata, dispatchForm, dispatchMetadata,
}: RunProps) {
  const handleRecreate = (): any => {
    setSelectedMetadata(null);
    formActionCreator.createForm(dispatchForm, selectedMetadata.form);
  };

  const handleRun = (): any => {
    metadataActionCreators.updateMetadata(dispatchMetadata, selectedMetadata);
  };

  return (
    <>
      <header className="flex justify-between p-4 border-b border-b-neutral-800">
        <div className="pt-2">Job details</div>
        <Button
          color="primary"
          onClick={handleRecreate}
        >
          Recreate
        </Button>
      </header>
      <main className="px-4 pt-2 border-b border-b-neutral-800">
        <ReadOnlyInput
          variant="bordered"
          color="default"
          label="Written title"
          value={selectedMetadata.form.title}
        />
        <ReadOnlyInput
          variant="bordered"
          color="default"
          label="Selected version"
          value={getSelectedVersion(selectedMetadata.form.selectedDate)}
        />
        <ReadOnlyTextarea
          variant="bordered"
          color="default"
          label="Written command"
          value={selectedMetadata.form.cmdStr}
        />
        <Tabs aria-label="Select environment" className="pt-2 flex flex-col">
          <Tab key="local" title="Local script" className="flex flex-col">
            <ReadOnlyInput
              color={getStatusColor(selectedMetadata.testScript.scriptStatus)}
              label="Script status"
              value={getStatusName(selectedMetadata.testScript.scriptStatus)}
              variant="flat"
            />
            <ReadOnlyInput
              color="default"
              label="Script path"
              value={selectedMetadata.testScript.scriptPath}
              variant="flat"
            />
            <ReadOnlyTextarea
              color="default"
              label="Script content"
              value={selectedMetadata.testScript.scriptBody}
              variant="flat"
            />
            <Button
              className="my-2"
              color="primary"
              isDisabled={getStatusIsDisabled(selectedMetadata.testScript.scriptStatus)}
              onClick={handleRun}
            >
              Run locally
            </Button>
          </Tab>
          <Tab key="wlcg" title="WLCG script" className="flex flex-col">
            <ReadOnlyInput
              color={getStatusColor(selectedMetadata.prodScript.scriptStatus)}
              label="Script status"
              value={getStatusName(selectedMetadata.prodScript.scriptStatus)}
              variant="flat"
            />
            <ReadOnlyInput
              color="default"
              label="Script path"
              value={selectedMetadata.prodScript.scriptPath}
              variant="flat"
            />
            <ReadOnlyTextarea
              color="default"
              label="Script content"
              value={selectedMetadata.prodScript.scriptBody}
              variant="flat"
            />
            <Button
              className="my-2"
              color="primary"
              isDisabled={getStatusIsDisabled(selectedMetadata.prodScript.scriptStatus)}
              onClick={handleRun}
            >
              Run in WLCG
            </Button>
          </Tab>
        </Tabs>
      </main>
    </>
  );
}
