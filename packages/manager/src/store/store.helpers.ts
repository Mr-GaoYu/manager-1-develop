import { createAsyncThunk } from '@reduxjs/toolkit';

export type Success<Params, Result> = (
  | { params: Params }
  | (Params extends void ? { params?: Params } : never)
) &
  ({ result: Result } | (Result extends void ? { result?: Result } : never));

export type A<Params, Result> = {
  result?: Result;
  params?: Params;
};

export type Failure<Params, Error> = (
  | { params: Params }
  | (Params extends void ? { params?: Params } : never)
) & { error: Error };

export type ThunkApiConfig<Params, Error> = {
  rejectValue?: Failure<Params, Error>;
};

export const createRequestThunk = <Result, Params, Error = {}>(
  typePrefix: string,
  request: (params: Params) => Promise<Result>
) =>
  createAsyncThunk<
    Success<Params, Result>,
    Params,
    ThunkApiConfig<Params, Error>
  >(typePrefix, (params, { rejectWithValue }) =>
    Promise.resolve(request(params))
      .then((result) => ({ result, params }))
      .catch((error) => rejectWithValue({ error, params }))
  );
