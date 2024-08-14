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
