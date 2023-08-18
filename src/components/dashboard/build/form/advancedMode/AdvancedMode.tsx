'use client';

import React from 'react';
import { Textarea } from '@nextui-org/react';

// Types
import { AdvancedModeProps } from '@/types/build';

export default function AdvancedMode({ o2CmdStr, setO2CmdStr }: AdvancedModeProps) {
  const handleChange = ({ target: { value } }: any): void => {
    setO2CmdStr(value);
  };

  return (
    <fieldset>
      <legend>Advanced Mode</legend>
      <Textarea
        value={o2CmdStr}
        onChange={handleChange}
      />
    </fieldset>
  );
}
