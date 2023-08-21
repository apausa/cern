/* eslint-disable no-alert */
import React, { Key, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Selection,
} from '@nextui-org/react';

// Components
import NumberInput from './inputs/NumberInput';
import SelectInput from './inputs/SelectInput';

// Utils
import { getDisabledKeys, getSelectedKeys } from '@/utils/getKeys';

export default function DefaultMode({ cmdObj, setCmdObjArguments, setCmdObjValues }: any) {
  const [selectedKeys, setSelectedKeys]: any = useState(getSelectedKeys(cmdObj));

  const handleOnSelectionChange = (keys: Selection): void => {
    setCmdObjArguments(keys);
    setSelectedKeys(keys);
  };

  return (
    <fieldset className="p-4">
      <Table
        onSelectionChange={handleOnSelectionChange}
        removeWrapper
        disallowEmptySelection
        selectionBehavior="toggle"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        disabledKeys={getDisabledKeys(cmdObj)}
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
                {arg.input.type === 'number' && <NumberInput arg={arg} setCmdObjValues={setCmdObjValues} />}
                {arg.input.type === 'select' && <SelectInput arg={arg} setCmdObjValues={setCmdObjValues} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </fieldset>
  );
}
