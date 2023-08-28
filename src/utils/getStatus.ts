import { Status, StatusColor, StatusName } from '@/types/lib';

export const getStatusName = (status: Status): StatusName => {
  switch (status) {
    case 'PENDING': return 'running';
    case 'FULFILLED': return 'completed';
    case 'REJECTED': return 'error';
    default: return 'staged';
  }
};

export const getStatusColor = (status: Status): StatusColor => {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'FULFILLED': return 'success';
    case 'REJECTED': return 'danger';
    default: return 'default';
  }
};

export const getStatusIsDisabled = (status: Status): boolean => (
  status === 'PENDING' || status === 'FULFILLED');
