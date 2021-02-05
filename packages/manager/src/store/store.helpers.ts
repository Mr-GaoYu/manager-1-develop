import { createAsyncThunk } from '@reduxjs/toolkit';

export const serializeError = (error: any) => error;

export const createRequestThunk: typeof createAsyncThunk = (
  typePrefix,
  payloadCreator,
  options
) =>
  createAsyncThunk(typePrefix, payloadCreator, { ...options, serializeError });
