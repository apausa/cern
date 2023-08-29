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

  updateMetadataTestStatus: (dispatch, metadata, status) => {
    const unresolvedMetadata: Metadata = setTestStatus(metadata, status);

    dispatch({ type: 'UPDATE_METADATA', metadata: unresolvedMetadata });
  },

  updateMetadataGridStatus: (dispatch, metadata, status) => {
    const unresolvedMetadata: Metadata = setGridStatus(metadata, status);

    dispatch({ type: 'UPDATE_METADATA', metadata: unresolvedMetadata });
  },

  executeMetadataInTest: async (dispatch, unresolvedMetadata) => {
    const response: Response = await fetch('/api/metadata/test', { method: 'PUT', body: JSON.stringify(unresolvedMetadata) });
    const resolvedMetadata: Metadata | null = await response.json();

    if (resolvedMetadata) dispatch({ type: 'UPDATE_METADATA', metadata: resolvedMetadata });
  },

  executeMetadataInGrid: async (dispatch, unresolvedMetadata) => {
    const response: Response = await fetch('/api/metadata/grid', { method: 'PUT', body: JSON.stringify(unresolvedMetadata) });
    const resolvedMetadata: Metadata | null = await response.json();

    if (resolvedMetadata) dispatch({ type: 'UPDATE_METADATA', metadata: resolvedMetadata });
  },
};

export default metadataActionCreators;
