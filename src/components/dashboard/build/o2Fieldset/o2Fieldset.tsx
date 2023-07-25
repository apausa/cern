'use client';

import React from 'react';

// Components
import InputNumber from './InputNumber';
import InputRadio from './InputRadio';
import InputCheckbox from './InputCheckbox';

// Types
import { O2FieldsetProps } from '@/types/dashboard/build/o2Fieldset/o2Fieldset';

export default function O2Fieldset({ command, dispatch }: O2FieldsetProps) {
  return (
    <fieldset>
      <legend>{command.description}</legend>
      {command.args.map((arg) => (
        <div key={arg!.title}>
          <InputCheckbox arg={arg!} dispatch={dispatch} />
          {arg!.title === '-n' && <InputNumber arg={arg!} dispatch={dispatch} />}
          {arg!.title === '-e' && <InputRadio arg={arg!} dispatch={dispatch} />}
        </div>
      ))}
    </fieldset>
  );
}
