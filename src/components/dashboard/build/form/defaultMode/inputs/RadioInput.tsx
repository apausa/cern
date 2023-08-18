import { Switch } from '@nextui-org/react';
import React from 'react';

// @continue
export default function RadioInput({ arg, handleChange }: any) {
  return (
    <Switch
      onChange={handleChange}
      isDisabled={arg.checked}
    >
      TGeant4
    </Switch>
  );
}
