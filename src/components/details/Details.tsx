import {
  Button, Tab, Tabs,
} from '@nextui-org/react';
import React from 'react';

// Types
import { RunProps } from '@/types/components/details';

// Actions
import formActionCreator from '@/lib/state/actions/form';
import metadataActionCreators from '@/lib/state/actions/metadata';

// Components
import ReadOnlyTextarea from './inputs/ReadOnlyTextarea';
import ReadOnlyInput from './inputs/ReadOnlyInput';

// Utils
import { getSelectedVersion } from '@/utils/getDate';
import { getStatusColor, getStatusIsDisabled, getStatusName } from '@/utils/getStatus';
import tableActionCreators from '@/lib/state/actions/table';

export default function Details({
  selectedMetadata, dispatchForm, dispatchMetadata, dispatchTable,
}: RunProps) {
  const handleRecreate = (): any => {
    tableActionCreators.updateSelectedKey(dispatchTable, new Set(['']));
    formActionCreator.createForm(dispatchForm, selectedMetadata.form);
  };

  const handleRunInGrid = (): any => {
    metadataActionCreators.updateMetadataInGrid(dispatchMetadata, selectedMetadata);
  };

  const handleRunInTest = (): any => {
    metadataActionCreators.updateMetadataInTest(dispatchMetadata, selectedMetadata);
  };

  return (
    <>
      <header className="px-4 py-5 border-b border-b-neutral-800">
        <div className="pt-2">Job details</div>
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
              onClick={handleRunInTest}
            >
              Run locally
            </Button>
          </Tab>
          <Tab key="wlcg" title="WLCG script" className="flex flex-col">
            <ReadOnlyInput
              color={getStatusColor(selectedMetadata.gridScript.scriptStatus)}
              label="Script status"
              value={getStatusName(selectedMetadata.gridScript.scriptStatus)}
              variant="flat"
            />
            <ReadOnlyInput
              color="default"
              label="Script path"
              value={selectedMetadata.gridScript.scriptPath}
              variant="flat"
            />
            <ReadOnlyTextarea
              color="default"
              label="Script content"
              value={selectedMetadata.gridScript.scriptBody}
              variant="flat"
            />
            <Button
              className="my-2"
              color="primary"
              isDisabled={getStatusIsDisabled(selectedMetadata.gridScript.scriptStatus)}
              onClick={handleRunInGrid}
            >
              Run in WLCG
            </Button>
          </Tab>
        </Tabs>
      </main>
      <footer className="p-4 flex flex-col">
        <Button
          color="default"
          onClick={handleRecreate}

        >
          Recreate
        </Button>
      </footer>
    </>
  );
}
