import { createRequestThunk } from 'src/store/store.helpers';
import { requestAccountActions, updateAccountActions } from './account.actions';
import {
  Account,
  getAccountInfo,
  updateAccountInfo
} from '@rua/api-v1/lib/account';

export const stripInvalidPromos = (data: Account) => {
  const { active_promotions } = data;
  const filteredPromotions = active_promotions.filter(
    (thisPromotion) => thisPromotion.expire_dt !== null
  );
  return {
    ...data,
    active_promotions: filteredPromotions
  };
};

export const requestAccount = createRequestThunk(requestAccountActions, () =>
  getAccountInfo().then(stripInvalidPromos)
);

export const updateAccount = createRequestThunk(
  updateAccountActions,
  ({ ...data }) => updateAccountInfo(data).then(stripInvalidPromos)
);
