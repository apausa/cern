import { Status, StatusColor } from '@/_private/types/utils';

export const getStatusColor = (status: Status): StatusColor => {
  switch (status) {
    case 'Running': return 'warning';
    case 'Completed': return 'success';
    case 'Error': return 'danger';
    default: return 'primary';
  }
};
