import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('@@manager/Authentication');

interface TokensWithExpiry {
  token: string;
  scopes: string;
  expires: string;
}

export const handleStartSession = actionCreator<TokensWithExpiry>(
  'START_SESSION'
);

export const handleInitTokens = actionCreator('INIT_TOKENS');

export const handleRefreshTokens = actionCreator('REFRESH_TOKENS');

export const handleLogout = actionCreator('LOGOUT');
