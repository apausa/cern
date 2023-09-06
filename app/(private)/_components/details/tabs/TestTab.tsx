import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import React from 'react';

// Components
import ReadOnlyInput from '../details/ReadOnlyInput';
import ReadOnlyTextarea from '../details/ReadOnlyTextarea';
import RejectedOutput from '../details/RejectedOutput';

// Utils
import { getStatusColor, getStatusName } from '@/(private)/_utils/getStatus';

// State
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';

// Types
import { TestTabProps } from '@/(private)/_types/components/simulationTypes';

export default function TestTab({ dispatchSimulation, selectedSimulation }: TestTabProps) {
  const {
    testScript: {
      scriptBody, scriptPath, scriptStatus, rejectedOutput,
    },
  } = selectedSimulation;

  const handleUpdateSimulationTestStatus = (): void => {
    simulationActionCreators.updateSimulationTestStatus(dispatchSimulation, selectedSimulation, 'FULFILLED');
  };

  const handleUpdateSimulationInTest = (): void => {
    simulationActionCreators.updateSimulationTestStatus(dispatchSimulation, selectedSimulation, 'PENDING');
    simulationActionCreators.executeSimulationInTest(dispatchSimulation, selectedSimulation);
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
        isDisabled={scriptStatus === 'FULFILLED'}
        onClick={handleUpdateSimulationTestStatus}
      >
        Set as &apos;completed&apos;
      </Button>
      <Button
        className="my-2"
        color="primary"
        isDisabled={scriptStatus === 'PENDING'}
        onClick={handleUpdateSimulationInTest}
      >
        Run locally
      </Button>
      <Accordion isCompact className="my-2" variant="bordered" isDisabled={!rejectedOutput}>
        <AccordionItem key="1" aria-label="Test output" title="Outputs">
          <RejectedOutput rejectedOutput={rejectedOutput} />
        </AccordionItem>
      </Accordion>
    </>
  );
}
