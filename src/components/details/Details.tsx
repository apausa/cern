import {
  Accordion,
  AccordionItem,
  Button, Link, Tab, Tabs,
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
import { getStatusColor, getStatusName } from '@/utils/getStatus';
import tableActionCreators from '@/lib/state/actions/table';

export default function Details({
  selectedMetadata, dispatchForm, dispatchMetadata, dispatchTable,
}: RunProps) {
  // @develop, refactor details component

  const handleCreateForm = (): void => {
    tableActionCreators.updateSelectedKey(dispatchTable, new Set(['']));
    formActionCreator.createForm(dispatchForm, selectedMetadata.form);
  };

  const handleUpdateMetadataTestStatus = (): void => {
    metadataActionCreators.updateMetadataTestStatus(dispatchMetadata, selectedMetadata, 'FULFILLED');
  };

  const handleUpdateMetadataGridStatus = (): void => {
    metadataActionCreators.updateMetadataGridStatus(dispatchMetadata, selectedMetadata, 'FULFILLED');
  };

  const handleUpdateMetadataInGrid = (): void => {
    metadataActionCreators.updateMetadataGridStatus(dispatchMetadata, selectedMetadata, 'PENDING');
    metadataActionCreators.executeMetadataInGrid(dispatchMetadata, selectedMetadata);
  };

  const handleUpdateMetadataInTest = (): void => {
    metadataActionCreators.updateMetadataTestStatus(dispatchMetadata, selectedMetadata, 'PENDING');
    metadataActionCreators.executeMetadataInTest(dispatchMetadata, selectedMetadata);
  };

  return (
    <>
      <header className="pl-4 pr-8 py-5 border-b border-b-neutral-800">
        <div className="pt-2">Job details</div>
      </header>
      <main className="pl-4 pr-8 pt-4 border-b border-b-neutral-800">
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
        <Tabs aria-label="Select environment" className="pt-2 flex flex-col">
          <Tab key="local" title="Local script" className="flex flex-col">
            <ReadOnlyTextarea
              color="default"
              label="Script content"
              value={selectedMetadata.testScript.scriptBody}
              variant="flat"
            />
            <ReadOnlyInput
              color="default"
              label="Script path"
              value={selectedMetadata.testScript.scriptPath}
              variant="flat"
            />
            <ReadOnlyInput
              color={getStatusColor(selectedMetadata.testScript.scriptStatus)}
              label="Script status"
              value={getStatusName(selectedMetadata.testScript.scriptStatus)}
              variant="flat"
            />
            <Button
              className="my-2"
              color="primary"
              isDisabled={selectedMetadata.testScript.scriptStatus === 'PENDING'}
              onClick={handleUpdateMetadataInTest}
            >
              Run locally
            </Button>
            <Button
              className="my-2"
              isDisabled={selectedMetadata.testScript.scriptStatus === 'FULFILLED'}
              onClick={handleUpdateMetadataTestStatus}
            >
              Set as &apos;completed&apos;
            </Button>
          </Tab>
          <Tab key="wlcg" title="WLCG script" className="flex flex-col">
            <ReadOnlyTextarea
              color="default"
              label="Script content"
              value={selectedMetadata.gridScript.scriptBody}
              variant="flat"
            />
            <ReadOnlyInput
              color="default"
              label="Script path"
              value={selectedMetadata.gridScript.scriptPath}
              variant="flat"
            />
            <ReadOnlyInput
              color={getStatusColor(selectedMetadata.gridScript.scriptStatus)}
              label="Script status"
              value={getStatusName(selectedMetadata.gridScript.scriptStatus)}
              variant="flat"
            />
            <Accordion isCompact fullWidth className="py-2" variant="splitted" defaultExpandedKeys={['1']}>
              <AccordionItem key="1" aria-label="Output" title="Output">
                {selectedMetadata.gridScript.scriptStatus === 'FULFILLED' && (
                <>
                  <div className="pb-2">
                    <p className="text-bold text-tiny capitalize text-default-400">WLCG ID</p>
                    <p className="text-bold text-small">{selectedMetadata.gridScript.outputs?.gridId}</p>
                  </div>
                  <div className="py-2">
                    <p className="text-bold text-tiny capitalize text-default-400">WLCG URL</p>
                    <p className="text-bold text-small">
                      <Link
                        href={selectedMetadata.gridScript.outputs?.gridUrl}
                        isExternal
                        showAnchorIcon
                      >
                        {selectedMetadata.gridScript.outputs?.gridUrl}
                      </Link>
                    </p>
                  </div>
                  <div className="py-2">
                    <p className="text-bold text-tiny capitalize text-default-400">WLCG directory</p>
                    <p className="text-bold text-small">{selectedMetadata.gridScript.outputs?.gridDirectory}</p>
                  </div>
                  <div className="py-2">
                    <p className="text-bold text-tiny capitalize text-default-400">Local directory</p>
                    <p className="text-bold text-small">{selectedMetadata.gridScript.outputs?.localDirectory}</p>
                  </div>
                </>
                )}
                {selectedMetadata.gridScript.scriptStatus === 'REJECTED' && (
                <div className="py-2">
                  <p className="text-bold text-tiny capitalize text-default-400">Error reason</p>
                  <p className="text-bold text-small">{selectedMetadata.testScript.error}</p>
                </div>
                )}
              </AccordionItem>
            </Accordion>
            <Button
              className="my-2"
              color="primary"
              isDisabled={selectedMetadata.gridScript.scriptStatus === 'PENDING'}
              onClick={handleUpdateMetadataInGrid}
            >
              Run in WLCG
            </Button>
            <Button
              className="my-2"
              onClick={handleUpdateMetadataGridStatus}
              isDisabled={selectedMetadata.gridScript.scriptStatus === 'FULFILLED'}
            >
              Set as &apos;completed&apos;
            </Button>
          </Tab>
        </Tabs>
      </main>
      <footer className="pl-4 pr-8 py-4 flex flex-col">
        <Button onClick={handleCreateForm}>Recreate</Button>
      </footer>
    </>
  );
}
