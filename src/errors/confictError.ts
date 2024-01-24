import { CONFLICT_ERROR_STATUS } from '../utils/constants';

export default class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = CONFLICT_ERROR_STATUS;
  }
}
