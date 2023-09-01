import React, { useMemo } from 'react';
import {
  CheckboxGroup,
  Checkbox,
} from '@nextui-org/react';

// Components
import NumberInput from './inputs/NumberInput';

// Types
import {
  CmdArg, NumberArg, StringArg,
} from '@/types/lib';
import { DefaultModeProps } from '@/types/components/form';

// Actions
import formActionCreator from '@/lib/state/actions/form';
import StringInput from './inputs/StringInput';
import { getSelectedKeys } from '@/lib/hooks/form';

export default function DefaultMode({ cmdObj, dispatchForm }: DefaultModeProps) {
  const selectedKeys = useMemo(() => getSelectedKeys(cmdObj.args), [cmdObj.args]);

  const handleOnSelectionChange = (values: string[]): void => {
    formActionCreator.updateFormCmdObjArg(dispatchForm, values);
  };

  return (
    <>
      <span className="py-2 text-small">
        {selectedKeys.length === cmdObj.args.length
          ? 'All items selected'
          : `${selectedKeys.length} of ${cmdObj.args.length} selected`}
      </span>
      <CheckboxGroup
        onValueChange={handleOnSelectionChange}
        value={selectedKeys}
        color="primary"
        className="mt-2 mb-4 rounded-lg"
        aria-label="Select arguments"
      >
        {cmdObj.args.map((arg: CmdArg) => (
          <div key={arg.name} className="flex flex-row justify-between rounded-lg hover:bg-content1 items-center">
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
    </>
  );
}
