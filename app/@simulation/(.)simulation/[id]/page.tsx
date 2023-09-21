'use client';

import {
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure,
} from '@nextui-org/react';
import { notFound, usePathname, useRouter } from 'next/navigation';
import React, {
  useCallback, useEffect, useMemo, useReducer, useState,
} from 'react';

// Components
import DetailsMain from '@/_private/components/details/detailsMain/DetailsMain';
import DeleteButton from '@/_private/components/details/detailsFooter/DeleteButton';
import CopyButton from '@/_private/components/details/detailsFooter/CopyButton';
import RecreateButton from '@/_private/components/details/detailsFooter/RecreateButton';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Reducers
import simulationReducer from '@/_private/lib/reducers/simulationReducer';

export default function DetailsModal(
  {
    params: { id },
  }: {
    params: { id: string }
  },
) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathName = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [simulations, dispatchSimulation] = useReducer(simulationReducer, []);

  // First, gets simulations
  useEffect((): void => {
    if (pathName.startsWith('/simulation')) {
      onOpen();
      simulationActionCreators.readAllSimulations(dispatchSimulation);
    }
  }, [pathName]);

  // Then, finds simulation
  const selectedSimulation = useMemo((): Simulation | undefined => (
    simulations.find((simulation: Simulation): boolean => simulation.id === id)
  ), [simulations, id]);

  const handleClose = useCallback((): void => {
    onClose();
    router.push('/');
  }, [router]);

  useEffect(() => {
    if (!selectedSimulation && deleted) handleClose();
    else if (loading) setLoading(false);
  }, [selectedSimulation, deleted]);

  if (deleted) return null;

  if (!loading && !selectedSimulation) return notFound();

  return (
    <Modal
      isOpen={isOpen}
      size="2xl"
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
            ? (<Spinner className="flex justify-center" />)
            : (
              <DetailsMain
                selectedSimulation={selectedSimulation as Simulation}
                dispatchSimulation={dispatchSimulation}
              />
            )}
        </ModalBody>
        <ModalFooter className="border-t border-t-neutral-800 flex justify-between">
          {(loading)
            ? (<Spinner />)
            : (
              <>
                <DeleteButton
                  selectedSimulation={selectedSimulation as Simulation}
                  dispatchSimulation={dispatchSimulation}
                  setDeleted={setDeleted}
                />
                <CopyButton />
                <RecreateButton
                  selectedSimulation={selectedSimulation as Simulation}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              </>
            )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
