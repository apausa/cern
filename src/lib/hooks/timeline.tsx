import {
  Column, Filter, Metadata, Page,
} from '@/types/lib';

// Utils
import { getStatusName } from '@/utils/getStatus';

// Constants
import { ALL_COLUMNS } from '../state/constants/table';

export const getColumns = (selectedColumns: Set<string> | 'all'): Column[] => (
  (selectedColumns === 'all')
    ? ALL_COLUMNS
    : ALL_COLUMNS.filter((column: Column): boolean => (
      Array.from(selectedColumns).includes(column.key)))
);

export const filterMetadata = (
  allMetadata: Metadata[],
  { query, status }: Filter,
): Metadata[] => {
  const filteredMetadataByQuery = (query)
    ? allMetadata.filter(({ form: { title } }: Metadata) => (
      title.toLowerCase().includes(query.toLowerCase())))
    : allMetadata;

  return (status === 'all')
    ? filteredMetadataByQuery
    : filteredMetadataByQuery.filter(({ gridScript: { scriptStatus } }: Metadata) => (
      Array.from(status).includes(getStatusName(scriptStatus))));
};

export const getPageMetadata = (filteredMetadata: Metadata[], { rows, current }: Page) => {
  const start = (current - 1) * rows;

  return filteredMetadata.slice(start, start + rows);
};
