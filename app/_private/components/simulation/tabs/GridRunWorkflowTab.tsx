import {
  Accordion, AccordionItem, Button,
} from '@nextui-org/react';
import React, { useCallback } from 'react';

// Components
import ReadOnlyInput from '../inputs/ReadOnlyInput';
import ReadOnlyTextarea from '../inputs/ReadOnlyTextarea';
import FulfilledOutput from '../outputs/FulfilledOuput';
import RejectedOutput from '../outputs/RejectedOutput';

// Utils
import { getStatusColor, getStatusName } from '@/_private/utils/getStatus';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Types
import { GridTabProps, Simulation } from '@/_private/types/components/simulationTypes';

// COnstants
import { API_GRID_RUN_WORKFLOW } from '@/_private/lib/constants/apiConstants';

export default function createGridRunScriptTab(
  { dispatchSimulation, selectedSimulation }: GridTabProps,
) {
  const {
    scripts: {
      gridRunWorkflow: {
        scriptBody, scriptPath, scriptStatus, rejectedOutput, fulfilledOutput,
      },
    },
  }: Simulation = selectedSimulation;

  const handleupdateGridRunScript = useCallback((): void => {
    simulationActionCreators.updateSimulationScriptStatus(
      dispatchSimulation,
      selectedSimulation,
      'gridRunWorkflow',
      'FULFILLED',
    );
  }, [dispatchSimulation, selectedSimulation]);

  const handleRunGridSimulation = useCallback((): void => {
    simulationActionCreators.updateSimulationScriptStatus(
      dispatchSimulation,
      selectedSimulation,
      'gridRunWorkflow',
      'PENDING',
    );
    simulationActionCreators.runSimulationScript(
      dispatchSimulation,
      selectedSimulation,
      API_GRID_RUN_WORKFLOW,
    );
  }, [dispatchSimulation, selectedSimulation]);

  return (
    <>
      <Button
        className="mb-4"
        color="primary"
        isDisabled={scriptStatus === 'PENDING'}
        onClick={handleRunGridSimulation}
      >
        Run in WLCG
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
        onClick={handleupdateGridRunScript}
        isDisabled={scriptStatus === 'FULFILLED'}
      >
        Set as &apos;completed&apos;
      </Button>
      <Accordion
        isCompact
        className="my-2"
        variant="bordered"
        isDisabled={!rejectedOutput || !fulfilledOutput}
      >
        <AccordionItem
          key="1"
          aria-label="Grid run output"
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
