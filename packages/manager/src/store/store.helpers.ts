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

export const createRequestThunk = <Req extends any, Res, Err>(
  typePrefix: string,
  request: (params: Req) => Promise<Res>
): any =>
  createAsyncThunk<Success<Req, Res>, Req>(
    typePrefix,
    (params, { rejectWithValue }) =>
      request(params)
        .then((result) => ({ result, params }))
        .catch((error) => rejectWithValue({ error, params }))
  );
