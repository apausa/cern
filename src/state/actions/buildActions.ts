import { buildConstants } from '../constants/buildConstants';

export function checkInput() {
  return { type: buildConstants.CHECK_INPUT };
}

export function uncheckInput() {
  return { type: buildConstants.UNCHECK_INPUT };
}
