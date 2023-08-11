import { BashScript } from '@/types/build';
import returnPath from './returnPath';

export const parseCmd = (cmd: any, id: any = null): any[] => { // @develop
  console.log('1');
  const test1 = cmd.reduce(
    (acc: any[], args: any): any[] => {
      console.log('2', args);

      const test2 = acc.concat(...args.map(({ name, value }: any): any[] => {
        console.log('3', name, value);

        const test3 = [name, (name === '--script') ? returnPath(<string>id) : value];

        console.log('test3', test3);
        return test3;
      }));

      console.log('test2', test2);
      return test2;
    },

    [],
  );

  console.log('test1', test1);
  return test1;
};

export const parseScript = (script: BashScript): any[] => (
  script.reduce((acc: any[], { name, args }: any): any[] => (
    acc.concat(name, ...args.map((arg: any): any[] => (
      [arg.name, arg.value])))), []));
