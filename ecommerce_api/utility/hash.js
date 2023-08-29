import bcrypt from 'bcryptjs';

// Create Hash Password
export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(12)
    return bcrypt.hashSync(password, salt)
}

// Verify Password match
export const passwordVerify = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}