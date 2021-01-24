import { isDevToolsEnvValid } from './storage';

describe('isDevToolsEnvValid', () => {
  it('returns `true` if all properties are strings', () => {
    expect(
      isDevToolsEnvValid({
        apiRoot: 'string-a',
        loginRoot: 'string-b',
        clientID: 'string-c',
        label: 'string-d'
      })
    ).toBe(true);
    expect(
      isDevToolsEnvValid({
        apiRoot: {},
        loginRoot: 'string-b',
        clientID: 'string-c',
        label: 'string-d'
      })
    ).toBe(false);
  });
});
