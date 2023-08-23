import React from 'react';
import { Textarea } from '@nextui-org/react';

// Types
import { AdvancedModeProps } from '@/types/build';

export default function AdvancedMode({ cmdStr, setCmdStr }: AdvancedModeProps) {
  const handleChange = ({ target: { value } }: any): void => {
    setCmdStr(value);
  };

  return (
    <fieldset className="p-4">
      <Textarea
        aria-label="Advanced mode"
        value={cmdStr}
        onChange={handleChange}
      />
    </fieldset>
  );
}
