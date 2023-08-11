import React from 'react';
import NumberInput from './inputs/NumberInput';
import RadioInput from './inputs/RadioInput';
import CheckboxInput from './inputs/CheckboxInput';

export default function IntermediateForm({
  buildState,
  intermediateFormHandlers: {
    handleUpdateRadioInput,
    handleUpdateNumberInput,
    handleUpdateCheckboxInput,
  },
}: any) {
  return (
    <>
      <div>Intermediate form</div>
      {buildState.args.map((arg: any) => (
        <div key={arg.name}>
          <CheckboxInput
            arg={arg}
            handleUpdateCheckboxInput={handleUpdateCheckboxInput}
          />
          <br />
          {arg.input.type === 'number' && (
          <NumberInput
            arg={arg}
            handleUpdateNumberInput={handleUpdateNumberInput}
          />
          )}
          {arg.input.type === 'radio' && (
          <RadioInput
            arg={arg}
            handleUpdateRadioInput={handleUpdateRadioInput}
          />
          )}
        </div>
      ))}
    </>
  );
}
