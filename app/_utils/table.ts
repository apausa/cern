// Types
import { Simulation } from '@/_types/components/simulationTypes';
import { Filter, Page } from '@/_types/components/tableTypes';

// Utils
import { getStatusName } from './getStatus';

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

export const getPageItems = (filteredSimulation: Simulation[], { rows, current }: Page) => {
  const start = (current - 1) * rows;

  return filteredSimulation.slice(start, start + rows);
};
