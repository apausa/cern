import path from 'node:path';

const getPath = (id: string): string => (
  path.join('/home/papausac/work/scripts', `${id}.sh`));

export default getPath;
