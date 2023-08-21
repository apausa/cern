import { DashboardActions, DashboardState, Metadata } from '@/types/dashboard';

const dashboardReducer = (
  currentState: DashboardState,
  action: DashboardActions,
): DashboardState => {
  let nextState = null;

  switch (action.type) {
    case 'CREATE_METADATA': {
      nextState = [...currentState, action.metadata];
      break; }
    case 'UPDATE_METADATA': { nextState = currentState.map((metadata: Metadata): Metadata => (
      (metadata.id === action.metadata.id) ? action.metadata : metadata)); break; }
    default: {
      nextState = currentState;
      break; }
  }

  localStorage.setItem('allMetadata', JSON.stringify(nextState)); // @delete

  return nextState;
};

export default dashboardReducer;
