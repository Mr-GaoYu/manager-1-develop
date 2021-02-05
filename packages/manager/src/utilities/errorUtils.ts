import { APIError } from '@rua/api-v1/lib/types';
import { DEFAULT_ERROR_MESSAGE } from 'src/constants';

export const getAPIErrorOrDefault = (
  errorResponse: APIError[],
  defaultError: string = DEFAULT_ERROR_MESSAGE,
  field?: string
): APIError[] => {
  const _defaultError = field
    ? [{ reason: defaultError, field }]
    : [{ reason: defaultError }];

  return isDefaultError(errorResponse) ? _defaultError : errorResponse;
};

const isDefaultError = (errorResponse: APIError[]) => {
  return (
    errorResponse &&
    errorResponse.length === 1 &&
    errorResponse[0].reason === DEFAULT_ERROR_MESSAGE
  );
};
