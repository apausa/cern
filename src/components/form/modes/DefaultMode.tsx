import React, { useMemo } from 'react';
import {
  CheckboxGroup,
  Checkbox,
  AccordionItem,
  Accordion,
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
    <Accordion isCompact className="mt-1 mb-2 p-0" fullWidth variant="splitted">
      <AccordionItem
        key="1"
        aria-label="Create workflow"
        title="Create workflow"
        subtitle={(
          <span>
            {selectedKeys.length === cmdObj.args.length
              ? 'All items selected'
              : `${selectedKeys.length} of ${cmdObj.args.length} selected`}
          </span>
)}
      >
        <CheckboxGroup
          onValueChange={handleOnSelectionChange}
          value={selectedKeys}
          color="primary"
          aria-label="Select arguments"
        >
          {cmdObj.args.map((arg: CmdArg) => (
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
      <AccordionItem key="2" aria-label="Run workflow" title="Run workflow" />
    </Accordion>
  );
}
