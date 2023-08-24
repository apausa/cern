import { Metadata, MetadataActionCreators } from '@/types/lib';
import setStatus from '@/utils/setStatus';

const metadataActionCreators: MetadataActionCreators = {
  readAllMetadata: (dispatch) => {
    const response: string = localStorage.getItem('allMetadata')!;
    const allMetadata: Metadata[] | null = (response) ? JSON.parse(response) : null;

    if (allMetadata) dispatch({ type: 'READ_ALL_METADATA', allMetadata });
  },
  createMetadata: async (dispatch, form) => {
    const response: Response = await fetch('/api/metadata', { method: 'POST', body: JSON.stringify(form) });
    const metadata: Metadata | null = await response.json();

    if (metadata) dispatch({ type: 'CREATE_METADATA', metadata });
  },
  updateMetadata: async (dispatch, metadata) => {
    const unresolvedMetadata: Metadata = setStatus(metadata, 'PENDING');
    dispatch({ type: 'UPDATE_METADATA', metadata: unresolvedMetadata });

    const response: Response = await fetch('/api/metadata', { method: 'PUT', body: JSON.stringify(unresolvedMetadata) });
    const resolvedMetadata: Metadata | null = await response.json();
    if (resolvedMetadata) dispatch({ type: 'UPDATE_METADATA', metadata: resolvedMetadata });
  },
  deleteMetadata: (dispatch, metadata) => {
    dispatch({ type: 'DELETE_METADATA', metadata });
  },
};

export default metadataActionCreators;
