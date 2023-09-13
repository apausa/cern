import { Status, StatusColor, StatusName } from '@/_private/types/utils';

export const getStatusName = (status: Status): StatusName => {
  switch (status) {
    case 'PENDING': return 'Running';
    case 'FULFILLED': return 'Completed';
    case 'REJECTED': return 'Error';
    default: return 'Staged';
  }
};

export const getStatusColor = (status: Status): StatusColor => {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'FULFILLED': return 'success';
    case 'REJECTED': return 'danger';
    default: return 'primary';
  }
};
