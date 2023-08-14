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
        rows={4}
        // @develop
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </label>
  );
}
