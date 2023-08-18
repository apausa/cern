import { Input } from '@nextui-org/react';
import React from 'react';

// @continue
export default function NumberInput({ arg, handleChange }: any) {
  return (
    <Input
      type="number"
      onChange={handleChange}
      value={arg.value}
      isDisabled={arg.checked}
      min={arg.input.min}
      max={arg.input.max}
    />
  );
}
