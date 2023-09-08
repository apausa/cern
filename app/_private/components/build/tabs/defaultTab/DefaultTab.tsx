import React, { ReactElement, useCallback, useMemo } from 'react';
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
  Arg, DefaultModeProps, NumberArg, StringArg,
} from '@/_private/types/components/formTypes';

// Actions
import formActionCreator from '@/_private/lib/actions/formActions';

export default function DefaultMode(
  { form: { buildCmd, runCmd }, dispatchForm }: DefaultModeProps,
) {
  const getSelectedKeys = (args: Arg[]): string[] => (
    args.filter(({ selected }: Arg) => selected).map(({ name }: Arg) => name));

  const buildArgs = useMemo((): string[] => (getSelectedKeys(buildCmd.args)), [buildCmd.args]);
  const runArgs = useMemo((): string[] => (getSelectedKeys(runCmd.args)), [runCmd.args]);

  const onBuildCmdChange = useCallback((values: string[]): void => {
    formActionCreator.updateBuildCmdSelected(dispatchForm, values);
  }, []);

  const onRunCmdChange = useCallback((values: string[]): void => {
    formActionCreator.updateRunCmdSelected(dispatchForm, values);
  }, []);

  const getSubtitle = useCallback((args: Arg[], keysLength: number): ReactElement => (
    <span>
      {keysLength === args.length
        ? 'All items selected'
        : `${keysLength} of ${args.length} selected`}
    </span>
  ), [buildCmd, runCmd, buildArgs, runArgs]);

  return (
    <Accordion isCompact fullWidth variant="shadow">
      <AccordionItem
        key="1"
        aria-label="Create workflow"
        title="Create workflow"
        subtitle={getSubtitle(buildCmd.args, buildArgs.length)}
      >
        <CheckboxGroup
          onValueChange={onBuildCmdChange}
          value={buildArgs}
          color="primary"
          aria-label="Select arguments"
        >
          {buildCmd.args.map((arg: Arg) => (
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
        subtitle={getSubtitle(runCmd.args, runArgs.length)}
      >
        <CheckboxGroup
          onValueChange={onRunCmdChange}
          value={runArgs}
          color="primary"
          aria-label="Select arguments"
        >
          {runCmd.args.map((arg: Arg) => (
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
