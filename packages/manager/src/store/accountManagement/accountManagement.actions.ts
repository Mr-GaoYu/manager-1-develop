import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory(`@@manager/AccountManagement`);

export const setLargeAccount = actionCreator<boolean>(`set-large-account`);
