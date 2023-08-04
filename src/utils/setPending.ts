import { Simulation } from '@/types/dashboard';

const setPending = (simulation: Simulation): Simulation => ({
  ...simulation, [simulation.testStatus === 'FULFILLED' ? 'prodStatus' : 'testStatus']: 'PENDING',
});

export default setPending;
