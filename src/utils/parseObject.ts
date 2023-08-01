import { BashScript } from '@/types/build';

const parseObject = (bashScript: BashScript): string => {
  const contentArray: any = [];

  bashScript.forEach((cmd) => {
    contentArray.push(cmd.name);
    cmd.args.forEach(({ name, value }: any) => contentArray.push(name, value));
  });

  return contentArray.join(' ');
};

export default parseObject;
