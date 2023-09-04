// Constants
import { ALL_COLUMNS } from '@/_lib/constants/tableConstants';

// Types
import { Simulation } from '@/_types/components/simulationTypes';
import { Column, Filter, Page } from '@/_types/components/tableTypes';

// Utils
import { getStatusName } from './getStatus';

export const getColumns = (selectedColumns: Set<string> | 'all'): Column[] => (
  (selectedColumns === 'all')
    ? ALL_COLUMNS
    : ALL_COLUMNS.filter((column: Column): boolean => (
      Array.from(selectedColumns).includes(column.key)))
);

export const filterSimulation = (
  simulations: Simulation[],
  { query, status }: Filter,
): Simulation[] => {
  const filteredSimulationByQuery = (query)
    ? simulations.filter(({ form: { title } }: Simulation) => (
      title.toLowerCase().includes(query.toLowerCase())))
    : simulations;

  return (status === 'all')
    ? filteredSimulationByQuery
    : filteredSimulationByQuery.filter(({ gridScript: { scriptStatus } }: Simulation) => (
      Array.from(status).includes(getStatusName(scriptStatus))));
};

export const getPageSimulation = (filteredSimulation: Simulation[], { rows, current }: Page) => {
  const start = (current - 1) * rows;

  return filteredSimulation.slice(start, start + rows);
};
