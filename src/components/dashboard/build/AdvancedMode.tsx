'use client';

import React from 'react';
import { Textarea } from '@nextui-org/react';

// Types

export default function AdvancedMode({ cmdStr, setCmdStr }: any) {
  const handleChange = ({ target: { value } }: any): void => {
    setCmdStr(value);
  };

  return (
    <fieldset className="p-4">
      <Textarea
        label="Advanced mode"
        value={cmdStr}
        onChange={handleChange}
      />
    </fieldset>
  );
}
