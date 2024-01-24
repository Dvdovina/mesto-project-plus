import { UNAUTHORIZED_ERROR_STATUS } from "../utils/constants";

export default class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_STATUS;
  }
}
