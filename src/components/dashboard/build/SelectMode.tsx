'use client';

import React from 'react';

export default function SelectMode({ isAdvanced, setIsAdvanced }: any) {
  const handleChange = ({ target: { value } }: any) => {
    setIsAdvanced(value === 'advanced mode');
  };

  return (
    <div>
      Select mode:
      <label htmlFor="advanced mode">
        <input
          type="radio"
          id="advanced mode"
          name="advanced mode"
          value="advanced mode"
          checked={isAdvanced}
          onChange={handleChange}
        />
        Advanced
      </label>
      <label htmlFor="intermediate mode">
        <input
          type="radio"
          id="intermediate mode"
          name="intermediate mode"
          value="intermediate mode"
          checked={!isAdvanced}
          onChange={handleChange}
        />
        Intermediate
      </label>
    </div>
  );
}
