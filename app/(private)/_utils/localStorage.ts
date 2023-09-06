import { Simulation } from '../_types/components/simulationTypes';

export const getAllSimulations = (): Simulation[] | [] => {
  const response: string = localStorage.getItem('simulations')!;
  return (response) ? JSON.parse(response) : [];
};

export const setAllSimulations = (state: Simulation[]): void => {
  localStorage.setItem('simulations', JSON.stringify(state));
};
