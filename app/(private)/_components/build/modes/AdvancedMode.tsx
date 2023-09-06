import React from 'react';
import { Textarea } from '@nextui-org/react';

// Types
import { AdvancedModeProps } from '@/(private)/_types/components/formTypes';

// Actions
import formActionCreators from '@/(private)/_lib/actions/formActions';

export default function AdvancedMode({ script, dispatchForm }: AdvancedModeProps) {
  const handleChange = ({ target: { value } }: any): void => {
    formActionCreators.updateFormScript(dispatchForm, value);
  };

  return (
    <Textarea
      variant="faded"
      color="default"
      className="mt-2"
      label="Write command"
      value={script}
      onChange={handleChange}
    />
  );
}
