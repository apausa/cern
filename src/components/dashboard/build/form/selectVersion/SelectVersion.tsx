'use client';

import React from 'react';
import { Input } from '@nextui-org/react';

// Utils
import { getParsedCurrentDate } from '@/utils/getDate';

export default function SelectVersion({ selectedDate, setSelectedDate }: any) {
  const handleChange = ({ target: { value } }: any): void => {
    setSelectedDate(value);
  };

  return (
    <fieldset>
      <legend>Select version</legend>
      <Input
        type="date"
        min="2021-09-22"
        max={getParsedCurrentDate()}
        value={selectedDate}
        onChange={handleChange}
      />
    </fieldset>
  );
}
