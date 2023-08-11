import { HandleUpdateSimulation, Simulation } from '@/types/dashboard';

export type RunProps = {
  dashboardState: Simulation[],
  handleUpdateSimulation: HandleUpdateSimulation,
};
