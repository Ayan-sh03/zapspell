import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password) => {
  const saltRounds = 10
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  } catch (error) {
    console.error('Error encrypting password:', error)
    throw error
  }
}

export const comparePasswords = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
  } catch (error) {
    console.error('Error comparing passwords:', error)
    throw error
  }
}

const secretKey = 'mySecretKey'; // This should be stored securely, preferably in an environment variable

const encrypt = (word) => {
  let result = '';
  for (let i = 0; i < word.length; i++) {
    result += String.fromCharCode(word.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
  }
  return Buffer.from(result).toString('base64');
};

const decrypt = (encodedWord) => {
  const word = Buffer.from(encodedWord, 'base64').toString();
  let result = '';
  for (let i = 0; i < word.length; i++) {
    result += String.fromCharCode(word.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
  }
  return result;
};

export { encrypt, decrypt };
