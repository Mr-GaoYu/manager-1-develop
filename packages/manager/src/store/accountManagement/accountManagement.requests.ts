import { LARGE_ACCOUNT_THRESHOLD } from 'src/website/constants';
import { ThunkActionCreator, ThunkDispatch } from '../types';
import { getDomainsPage } from '../domains/domains.requests';
import { setLargeAccount } from './accountManagement.actions';

export const checkAccountSize: ThunkActionCreator<Promise<null>> = () => (
  dispatch: ThunkDispatch
) => {
  return Promise.all([
    dispatch(getDomainsPage({ params: { page_size: 100 } })),
    dispatch(getDomainsPage({ params: { page_size: 100 } }))
  ])
    .then((combinedResults) => {
      dispatch(
        setLargeAccount(
          combinedResults.some(
            (thisResult) => thisResult.results > LARGE_ACCOUNT_THRESHOLD
          )
        )
      );

      return null;
    })
    .catch((_) => null);
};
