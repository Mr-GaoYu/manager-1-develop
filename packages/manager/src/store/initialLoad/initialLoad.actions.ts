import { createAction } from '@reduxjs/toolkit';

const INITIAL_LOAD = `@@manager/LOADING`;

export const handleLoadingDone = createAction(`${INITIAL_LOAD}/DONE`);
