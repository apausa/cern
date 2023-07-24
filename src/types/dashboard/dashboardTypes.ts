type DashboardAction = {
  type: 'CREATE_SIMULATION' | 'READ_ALL_SIMULATIONS' | 'UPDATE_SIMULATION' | 'DELETE_SIMULATION';
  simulation: any, // @develop
};

export default DashboardAction;
