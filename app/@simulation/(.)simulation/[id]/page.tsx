'use client';

import {
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure,
} from '@nextui-org/react';
import { usePathname, useRouter, notFound } from 'next/navigation';
import React, {
  useCallback, useEffect, useMemo, useReducer, useState,
} from 'react';

// Components
import SimulationMain from '@/_private/components/simulation/SimulationMain';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Reducers
import simulationReducer from '@/_private/lib/reducers/simulationReducer';
import SimulationFooter from '@/_private/components/simulation/SimulationFooter';

export default function SimulationModal(
  {
    params: { id },
  }: {
    params: { id: string }
  },
) {
  const pathName = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [simulations, dispatchSimulation] = useReducer(simulationReducer, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = useCallback((): void => {
    onClose();
    router.push('/');
  }, [router]);

  const selectedSimulation = useMemo((): Simulation | undefined => (
    simulations.find((simulation: Simulation): boolean => simulation.id === id)
  ), [simulations, id]);

  useEffect(() => {
    if (pathName.startsWith('/simulation')) {
      onOpen();
      simulationActionCreators.readAllSimulations(dispatchSimulation);
    }
  }, [pathName]);

  useEffect(() => {
    setLoading(false);
  }, [selectedSimulation]);

  if (!loading && !selectedSimulation) return notFound();

  //  Functionalities
  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      scrollBehavior="inside"
      onClose={handleClose}
      backdrop="opaque"
    >
      <ModalContent>
        <ModalHeader className="border-b border-b-neutral-800">
          <div className="pt-2">
            &apos;
            {selectedSimulation?.form.title}
            &apos;
            {' '}
            details
          </div>
        </ModalHeader>
        <ModalBody className="pb-0 gap-0">
          {(loading)
            ? (<Spinner />)
            : (
              <SimulationMain
                selectedSimulation={selectedSimulation as Simulation}
                dispatchSimulation={dispatchSimulation}
              />
            )}
        </ModalBody>
        <ModalFooter className="border-t border-t-neutral-800 flex justify-between">
          <SimulationFooter
            loading={loading}
            selectedSimulation={selectedSimulation as Simulation}
            isOpen={isOpen}
            onClose={onClose}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
