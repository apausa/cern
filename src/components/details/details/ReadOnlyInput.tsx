import React from 'react';
import { Input } from '@nextui-org/react';

// Types
import { ReadOnlyInputProps } from '@/types/components/details';

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
