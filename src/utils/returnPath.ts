import path from 'node:path';

const returnPath = (id: string): string => (
  path.join('/work/scripts', `${id}.sh`));

export default returnPath;
