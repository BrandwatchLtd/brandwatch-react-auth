export const openDomain = 'open.brandwatch.com';
export const closedDomain = 'closed.brandwatch.com';
export const openBackupDomain = 'open.backup.brandwatch.com';
export const closedBackupDomain = 'closed.backup.brandwatch.com';
export const loginUrl = 'https://login.brandwatch.com';

//generated via https://jwt.io/
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCJ9' +
'.QlmOBM7imQkVauXII7Hd9rYAFgW6NKMuvZ4GmVSTgpM';

export default () => ({
  loginUrl,
  getToken: ({ aud }) => Promise.resolve(aud.startsWith('open') ? token : null),
  removeToken: () => Promise.resolve(),
});
