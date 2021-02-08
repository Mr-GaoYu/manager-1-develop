import { AsyncActionCreators } from 'typescript-fsa';
import { ThunkActionCreator } from 'src/store/types';

export const createRequestThunk = <Return, Params extends any, Error>(
  actions: AsyncActionCreators<Params, Return, Error>,
  request: (params: Params) => Promise<Return>
): ThunkActionCreator<Promise<Return>, Params> => {
  return (params: Params) => async (dispatch) => {
    const { started, done, failed } = actions;

    dispatch(started(params));

    try {
      const result = await request(params);
      const doneAction = done({ result, params });
      dispatch(doneAction);
      return result;
    } catch (error) {
      const failAction = failed({ error, params });
      dispatch(failAction);
      return Promise.reject(error);
    }
  };
};
