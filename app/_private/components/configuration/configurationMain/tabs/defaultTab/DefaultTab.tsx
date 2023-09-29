import React, { useCallback, useMemo } from 'react';
import {
  CheckboxGroup,
  Checkbox,
  AccordionItem,
  Accordion,
} from '@nextui-org/react';

// Components
import NumberInput from './inputs/NumberInput';
import StringInput from './inputs/StringInput';

// Types
import {
  Arg, Form, FormAction, NumberArg, StringArg,
} from '@/_private/types/lib/formTypes';

// Actions
import formActionCreator from '@/_private/lib/actions/formActions';

export default function DefaultTab(
  {
    form: { createWorkflow, runWorkflow }, dispatchForm,
  }:
  {
    form: Form,
    dispatchForm: React.Dispatch<FormAction>,
  },
) {
  const getSelectedKeys = (args: Arg[]): string[] => (
    args.filter(({ selected }: Arg) => selected).map(({ name }: Arg) => name));

  // Gets all build workflow command arguments
  const buildWorkflowArgs = useMemo((): string[] => (
    getSelectedKeys(createWorkflow.args)), [createWorkflow.args]);

  // Gets all run workflow command arguments
  const runWorkflowArgs = useMemo((): string[] => (
    getSelectedKeys(runWorkflow.args)), [runWorkflow.args]);

  // Selects a build workflow command argument
  const onBuildWorkflowArgsChange = useCallback((values: string[]): void => {
    formActionCreator.updateBuildCmdSelected(dispatchForm, values);
  }, []);

  // Selects a run workflow command argument
  const onRunWorkflowArgsChange = useCallback((values: string[]): void => {
    formActionCreator.updateRunCmdSelected(dispatchForm, values);
  }, []);

  return (
    <Accordion isCompact fullWidth variant="shadow">
      <AccordionItem
        key="1"
        aria-label="Create workflow"
        title="Create workflow"
        subtitle={<span>{`${buildWorkflowArgs.length} of ${createWorkflow.args.length} argments selected`}</span>}
      >
        <CheckboxGroup
          onValueChange={onBuildWorkflowArgsChange}
          value={buildWorkflowArgs}
          color="primary"
          aria-label="Select arguments"
        >
          {createWorkflow.args.map((arg: Arg) => (
            <div key={arg.name} className="flex pb-2 flex-row justify-between rounded-lg items-center">
              <Checkbox className="basis-1/2 truncate" value={arg.name} isDisabled={arg.disabled}>
                {arg.name}
              </Checkbox>
              <div className="basis-1/2">
                {arg.input.type === 'number' && (
                <NumberInput
                  formAction={formActionCreator.updateBuildCmdValue}
                  arg={arg as NumberArg}
                  dispatchForm={dispatchForm}
                />
                )}
                {arg.input.type === 'string' && (
                <StringInput
                  formAction={formActionCreator.updateBuildCmdValue}
                  arg={arg as StringArg}
                  dispatchForm={dispatchForm}
                />
                )}
              </div>
            </div>
          ))}
        </CheckboxGroup>
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Run workflow"
        title="Run workflow"
        subtitle={<span>{`${runWorkflowArgs.length} of ${runWorkflow.args.length} argments selected`}</span>}
      >
        <CheckboxGroup
          onValueChange={onRunWorkflowArgsChange}
          value={runWorkflowArgs}
          color="primary"
          aria-label="Select arguments"
        >
          {runWorkflow.args.map((arg: Arg) => (
            <div key={arg.name} className="flex pb-2 flex-row justify-between rounded-lg items-center">
              <Checkbox className="basis-1/2 truncate" value={arg.name} isDisabled={arg.disabled}>
                {arg.name}
              </Checkbox>
              <div className="basis-1/2">
                {arg.input.type === 'number' && (
                <NumberInput
                  formAction={formActionCreator.updateRunCmdValue}
                  arg={arg as NumberArg}
                  dispatchForm={dispatchForm}
                />
                )}
                {arg.input.type === 'string' && (
                <StringInput
                  formAction={formActionCreator.updateRunCmdValue}
                  arg={arg as StringArg}
                  dispatchForm={dispatchForm}
                />
                )}
              </div>
            </div>
          ))}
        </CheckboxGroup>
      </AccordionItem>
    </Accordion>
  );
}
