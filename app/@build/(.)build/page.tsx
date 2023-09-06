'use client';

import {
  Button,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
} from '@nextui-org/react';
import React, { useCallback, useReducer } from 'react';

// Components
import Link from 'next/link';
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
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  const router = useRouter();

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  const onStage = (): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
    simulationActionCreators.createSimulation(dispatchSimulation, form);
    onClose();
  };

  const onReset = (): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
  };

  return (
    <Modal
      defaultOpen
      size="xl"
      scrollBehavior="inside"
      onClose={onClose}
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
            variant="light"
          >
            Reset
          </Button>
          <Button
            href="/"
            as={Link}
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
