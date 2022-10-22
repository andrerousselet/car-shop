export enum StatusCodes {
  OK = 200,
  CREATED,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export enum ErrorTypes {
  NotFound = 'NotFound',
  InvalidId = 'InvalidId',
}

type ErrorResponseObject = { 
  message: string;
  httpStatus: StatusCodes
};

export type CustomError = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const customError: CustomError = {
  NotFound: {
    message: 'Object not found',
    httpStatus: StatusCodes.NOT_FOUND,
  },
  InvalidId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: StatusCodes.BAD_REQUEST,
  },
};