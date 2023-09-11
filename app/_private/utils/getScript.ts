import { Arg, CreateWorkflow, RunWorkflow } from '@/_private/types/components/formTypes';
import { ArgAcc } from '@/_private/types/utils';

const getScript = (...commands: (CreateWorkflow | RunWorkflow)[]): string => (
  commands.map(({ name, args }: CreateWorkflow | RunWorkflow): string => [
    name, ...args.reduce((acc: ArgAcc, val: Arg): ArgAcc => (
      acc.concat(val.selected ? [val.name, val.value] : [])), []),
  ].join(' ')).join('\n\n')
);

export default getScript;
