import crypto from 'crypto';

export function hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
            if(err) reject(err);
            resolve(hash.toString('hex').normalize());
        })
    })
}

export function generateSalt() {
    return crypto.randomBytes(16).toString('hex').normalize();
}

export async function comparePassword({
    password,
    salt,
    hash,
}: {
    password: string;
    salt: string;
    hash: string;
}) {
    const inputHashedPassword = await hashPassword(password, salt);

    return crypto.timingSafeEqual(
        Buffer.from(inputHashedPassword, "hex"),
        Buffer.from(hash, "hex")
    )

    // return inputHashedPassword === hash; // vulnerable to timing attacks
}