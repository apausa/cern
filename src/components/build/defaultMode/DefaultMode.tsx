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
import { DefaultModeProps, CmdArg, CmdObj } from '@/types/build';

// Actions
import formActions from '@/lib/actions/form';

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
    formActions.setCmdObjArguments(dispatchForm, keys);
    setSelectedKeys(keys);
  };

  return (
    <fieldset className="p-4">
      <Table
        onSelectionChange={handleOnSelectionChange}
        removeWrapper
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        disabledKeys={getDisabledKeys(cmdObj)}
        color="default"
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
    </fieldset>
  );
}
