// import { LARGE_ACCOUNT_THRESHOLD } from 'src/website/constants';
import { ThunkActionCreator } from 'src/store/types';
import { getDomainsPage } from 'src/store/domains/domains.actions';
// import { setLargeAccount } from './accountManagement.actions';

export const checkAccountSize: ThunkActionCreator<Promise<null>> = () => (
  dispatch
) => {
  return Promise.all([
    dispatch(getDomainsPage({ params: { page_size: 100 } })),
    dispatch(getDomainsPage({ params: { page_size: 100 } }))
  ])
    .then((combinedResults) => {
      console.log(combinedResults[0].payload);

      return null;
    })
    .catch((_) => null);
};
