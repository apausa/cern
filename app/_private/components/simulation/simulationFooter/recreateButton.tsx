import { Button } from '@nextui-org/react';
import React, { useCallback, useReducer } from 'react';
import Link from 'next/link';

// Actions
import formActionCreators from '@/_private/lib/actions/formActions';

// Reducers
import formReducer from '@/_private/lib/reducers/formReducer';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';

export default function RecreateButton(
  {
    selectedSimulation, isOpen, onClose,
  }: {
    selectedSimulation: Simulation,
    isOpen: boolean,
    onClose: () => void
  },
) {
  const [, dispatchForm] = useReducer(formReducer, null);

  const onRecreate = useCallback((): void => {
    formActionCreators.createForm(dispatchForm, selectedSimulation.form);
    if (isOpen) onClose();
  }, [selectedSimulation, isOpen]);

  return (
    <Button
      onClick={onRecreate}
      isDisabled={selectedSimulation.form.advanced}
      href="/build"
      as={Link}
      variant="light"
    >
      Recreate
    </Button>
  );
}
