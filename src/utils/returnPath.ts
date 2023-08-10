import path from 'node:path';

const returnPath = (id: string): string => (
  path.join('/home/papausac/work/scripts', `${id}.sh`));

export default returnPath;
