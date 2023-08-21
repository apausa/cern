export const getVersion = (date: string): string => {
  const [YYYY, MM, DD] = date.split('-');

  return `v${YYYY}${MM}${DD}-1`;
};

export const getParsedCurrentDate = (): string => {
  const currentDate: Date = new Date();
  const year: string = String(currentDate.getFullYear());
  const month: string = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day: string = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
