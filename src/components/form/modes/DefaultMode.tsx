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

// Types
import { CmdArg, CmdObj } from '@/types/lib';
import { DefaultModeProps } from '@/types/components/form';

// Actions
import formActionCreator from '@/lib/state/actions/form';

export default function DefaultMode({ cmdObj, dispatchForm }: DefaultModeProps) {
  const getSelectedKeys = (commandObject: CmdObj): Set<string> | 'all' => (
    new Set(commandObject.args
      .filter(({ selected }: CmdArg) => selected)
      .map(({ name }: CmdArg) => name)));

  const getDisabledKeys = (commandObject: CmdObj): Set<string> | 'all' => (
    new Set(commandObject.args
      .filter(({ disabled }: CmdArg) => disabled)
      .map(({ name }: CmdArg) => name)));

  const [selectedKeys, setSelectedKeys] = useState(getSelectedKeys(cmdObj));

  const handleOnSelectionChange = (keys: any): void => {
    formActionCreator.updateFormCmdObjArg(dispatchForm, keys);
    setSelectedKeys(keys);
  };

  return (
    <>
      <span
        className="py-2 text-small"
      >
        {selectedKeys === 'all'
          ? 'All items selected'
          : `${selectedKeys.size} of ${cmdObj.args.length} selected`}
      </span>
      <Table
        onSelectionChange={handleOnSelectionChange}
        removeWrapper
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        disabledKeys={getDisabledKeys(cmdObj)}
        color="default"
        className="pt-2"
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
                {(arg.input.type === null || arg.input.type === 'boolean' || arg.input.type === 'string') && (
                <div>{arg.value}</div>
                )}
                {arg.input.type === 'number' && <NumberInput arg={arg} dispatchForm={dispatchForm} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
