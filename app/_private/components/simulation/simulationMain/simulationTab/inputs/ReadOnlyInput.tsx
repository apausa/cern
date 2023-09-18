import React from 'react';
import { Input } from '@nextui-org/react';

export default function ReadOnlyInput({
  label, value, color, variant,
}: {
  label: string,
  value: string,
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger',
  variant: 'flat' | 'faded' | 'bordered' | 'underlined',
}) {
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
