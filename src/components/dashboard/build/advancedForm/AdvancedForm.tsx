import React from 'react';

export default function AdvancedForm({ handleUpdateTextarea }: any) {
  const handleChange = ({ target: { value } }: any): any => {
    console.log(value); // @develop
    handleUpdateTextarea();
  };

  return (
    <>
      <div>Advanced form:</div>
      <label htmlFor="advanced form">
        <textarea
          id="advanced form"
          name="advanced form"
          value=""
          onChange={handleChange}
        />
      </label>
    </>
  );
}
