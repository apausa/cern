'use client';

import React from 'react';

// Types
import { AdvancedModeProps } from '@/types/build';

export default function AdvancedMode({ parsedO2Cmd, setParsedO2Cmd }: AdvancedModeProps) {
  const handleChange = ({ target: { value } }: any): void => {
    setParsedO2Cmd(value);
  };

  return (
    <label htmlFor="advancedMode">
      <textarea
        id="advancedMode"
        name="advancedMode"
        value={parsedO2Cmd}
        onChange={handleChange}
      />
    </label>
  );
}
