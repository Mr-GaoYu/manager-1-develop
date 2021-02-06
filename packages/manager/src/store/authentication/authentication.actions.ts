import { createAction } from '@reduxjs/toolkit';

const AUTHENTICATION = `@@manager/Authentication`;

interface TokensWithExpiry {
  token: string;
  scopes: string;
  expires: string;
}

export const handleStartSession = createAction<TokensWithExpiry>(
  `${AUTHENTICATION}/START_SESSION`
);

export const handleInitTokens = createAction(`${AUTHENTICATION}/INIT_TOKENS`);

export const handleRefreshTokens = createAction(
  `${AUTHENTICATION}/REFRESH_TOKENS`
);

export const handleLogout = createAction(`${AUTHENTICATION}/LOGOUT`);
