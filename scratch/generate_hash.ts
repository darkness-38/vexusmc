import { createHash, randomBytes } from "crypto";

function generateAuthMeHash(password: string) {
    const salt = randomBytes(8).toString('hex'); // 16 chars hex
    const hash1 = createHash("sha256").update(password, "utf8").digest("hex");
    const finalHash = createHash("sha256").update(hash1 + salt, "utf8").digest("hex");
    return `$SHA$${salt}$${finalHash}`;
}

const username = "ksneTETO";
const password = "tetoyaAsigim";
const authMeHash = generateAuthMeHash(password);

console.log("Username:", username);
console.log("Password:", password);
console.log("AuthMe Hash:", authMeHash);
