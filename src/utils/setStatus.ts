import { Metadata, Status } from '@/types/lib';

export const setGridStatus = (metadata: Metadata, status: Status): Metadata => (
  { ...metadata, gridScript: { ...metadata.gridScript, scriptStatus: status } });

export const setTestStatus = (metadata: Metadata, status: Status): Metadata => (
  { ...metadata, testScript: { ...metadata.testScript, scriptStatus: status } });
