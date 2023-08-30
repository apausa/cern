import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import React from 'react';

// Components
import ReadOnlyInput from '../details/ReadOnlyInput';
import ReadOnlyTextarea from '../details/ReadOnlyTextarea';

// Utils
import { getStatusColor, getStatusName } from '@/utils/getStatus';

// State
import metadataActionCreators from '@/lib/state/actions/metadata';

// Types
import { TestTabProps } from '@/types/components/details';
import RejectedOutput from '../details/RejectedOutput';

export default function TestTab({ dispatchMetadata, selectedMetadata }: TestTabProps) {
  const {
    testScript: {
      scriptBody, scriptPath, scriptStatus, rejectedOutput,
    },
  } = selectedMetadata;

  const handleUpdateMetadataTestStatus = (): void => {
    metadataActionCreators.updateMetadataTestStatus(dispatchMetadata, selectedMetadata, 'FULFILLED');
  };

  const handleUpdateMetadataInTest = (): void => {
    metadataActionCreators.updateMetadataTestStatus(dispatchMetadata, selectedMetadata, 'PENDING');
    metadataActionCreators.executeMetadataInTest(dispatchMetadata, selectedMetadata);
  };

  return (
    <>
      <ReadOnlyTextarea
        color="default"
        label="Script content"
        value={scriptBody}
        variant="flat"
      />
      <ReadOnlyInput
        color="default"
        label="Script path"
        value={scriptPath}
        variant="flat"
      />
      <ReadOnlyInput
        color={getStatusColor(scriptStatus)}
        label="Script status"
        value={getStatusName(scriptStatus)}
        variant="flat"
      />
      <Button
        className="my-2"
        color="primary"
        isDisabled={scriptStatus === 'PENDING'}
        onClick={handleUpdateMetadataInTest}
      >
        Run locally
      </Button>
      <Button
        className="my-2"
        isDisabled={scriptStatus === 'FULFILLED'}
        onClick={handleUpdateMetadataTestStatus}
      >
        Set as &apos;completed&apos;
      </Button>
      <Accordion isCompact className="my-2" variant="bordered" isDisabled={!rejectedOutput}>
        <AccordionItem key="1" aria-label="Test output" title="Outputs">
          <RejectedOutput rejectedOutput={rejectedOutput} />
        </AccordionItem>
      </Accordion>
    </>
  );
}
