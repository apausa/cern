import { HandleRunSimulation, Simulation } from '@/types/dashboard';

export type RunProps = {
  dashboardState: Simulation[],
  handleRunSimulation: HandleRunSimulation,
};
