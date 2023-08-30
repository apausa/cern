import {
  Accordion, AccordionItem, Button,
} from '@nextui-org/react';
import React from 'react';

// Components
import ReadOnlyInput from '../details/ReadOnlyInput';
import ReadOnlyTextarea from '../details/ReadOnlyTextarea';
import FulfilledOutput from '../details/FulfilledOuput';
import RejectedOutput from '../details/RejectedOutput';

// Utils
import { getStatusColor, getStatusName } from '@/utils/getStatus';

// State
import metadataActionCreators from '@/lib/state/actions/metadata';

// Types
import { GridTabProps } from '@/types/components/details';

export default function GridTab({ dispatchMetadata, selectedMetadata }: GridTabProps) {
  const {
    gridScript: {
      scriptBody, scriptPath, scriptStatus, rejectedOutput, fulfilledOutput,
    },
  } = selectedMetadata;

  const handleUpdateMetadataGridStatus = (): void => {
    metadataActionCreators.updateMetadataGridStatus(dispatchMetadata, selectedMetadata, 'FULFILLED');
  };

  const handleUpdateMetadataInGrid = (): void => {
    metadataActionCreators.updateMetadataGridStatus(dispatchMetadata, selectedMetadata, 'PENDING');
    metadataActionCreators.executeMetadataInGrid(dispatchMetadata, selectedMetadata);
  };

  return (
    <>
      <ReadOnlyTextarea
        color="default"
        label="Content"
        value={scriptBody}
        variant="flat"
      />
      <ReadOnlyInput
        color="default"
        label="Path"
        value={scriptPath}
        variant="flat"
      />
      <ReadOnlyInput
        color={getStatusColor(scriptStatus)}
        label="Status"
        value={getStatusName(scriptStatus)}
        variant="flat"
      />
      <Button
        className="my-2"
        onClick={handleUpdateMetadataGridStatus}
        isDisabled={scriptStatus === 'FULFILLED'}
      >
        Set as &apos;completed&apos;
      </Button>
      <Button
        className="my-2"
        color="primary"
        isDisabled={scriptStatus === 'PENDING'}
        onClick={handleUpdateMetadataInGrid}
      >
        Run in WLCG
      </Button>
      <Accordion isCompact className="my-2" variant="bordered" isDisabled={scriptStatus !== 'FULFILLED' && scriptStatus !== 'REJECTED'}>
        <AccordionItem key="1" aria-label="Grid output" title="Outputs">
          {rejectedOutput && <RejectedOutput rejectedOutput={rejectedOutput} />}
          {scriptStatus === 'FULFILLED' && <FulfilledOutput fulfilledOutput={fulfilledOutput} />}
        </AccordionItem>
      </Accordion>
    </>
  );
}
