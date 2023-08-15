'use client';

import React from 'react';
import { getParsedCurrentDate } from '@/utils/getDate';

export default function DateInput({ selectedDate, setSelectedDate }: any) {
  const handleChange = ({ target: { value } }: any): void => {
    setSelectedDate(value);
  };

  return (
    <label htmlFor="version">
      <div className="font-bold"> Select version</div>
      <input
        type="date"
        min="2021-09-22"
        max={getParsedCurrentDate()}
        value={selectedDate}
        onChange={handleChange}
      />
    </label>
  );
}
