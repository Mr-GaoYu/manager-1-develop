// import { LARGE_ACCOUNT_THRESHOLD } from 'src/website/constants';
import { ThunkActionCreator, ThunkDispatch } from 'src/store/types';
import { getDomainsPage } from 'src/store/domains/domains.actions';
// import { setLargeAccount } from './accountManagement.actions';

export const checkAccountSize: ThunkActionCreator<Promise<null>> = () => (
  dispatch: ThunkDispatch
) => {
  return Promise.all([dispatch(getDomainsPage({ params: { page_size: 100 } }))])
    .then((combinedResults) => {
      console.log(combinedResults[0], 'combinedResults');

      // combinedResults.some(thisResult => thisResult.payload.results)
      // dispatch(
      //   setLargeAccount(
      //     combinedResults.some(
      //       (thisResult) => thisResult.payload.results > LARGE_ACCOUNT_THRESHOLD
      //     )
      //   )
      // );

      return null;
    })
    .catch((_) => null);
};
