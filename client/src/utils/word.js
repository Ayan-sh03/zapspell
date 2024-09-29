const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
export const decrypt = (encodedWord) => {
  const word = Buffer.from(encodedWord, "base64").toString();
  let result = "";
  for (let i = 0; i < word.length; i++) {
    result += String.fromCharCode(
      word.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length)
    );
  }
  return result;
};
