import { Status, StatusColor, StatusName } from '@/types/lib';

export const STATUS: Status[] = ['PENDING', 'FULFILLED', 'REJECTED', null];
export const STATUS_NAME: StatusName[] = ['running', 'completed', 'error', 'staged'];
export const STATUS_COLOR: StatusColor[] = ['warning', 'success', 'danger', 'default'];
