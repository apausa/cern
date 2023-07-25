'use client';

import React from 'react';

// Components
import InputNumber from './InputNumber';
import InputRadio from './InputRadio';
import InputCheckbox from './InputCheckbox';

// Types
import { O2FieldsetProps } from '@/types/dashboard/build';

export default function O2Fieldset({ command, dispatch }: O2FieldsetProps) {
  return (
    <fieldset>
      <legend>{command.description}</legend>
      {command.args.map((arg) => (
        <div key={arg!.title}>
          <InputCheckbox arg={arg!} dispatch={dispatch} />
          {arg!.type === 'number' && <InputNumber arg={arg!} dispatch={dispatch} />}
          {arg!.type === 'radio' && <InputRadio arg={arg!} dispatch={dispatch} />}
        </div>
      ))}
    </fieldset>
  );
}
