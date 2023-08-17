/* eslint-disable no-param-reassign */

import { Metadata } from '@/types/dashboard';

const setStatus = (metadata: Metadata, status: string): Metadata => {
  const isTestScript = metadata.testScript.scriptStatus === 'FULFILLED' ? 'prodScript' : 'testScript';

  return { ...metadata, [isTestScript]: { ...metadata[isTestScript], scriptStatus: status } };
};

export default setStatus;
