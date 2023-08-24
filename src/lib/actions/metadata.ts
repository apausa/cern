/* eslint-disable max-len */

import { Form } from '@/types/build';
import { Metadata } from '@/types/dashboard';
import setStatus from '@/utils/setStatus';

const metadataActions = {
  readAllMetadata: (dispatch: React.Dispatch<any>): void => {
    const response: string = localStorage.getItem('allMetadata')!;
    const allMetadata: Metadata[] | null = (response) ? JSON.parse(response) : null;

    if (allMetadata) dispatch({ type: 'READ_ALL_METADATA', allMetadata });
  },
  createMetadata: async (dispatch: React.Dispatch<any>, form: Form): Promise<void> => {
    const response: Response = await fetch('/api/metadata', { method: 'POST', body: JSON.stringify(form) });
    const metadata: Metadata | null = await response.json();

    if (metadata) dispatch({ type: 'CREATE_METADATA', metadata });
  },
  updateMetadata: async (dispatch: React.Dispatch<any>, metadata: Metadata): Promise<void> => {
    const unresolvedMetadata: Metadata = setStatus(metadata, 'PENDING');
    dispatch({ type: 'UPDATE_METADATA', metadata: unresolvedMetadata });

    const response: Response = await fetch('/api/metadata', { method: 'PUT', body: JSON.stringify(unresolvedMetadata) });
    const resolvedMetadata: Metadata | null = await response.json();
    if (resolvedMetadata) dispatch({ type: 'UPDATE_METADATA', metadata: resolvedMetadata });
  },
  deleteMetadata: (dispatch: React.Dispatch<any>): void => {
    dispatch({ type: 'DELETE_METADATA' });
  },
  deleteAllMetadata: (dispatch: React.Dispatch<any>): void => {
    dispatch({ type: 'DELETE_ALL_METADATA' });
  },
};

export default metadataActions;
