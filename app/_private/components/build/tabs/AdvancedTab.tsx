import React, { useCallback, useEffect } from 'react';
import { Textarea } from '@nextui-org/react';

// Actions
import formActionCreators from '@/_private/lib/actions/formActions';
import getScript from '@/_private/utils/getScript';

export default function AdvancedMode(
  { form: { buildCmd, runCmd, script }, dispatchForm }: any,
) {
  useEffect((): void => {
    formActionCreators.updateFormScript(dispatchForm, getScript(buildCmd, runCmd));
  }, [buildCmd, runCmd]);

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
