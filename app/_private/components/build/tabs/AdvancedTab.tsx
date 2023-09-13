import React, { useCallback, useEffect } from 'react';
import { Textarea } from '@nextui-org/react';

// Actions
import formActionCreators from '@/_private/lib/actions/formActions';
import getScript from '@/_private/utils/getScript';

// Types
import { Form, FormAction } from '@/_private/types/lib/formTypes';

export default function AdvancedMode(
  {
    form: { createWorkflow, runWorkflow, script }, dispatchForm,
  }:
  {
    form: Form,
    dispatchForm: React.Dispatch<FormAction>,
  },
) {
  useEffect((): void => {
    formActionCreators.updateFormScript(dispatchForm, getScript(createWorkflow, runWorkflow));
  }, [createWorkflow, runWorkflow]);

  const onChange = useCallback(({ target: { value } }: any): void => {
    formActionCreators.updateFormScript(dispatchForm, value);
  }, []);

  return (
    <Textarea
      variant="faded"
      color="default"
      label="Write command"
      value={script}
      onChange={onChange}
    />
  );
}
