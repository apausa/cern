import React, { SyntheticEvent, useState } from 'react';
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
import RadioInput from './inputs/RadioInput';

// Utils
import { getDisabledKeys, getSelectedKeys } from '@/utils/getKeys';

export default function DefaultMode({ o2CmdObj, dispatch }: any) {
  const [selectedKeys, setSelectedKeys]: any = useState(getSelectedKeys(o2CmdObj));

  const handleOnSelectionChange = (keys: Selection): void => {
    dispatch({ type: 'UPDATE_SELECTION', keys });
    setSelectedKeys(keys);
  };

  const handleChange = (event: SyntheticEvent): void => {
    console.log(event);
    dispatch({ type: 'UPDATE_VALUE', event });
  };

  return (
    <fieldset>
      <legend>Default mode</legend>
      <Table
        removeWrapper
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        disabledKeys={getDisabledKeys(o2CmdObj)}
        onSelectionChange={handleOnSelectionChange}
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Value</TableColumn>
        </TableHeader>
        <TableBody>
          {o2CmdObj.args.map((arg: any) => (
            <TableRow key={arg.name}>
              <TableCell>
                {arg.name}
              </TableCell>
              <TableCell>
                {arg.input.type === null && (arg.value)}
                {arg.input.type === 'number' && <NumberInput arg={arg} handleChange={handleChange} />}
                {arg.input.type === 'radio' && <RadioInput arg={arg} handleChange={handleChange} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </fieldset>
  );
}
