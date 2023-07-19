import { buildConstants } from '../constants/buildConstants';

export default function updateInput({ event }: any) {
  return { type: buildConstants.UPDATE_INPUT, event };
}
