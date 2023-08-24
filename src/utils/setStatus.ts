import { Metadata } from '@/types/lib';

const setStatus = (metadata: Metadata, status: string): Metadata => {
  const isTestScript = metadata.testScript.scriptStatus === 'FULFILLED' ? 'prodScript' : 'testScript';

  return { ...metadata, [isTestScript]: { ...metadata[isTestScript], scriptStatus: status } };
};

export default setStatus;
