async function sha256(codeVerifier: string) {
  const msgBuffer = new TextEncoder().encode(codeVerifier);

  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
}

export async function generateCodeChallenge(
  codeVerifier: string,
  method: string
) {
  if (method === 'S256') {
    // SHA-256 해시를 계산하고 Base64 URL 인코딩

    const hashed = await sha256(codeVerifier);
    const based64Encoded = btoa(hashed);

    console.log('키 해시 후 base64 인코딩 완료: ', based64Encoded);
    return based64Encoded;
  } else {
    // 'plain' 메소드를 사용할 경우, codeVerifier를 그대로 반환
    return codeVerifier;
  }
}
