import { Arg, CreateWorkflow, RunWorkflow } from '@/_private/types/lib/formTypes';
import { ArgAcc, Status, StatusColor } from '@/_private/types/utils';

export const getScript = (...commands: (CreateWorkflow | RunWorkflow)[]): string => (
  commands.map(({ name, args }: CreateWorkflow | RunWorkflow): string => [
    name, ...args.reduce((acc: ArgAcc, val: Arg): ArgAcc => (
      acc.concat(val.selected ? [val.name, val.value] : [])), []),
  ].join(' ')).join('\n\n')
);

export const getStatusColor = (status: Status): StatusColor => {
  switch (status) {
    case 'Running': return 'warning';
    case 'Completed': return 'success';
    case 'Error': return 'danger';
    default: return 'primary';
  }
};

export const getSelectedVersion = (selectedDate: string): string => {
  const [YYYY, MM, DD]: string[] = selectedDate.split('-');

  return `v${YYYY}${MM}${DD}-1`;
};

export const getLatestVersion = (): string => {
  const currentDate: Date = new Date();
  const year: string = String(currentDate.getFullYear());
  const month: string = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day: string = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getCurrentDate = (): string => {
  const currentDate: Date = new Date();
  const year: string = String(currentDate.getFullYear());
  const month: string = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day: string = String(currentDate.getDate()).padStart(2, '0');
  const hours: string = String(currentDate.getHours()).padStart(2, '0');
  const minutes: string = String(currentDate.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} • ${hours}:${minutes}`;
};
