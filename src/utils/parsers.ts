import { BashScript } from '@/types/build';
import returnPath from './returnPath';

export const parseCmd = (cmd: any, id: any = null): any[] => ( // @develop, debug
  cmd.reduce((acc: any[], args: any): any[] => (
    acc.concat(...args.map(({ name, value }: any): any[] => (
      [name, (name === '--script') ? returnPath(<string>id) : value])))), []));

export const parseScript = (script: BashScript): any[] => (
  script.reduce((acc: any[], { name, args }: any): any[] => (
    acc.concat(name, ...args.map((arg: any): any[] => (
      [arg.name, arg.value])))), []));
