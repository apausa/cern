'use client';

import {
  Button,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
} from '@nextui-org/react';
import React, {
  useCallback, useEffect, useReducer,
} from 'react';

// Components
import { useRouter } from 'next/navigation';
import Form from '@/(private)/_components/build/Form';

// Constants
import INITIAL_FORM from '@/(private)/_lib/constants/formConstants';

// Types
import { FormUseReducer } from '@/(private)/_types/components/formTypes';

// Reducer
import formReducer from '@/(private)/_lib/reducers/formReducer';
import { UseReducer } from '@/(private)/_types/components/simulationTypes';
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';
import formActionCreators from '@/(private)/_lib/actions/formActions';
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';

export default function BuildModal() {
  const [, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);
  const router = useRouter();

  const handleClose = useCallback((): void => {
    router.push('/');
  }, [router]);

  const onStage = useCallback(async (): Promise<void> => {
    await simulationActionCreators.createSimulation(dispatchSimulation, form);
    router.push('/');
  }, [form]);

  const onReset = useCallback((): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
  }, []);

  useEffect((): void => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  // @develop, form does not after beign closed for the first time
  // @develop, save form in local storage

  return (
    <Modal
      defaultOpen
      size="xl"
      scrollBehavior="inside"
      onClose={handleClose}
      backdrop="opaque"
    >
      <ModalContent>
        <ModalHeader className="border-b border-b-neutral-800">
          <div className="pt-2">Job configuration</div>
        </ModalHeader>
        <ModalBody className="pt-4">
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
