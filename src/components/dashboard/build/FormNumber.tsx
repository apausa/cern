'use client';

import React, { SyntheticEvent } from 'react';

import { FormValueAction, FormNumberProps } from '@/types/build';

export default function FormNumber({ arg, dispatch }: FormNumberProps) {
  const handleChange = (event: SyntheticEvent): void => {
    const action: FormValueAction = { type: 'UPDATE_FORM_VALUE', event };

    dispatch(action);
  };

  return (
    <div>
      <input
        type="number"
        name={arg.name}
        onChange={handleChange}
        value={arg.value}
        // Custom
        disabled={!arg.isChecked}
        min={arg.input.min}
        max={arg.input.max}
      />
    </div>
  );
}
