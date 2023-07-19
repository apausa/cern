import { buildConstants } from '../constants/buildConstants';

export default function updateInput({ event }: any) {
  console.log('action input', event);
  return { type: buildConstants.UPDATE_INPUT, event };
}
