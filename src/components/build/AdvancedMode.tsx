import React from 'react';
import { Textarea } from '@nextui-org/react';

// Types
import { AdvancedModeProps } from '@/types/components/build';

// Actions
import formActionCreators from '@/lib/actions/form';

export default function AdvancedMode({ cmdStr, dispatchForm }: AdvancedModeProps) {
  const handleChange = ({ target: { value } }: any): void => {
    formActionCreators.updateFormCmdStr(dispatchForm, value);
  };

  return (
    <Textarea
      variant="faded"
      color="default"
      className="py-2"
      label="Write command"
      value={cmdStr}
      onChange={handleChange}
    />
  );
}
