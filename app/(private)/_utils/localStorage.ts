import INITIAL_FORM from '../_lib/constants/formConstants';
import { Form } from '../_types/components/formTypes';
import { Simulation } from '../_types/components/simulationTypes';

export const getAllSimulations = (): Simulation[] | [] => {
  const response: string | null = localStorage.getItem('simulations');

  return (response) ? JSON.parse(response) : [];
};

export const setAllSimulations = (state: Simulation[]): void => {
  localStorage.setItem('simulations', JSON.stringify(state));
};

export const getForm = (): Form => {
  const response: string | null = localStorage.getItem('form');

  return (response) ? JSON.parse(response) : INITIAL_FORM;
};

export const setForm = (state: Form): void => {
  localStorage.setItem('form', JSON.stringify(state));
};
