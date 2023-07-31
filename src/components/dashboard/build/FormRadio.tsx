'use client';

import React from 'react';

import { FormOtherAction, FormRadioProps } from '@/types/build';

export default function FormRadio({ arg, dispatch }: FormRadioProps) {
  const handleChange = (event: any) => {
    const action: FormOtherAction = { type: 'UPDATE_FORM_OTHER', event };

    dispatch(action);
  };

  return (
    <>
      {arg.input.options.map((option: any) => (
        <div key={option}>
          <input
            type="radio"
            id={option}
            name={arg.name}
            onChange={handleChange}
            value={option}
            // Custom
            checked={option === arg.value}
            disabled={!arg.isChecked}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </>
  );
}
