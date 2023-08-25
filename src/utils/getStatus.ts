export const getStatusName = (status: string | null): string => {
  switch (status) {
    case 'PENDING': return 'Running';
    case 'FULFILLED': return 'Completed';
    case 'REJECTED': return 'Error';
    default: return 'Staged';
  }
};

export const getStatusColor = (status: string | null): 'warning' | 'success' | 'danger' | 'default' => {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'FULFILLED': return 'success';
    case 'REJECTED': return 'danger';
    default: return 'default';
  }
};

export const getStatusIsDisabled = (status: string | null): boolean => (
  status === 'PENDING' || status === 'FULFILLED');
