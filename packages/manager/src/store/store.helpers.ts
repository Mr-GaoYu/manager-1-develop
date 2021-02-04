import { createAsyncThunk } from '@reduxjs/toolkit';

export type Success<Params, Result> = (
  | {
      params: Params;
    }
  | (Params extends void
      ? {
          params?: Params;
        }
      : never)
) &
  (
    | {
        result: Result;
      }
    | (Result extends void
        ? {
            result?: Result;
          }
        : never)
  );

export type Failure<Params, Error> = (
  | {
      params: Params;
    }
  | (Params extends void
      ? {
          params?: Params;
        }
      : never)
) & {
  error: Error;
};

export const createRequestThunk = <Params extends any, Result, Error>(
  typePrefix: string,
  request: (params: Params) => Promise<Result>
): any =>
  createAsyncThunk<Success<Params, Result> | Failure<Params, Error>, Params>(
    typePrefix,
    (params, { rejectWithValue }) =>
      request(params)
        .then((result) => ({ result, params }))
        .catch((error) => rejectWithValue({ error, params }))
  );
