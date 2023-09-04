import { Arg, BuildCmd, RunCmd } from '@/_types/components/formTypes';
import { ArgAcc } from '@/_types/utils';

const getScript = (...commands: [BuildCmd, RunCmd]): string => (
  commands.map(({ name, args }: BuildCmd | RunCmd): string => [
    name, ...args.reduce((acc: ArgAcc, val: Arg): ArgAcc => (
      acc.concat(val.selected ? [val.name, val.value] : [])), []),
  ].join(' ')).join('\n\n')
);

export default getScript;
