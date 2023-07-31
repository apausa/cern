'use client';

import React from 'react';

import { FormOtherAction, FormNumberProps } from '@/types/build';

export default function FormNumber({ arg, dispatch }: FormNumberProps) {
  const handleChange = (event: any) => {
    const action: FormOtherAction = { type: 'UPDATE_FORM_OTHER', event };

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
