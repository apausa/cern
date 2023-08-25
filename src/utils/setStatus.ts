import { Metadata } from '@/types/lib';

export const setGridStatus = (metadata: Metadata, status: 'PENDING' | 'FULFILLED' | 'REJECTED' | null): Metadata => (
  { ...metadata, gridScript: { ...metadata.gridScript, scriptStatus: status } });

export const setTestStatus = (metadata: Metadata, status: 'PENDING' | 'FULFILLED' | 'REJECTED' | null): Metadata => (
  { ...metadata, testScript: { ...metadata.testScript, scriptStatus: status } });
