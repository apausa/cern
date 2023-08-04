import { HandlePutSimulation, Simulation } from '@/types/dashboard';

export type RunProps = {
  dashboardState: Simulation[],
  handlePutSimulation: HandlePutSimulation,
};
