import { createAction } from '@reduxjs/toolkit';

const ACCOUNT_MANAGEMENT = `@@manager/AccountManagement`;

export const setLargeAccount = createAction<boolean>(
  `${ACCOUNT_MANAGEMENT}/SET_LARGE_ACCOUNT`
);
