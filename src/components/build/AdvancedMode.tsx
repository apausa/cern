import React from 'react';
import { Textarea } from '@nextui-org/react';

// Types
import { AdvancedModeProps } from '@/types/build';

// Actions
import formActions from '@/lib/actions/form';

export default function AdvancedMode({ cmdStr, dispatchForm }: AdvancedModeProps) {
  const handleChange = ({ target: { value } }: any): void => {
    formActions.setCmdStr(dispatchForm, value);
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
