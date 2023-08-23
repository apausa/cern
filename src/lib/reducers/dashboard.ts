import { DashboardActions, AllMetadata, Metadata } from '@/types/dashboard';

const dashboardReducer = (
  allMetadata: AllMetadata,
  action: DashboardActions,
): AllMetadata => {
  let nextState = null;

  switch (action.type) {
    case 'READ_ALL_METADATA': {
      nextState = action.parsedResponse;
      break; }
    case 'CREATE_METADATA': {
      nextState = [...allMetadata, action.metadata];
      break; }
    case 'UPDATE_METADATA': { nextState = allMetadata.map((metadata: Metadata): Metadata => (
      (metadata.id === action.metadata.id) ? action.metadata : metadata)); break; }
    default: {
      nextState = allMetadata;
      break; }
  }

  localStorage.setItem('allMetadata', JSON.stringify(nextState)); // @delete

  return nextState;
};

export default dashboardReducer;
