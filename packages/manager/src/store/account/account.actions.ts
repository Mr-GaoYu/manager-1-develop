import { createAction } from '@reduxjs/toolkit';

const ACCOUNT = `@@manager/Account`;

export const saveCreditCard = createAction(`${ACCOUNT}/UPDATE_CREDIT_CARD`);
