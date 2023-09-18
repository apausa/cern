import React, { useCallback } from 'react';

import { Button } from '@nextui-org/react';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Types
import { Simulation, SimulationAction } from '@/_private/types/lib/simulationTypes';

export default function DeleteButton(
  {
    dispatchSimulation, setDeleted, selectedSimulation,
  }: {
    dispatchSimulation: React.Dispatch<SimulationAction>,
    setDeleted: React.Dispatch<React.SetStateAction<boolean>>
    selectedSimulation: Simulation,
  },
) {
  const onDelete = useCallback((): void => {
    simulationActionCreators.deleteSimulation(dispatchSimulation, selectedSimulation.id);
    setDeleted(true);
  }, [selectedSimulation]);

  return (
    <Button
      onClick={onDelete}
      variant="light"
      color="danger"
    >
      Delete
    </Button>
  );
}
