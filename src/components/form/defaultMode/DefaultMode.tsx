import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react';

// Components
import NumberInput from './inputs/NumberInput';
import SelectInput from './inputs/SelectInput';

// Types
import { CmdArg, CmdObj } from '@/types/lib';
import { DefaultModeProps } from '@/types/components/form';

// Actions
import formActionCreator from '@/lib/state/actions/form';

export default function DefaultMode({ cmdObj, dispatchForm }: DefaultModeProps) {
  const getSelectedKeys = (commandObject: CmdObj): Set<string> => (
    new Set(commandObject.args
      .filter(({ selected }: CmdArg) => selected)
      .map(({ name }: CmdArg) => name)));

  const getDisabledKeys = (commandObject: CmdObj): Set<string> => (
    new Set(commandObject.args
      .filter(({ disabled }: CmdArg) => disabled)
      .map(({ name }: CmdArg) => name)));

  const [selectedKeys, setSelectedKeys] = useState(getSelectedKeys(cmdObj));

  const handleOnSelectionChange = (keys: any): void => {
    formActionCreator.updateFormCmdObjArg(dispatchForm, keys);
    setSelectedKeys(keys);
  };

  return (

    <Table
      onSelectionChange={handleOnSelectionChange}
      removeWrapper
      disallowEmptySelection
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      disabledKeys={getDisabledKeys(cmdObj)}
      color="default"
      className="py-2"
      aria-label="Build table"
    >
      <TableHeader>
        <TableColumn>Argument</TableColumn>
        <TableColumn>Value</TableColumn>
      </TableHeader>
      <TableBody>
        {cmdObj.args.map((arg: any) => (
          <TableRow key={arg.name}>
            <TableCell>
              {arg.name}
            </TableCell>
            <TableCell>
              {arg.input.type === null && (arg.value)}
              {arg.input.type === 'number' && <NumberInput arg={arg} dispatchForm={dispatchForm} />}
              {arg.input.type === 'select' && <SelectInput arg={arg} dispatchForm={dispatchForm} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// (<span className="w-[30%] text-small">
// {selectedKeys === 'all'
//   ? 'All items selected'
//   : `${selectedKeys.size} of ${filteredItems.length} selected`}
// </span>)
