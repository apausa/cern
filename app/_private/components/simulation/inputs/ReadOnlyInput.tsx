import React from 'react';
import { Input } from '@nextui-org/react';

// Types
import { ReadOnlyInputProps } from '@/_private/types/components/simulationTypes';

export default function ReadOnlyInput({
  label, value, color, variant,
}: ReadOnlyInputProps) {
  return (
    <Input
      className="py-2"
      type="text"
      color={color}
      label={label}
      variant={variant}
      isReadOnly
      value={value}
    />
  );
}
