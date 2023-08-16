import { DashboardActions, DashboardState, Metadata } from '@/types/dashboard';
import { getAllMetadata } from '../services/dashboard';

const dashboardReducer = (
  currentState: DashboardState,
  action: DashboardActions,
): DashboardState => {
  let nextState: DashboardState = currentState;

  switch (action.type) {
    case 'READ_ALL_METADATA': { nextState = action.allMetadata; break; }
    case 'CREATE_METADATA': {
      const allMetadata: Metadata[] = getAllMetadata(); // @delete
      allMetadata.push(action.metadata); // @delete
      localStorage.setItem('allMetadata', JSON.stringify(allMetadata)); // @delete

      nextState = [...currentState, action.metadata];
      break; }
    case 'UPDATE_METADATA': { nextState = currentState.map((metadata: Metadata): Metadata => (
      (metadata.id === action.metadata.id) ? action.metadata : metadata)); break; }
    default: break;
  }

  return nextState;
};

export default dashboardReducer;
