'use client';

import {
  Button,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure,
} from '@nextui-org/react';
import React, {
  useCallback, useReducer, useEffect, useState,
} from 'react';
import { notFound, usePathname, useRouter } from 'next/navigation';

// Components
import Form from '@/(private)/_components/build/Form';

// Constants
import INITIAL_FORM from '@/(private)/_lib/constants/formConstants';

// Types
import { UseReducer } from '@/(private)/_types/components/simulationTypes';
import { FormUseReducer } from '@/(private)/_types/components/formTypes';

// Reducers
import formReducer from '@/(private)/_lib/reducers/formReducer';
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';

// Actions
import formActionCreators from '@/(private)/_lib/actions/formActions';
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';

export default function BuildModal() {
  // Next.js hooks
  const pathName: string = usePathname();
  const router = useRouter();

  // Modal state hooks and functions
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClose = useCallback((): void => {
    onClose();
    router.push('/');
  }, [router]);

  // Other hooks and functions
  const [loading, setLoading]: any = useState(true);
  const [, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, null);

  const onStage = useCallback(async (): Promise<void> => {
    await simulationActionCreators.createSimulation(dispatchSimulation, form);
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
    handleClose();
  }, [form]);

  const onReset = useCallback((): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
  }, []);

  useEffect(() => {
    if (pathName === '/build') {
      simulationActionCreators.readAllSimulations(dispatchSimulation);
      formActionCreators.readForm(dispatchForm);
      onOpen();
    }
  }, [pathName]);

  useEffect(() => {
    if (form) setLoading(false);
  }, [form]);

  if (!loading && !form) return notFound();

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
          <div className="pt-2">Job configuration</div>
        </ModalHeader>
        <ModalBody className="gap-0">
          <Form form={form} dispatchForm={dispatchForm} />
        </ModalBody>
        <ModalFooter className="border-t border-t-neutral-800 flex justify-between">
          <Button
            onClick={onReset}
          >
            Reset
          </Button>
          <Button
            color="primary"
            onClick={onStage}
          >
            Stage
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
