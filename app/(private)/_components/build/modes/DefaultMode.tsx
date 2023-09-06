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
  Arg, DefaultModeProps, NumberArg, StringArg,
} from '@/(private)/_types/components/formTypes';

// Actions
import formActionCreator from '@/(private)/_lib/actions/formActions';

// Utils
import { getSelectedKeys } from '@/(private)/_utils/form';

export default function DefaultMode(
  { form: { buildCmd, runCmd }, dispatchForm }: DefaultModeProps,
) {
  const buildArgs = useMemo((): string[] => (
    getSelectedKeys(buildCmd.args)
  ), [buildCmd.args]);

  const runArgs = useMemo((): string[] => (
    getSelectedKeys(runCmd.args)
  ), [runCmd.args]);

  const onBuildCmdChange = useCallback((values: string[]): void => {
    formActionCreator.updateFormBuildCmd(dispatchForm, values);
  }, []);

  const onRunCmdChange = useCallback((values: string[]): void => {
    formActionCreator.updateFormRunCmd(dispatchForm, values);
  }, []);

  const getSubtitle = useCallback((args: Arg[], keysLength: number) => (
    <span>
      {keysLength === args.length
        ? 'All items selected'
        : `${keysLength} of ${args.length} selected`}
    </span>
  ), [buildCmd, runCmd, buildArgs, runArgs]);

  return (
    <Accordion isCompact className="m-0 p-0" fullWidth variant="splitted">
      <AccordionItem
        key="1"
        className="mt-2"
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
            <div key={arg.name} className="flex pb-2 flex-row data-[selected=true]:bg-content1 justify-between rounded-lg hover:bg-content1 items-center">
              <Checkbox className="basis-1/2 truncate" value={arg.name} isDisabled={arg.disabled}>
                {arg.name}
              </Checkbox>
              <div className="basis-1/2">
                {arg.input.type === 'number' && <NumberInput arg={arg as NumberArg} dispatchForm={dispatchForm} />}
                {arg.input.type === 'string' && <StringInput arg={arg as StringArg} dispatchForm={dispatchForm} />}
              </div>
            </div>
          ))}
        </CheckboxGroup>
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Run workflow"
        title="Run workflow"
        className="mt-2"
        subtitle={getSubtitle(runCmd.args, runArgs.length)}
      >
        <CheckboxGroup
          onValueChange={onRunCmdChange}
          value={runArgs}
          color="primary"
          aria-label="Select arguments"
        >
          {runCmd.args.map((arg: Arg) => (
            <div key={arg.name} className="flex pb-2 flex-row data-[selected=true]:bg-content1 justify-between rounded-lg hover:bg-content1 items-center">
              <Checkbox className="basis-1/2 truncate" value={arg.name} isDisabled={arg.disabled}>
                {arg.name}
              </Checkbox>
              <div className="basis-1/2">
                {arg.input.type === 'number' && <NumberInput arg={arg as NumberArg} dispatchForm={dispatchForm} />}
                {arg.input.type === 'string' && <StringInput arg={arg as StringArg} dispatchForm={dispatchForm} />}
              </div>
            </div>
          ))}
        </CheckboxGroup>
      </AccordionItem>
    </Accordion>
  );
}
