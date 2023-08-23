import { Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';

// Types
import { SelectInputProps } from '@/types/build';

export default function SelectInput({ arg, setCmdObjValues }: SelectInputProps) {
  const [selectedKey, setSelectedKey] = useState(new Set([arg.value]));

  const handleOnSelectionChange = (key: any): void => {
    setCmdObjValues(key, arg.name);
    setSelectedKey(key);
  };

  return (
    <Select
      onSelectionChange={handleOnSelectionChange}
      selectedKeys={selectedKey}
      aria-label="Select input"
    >
      {arg.input.options.map((option: string) => (
        <SelectItem key={option} value={option}>{option}</SelectItem>
      ))}
    </Select>
  );
}
