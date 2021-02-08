import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('@@manager/LOADING');

export const handleLoadingDone = actionCreator('DONE');
