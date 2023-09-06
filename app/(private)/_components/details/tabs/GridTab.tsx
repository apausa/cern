import {
  Accordion, AccordionItem, Button,
} from '@nextui-org/react';
import React, { useCallback } from 'react';

// Components
import ReadOnlyInput from '../details/ReadOnlyInput';
import ReadOnlyTextarea from '../details/ReadOnlyTextarea';
import FulfilledOutput from '../details/FulfilledOuput';
import RejectedOutput from '../details/RejectedOutput';

// Utils
import { getStatusColor, getStatusName } from '@/(private)/_utils/getStatus';

// Actions
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';

// Types
import { GridTabProps, Simulation } from '@/(private)/_types/components/simulationTypes';

export default function GridTab({ dispatchSimulation, selectedSimulation }: GridTabProps) {
  const {
    gridScript: {
      scriptBody, scriptPath, scriptStatus, rejectedOutput, fulfilledOutput,
    },
  }: Simulation = selectedSimulation;

  const handleUpdateSimulationGridStatus = useCallback((): void => {
    simulationActionCreators.updateSimulationGridStatus(dispatchSimulation, selectedSimulation, 'FULFILLED');
  }, [dispatchSimulation, selectedSimulation]);

  const handleUpdateSimulationInGrid = useCallback((): void => {
    simulationActionCreators.updateSimulationGridStatus(dispatchSimulation, selectedSimulation, 'PENDING');
    simulationActionCreators.executeSimulationInGrid(dispatchSimulation, selectedSimulation);
  }, [dispatchSimulation, selectedSimulation]);

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
        onClick={handleUpdateSimulationGridStatus}
        isDisabled={scriptStatus === 'FULFILLED'}
      >
        Set as &apos;completed&apos;
      </Button>
      <Button
        className="my-2"
        color="primary"
        isDisabled={scriptStatus === 'PENDING'}
        onClick={handleUpdateSimulationInGrid}
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
