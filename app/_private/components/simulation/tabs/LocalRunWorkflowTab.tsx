import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import React, { useCallback } from 'react';

// Components
import ReadOnlyInput from '../inputs/ReadOnlyInput';
import ReadOnlyTextarea from '../inputs/ReadOnlyTextarea';
import RejectedOutput from '../outputs/RejectedOutput';

// Utils
import { getStatusColor, getStatusName } from '@/_private/utils/getStatus';

// State
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Types
import { Simulation, TestTabProps } from '@/_private/types/components/simulationTypes';

// Constants
import { API_LOCAL_RUN_WORKFLOW } from '@/_private/lib/constants/apiConstants';
import FulfilledOutput from '../outputs/FulfilledOuput';

export default function createlocalRunWorkflowScriptTab(
  { dispatchSimulation, selectedSimulation }: TestTabProps,
) {
  const {
    scripts: {
      localRunWorkflow: {
        scriptBody, scriptPath, scriptStatus, rejectedOutput, fulfilledOutput,
      },
    },
  }: Simulation = selectedSimulation;

  const handleUpdateSimulationStatus = useCallback((): void => {
    simulationActionCreators.updateSimulationScriptStatus(
      dispatchSimulation,
      selectedSimulation,
      'localRunWorkflow',
      'FULFILLED',
    );
  }, [dispatchSimulation, selectedSimulation]);

  const handleRunTestSimulation = useCallback((): void => {
    simulationActionCreators.updateSimulationScriptStatus(
      dispatchSimulation,
      selectedSimulation,
      'localRunWorkflow',
      'PENDING',
    );
    simulationActionCreators.runSimulationScript(
      dispatchSimulation,
      selectedSimulation,
      API_LOCAL_RUN_WORKFLOW,
    );
  }, [dispatchSimulation, selectedSimulation]);

  return (
    <>
      <Button
        className="mb-4"
        color="primary"
        isDisabled={scriptStatus === 'PENDING'}
        onClick={handleRunTestSimulation}
      >
        Run locally
      </Button>
      <ReadOnlyTextarea
        color="default"
        label="Content"
        value={scriptBody}
        variant="bordered"
      />
      <ReadOnlyInput
        color="default"
        label="Path"
        value={scriptPath}
        variant="bordered"
      />
      <ReadOnlyInput
        color={getStatusColor(scriptStatus)}
        label="Status"
        value={getStatusName(scriptStatus)}
        variant="bordered"
      />
      <Button
        className="my-2"
        isDisabled={scriptStatus === 'FULFILLED'}
        onClick={handleUpdateSimulationStatus}
      >
        Set as &apos;completed&apos;
      </Button>
      <Accordion isCompact className="my-2" variant="bordered">
        <AccordionItem
          key="1"
          aria-label="Local run output"
          title="Output"
          isDisabled={!rejectedOutput || !fulfilledOutput}
        >
          {rejectedOutput
            ? (<RejectedOutput rejectedOutput={rejectedOutput} />)
            : (<FulfilledOutput fulfilledOutput={fulfilledOutput} />)}
        </AccordionItem>
      </Accordion>
    </>
  );
}
