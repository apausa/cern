import { Metadata, MetadataActionCreators } from '@/types/lib';
import { setGridStatus, setTestStatus } from '@/utils/setStatus';

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
  updateMetadataInTest: async (dispatch, metadata) => {
    const unresolvedMetadata: Metadata = setTestStatus(metadata, 'PENDING');
    dispatch({ type: 'UPDATE_METADATA', metadata: unresolvedMetadata });

    const response: Response = await fetch('/api/metadata/test', { method: 'PUT', body: JSON.stringify(unresolvedMetadata) });
    const resolvedMetadata: Metadata | null = await response.json();
    if (resolvedMetadata) dispatch({ type: 'UPDATE_METADATA', metadata: resolvedMetadata });
  },
  updateMetadataInGrid: async (dispatch, metadata) => {
    const unresolvedMetadata: Metadata = setGridStatus(metadata, 'PENDING');
    dispatch({ type: 'UPDATE_METADATA', metadata: unresolvedMetadata });

    const response: Response = await fetch('/api/metadata/grid', { method: 'PUT', body: JSON.stringify(unresolvedMetadata) });
    const resolvedMetadata: Metadata | null = await response.json();
    if (resolvedMetadata) dispatch({ type: 'UPDATE_METADATA', metadata: resolvedMetadata });
  },
};

export default metadataActionCreators;
