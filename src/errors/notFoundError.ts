import { NOT_FOUND_STATUS } from '../utils/constants';

export default class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS;
  }
}
