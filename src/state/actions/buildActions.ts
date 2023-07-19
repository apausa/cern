import { buildConstants } from '../constants/buildConstants';

export default function checkInput(event: any) {
  return { type: buildConstants.CHECK_INPUT, event };
}
