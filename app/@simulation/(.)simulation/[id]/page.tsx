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

  // Gets all configured jobs
  useEffect((): void => {
    if (pathName.startsWith('/simulation')) {
      simulationActionCreators.readAllSimulations(dispatchSimulation);
      onOpen();
    }
  }, [pathName]);

  // Finds job by query
  const selectedSimulation = useMemo((): Simulation | undefined => (
    simulations.find((simulation: Simulation): boolean => simulation.id === id)
  ), [simulations, id]);

  const handleClose = useCallback((): void => {
    onClose();
    router.push('/');
  }, [router]);

  // When job is deleted or assigned a value
  useEffect(() => {
    // If job is deleted, closes modal
    if (!selectedSimulation && deleted) handleClose();
    // If job is assigned a value, stops loading
    else if (loading) setLoading(false);
  }, [selectedSimulation, deleted]);

  // If job is deleted, does not render page
  if (deleted) return null;

  // If job is undefined, redirects to not found
  if (!loading && !selectedSimulation) return notFound();

  // Else, renders page
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
