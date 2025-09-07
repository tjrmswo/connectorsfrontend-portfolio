export function generateVerifier() {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const min = 42;
  const max = 128;
  const randomNum = Math.floor(Math.random() * (max - min) + min);

  for (let i = 0; i < randomNum; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
