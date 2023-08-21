import { Select, SelectItem, Selection } from '@nextui-org/react';
import React, { useState } from 'react';

export default function SelectInput({ arg, setCmdObjValues }: any) {
  const [selectedKey, setSelectedKey]: any = useState(new Set([arg.value]));

  const handleOnSelectionChange = (key: Selection): void => {
    setCmdObjValues(key, arg.name);
    setSelectedKey(key);
  };

  return (
    <Select
      onSelectionChange={handleOnSelectionChange}
      selectedKeys={selectedKey}
    >
      {arg.input.options.map((option: string) => (
        <SelectItem key={option} value={option}>{option}</SelectItem>
      ))}
    </Select>
  );
}
