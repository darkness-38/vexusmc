/**
 * lib/authme.ts
 *
 * AuthMe Reloaded – SHA256 password verification.
 *
 * The hash stored in the database follows the format:
 *   $SHA$<salt>$<final_hash>
 *
 * The algorithm:
 *   1. hash1      = SHA256(plaintext)           → hex string
 *   2. final_hash = SHA256(hash1 + salt)        → hex string
 *   3. Compare final_hash with the stored hash.
 *
 * Uses ONLY Node's built-in `crypto` module — no external dependencies.
 */

import { createHash } from "crypto";

/**
 * Returns true when the database string follows the AuthMe $SHA$ format.
 */
export function isAuthMeHash(dbHash: string): boolean {
  return dbHash.startsWith("$SHA$");
}

/**
 * Core one-way hash computation (pure, no side-effects).
 *
 * @param plainText   The raw password the user typed.
 * @param salt        The salt extracted from the stored hash string.
 * @returns           The final hex digest to compare against the stored hash.
 */
export function computeAuthMeHash(plainText: string, salt: string): string {
  const hash1 = createHash("sha256").update(plainText, "utf8").digest("hex");
  const finalHash = createHash("sha256")
    .update(hash1 + salt, "utf8")
    .digest("hex");
  return finalHash;
}

/**
 * Verifies a plaintext password against an AuthMe $SHA$ hash string.
 *
 * @param plainText   Password entered by the user.
 * @param dbHash      The full string from the database, e.g. "$SHA$abc123$deadbeef..."
 * @returns           `true` if the password is correct, `false` otherwise.
 *
 * @example
 *   const ok = verifyAuthMePassword("myPassword", "$SHA$s4lt$hash...");
 *   if (!ok) throw new Error("Invalid credentials");
 */
export function verifyAuthMePassword(
  plainText: string,
  dbHash: string
): boolean {
  // Guard: must be an AuthMe hash
  if (!isAuthMeHash(dbHash)) {
    throw new Error(
      `verifyAuthMePassword: hash is not in $SHA$ format. Received: "${dbHash.slice(0, 10)}..."`
    );
  }

  // "$SHA$<salt>$<hash>" → split("$") → ["", "SHA", "<salt>", "<hash>"]
  const parts = dbHash.split("$");
  if (parts.length !== 4) {
    throw new Error(
      `verifyAuthMePassword: malformed hash string (expected 4 segments after split, got ${parts.length})`
    );
  }

  const salt = parts[2];
  const storedHash = parts[3];

  if (!salt || !storedHash) {
    throw new Error("verifyAuthMePassword: salt or hash segment is empty.");
  }

  const computed = computeAuthMeHash(plainText, salt);

  // Constant-time comparison to mitigate timing attacks
  // Both strings are hex-encoded SHA256 → always 64 chars, so this is safe.
  if (computed.length !== storedHash.length) return false;

  let diff = 0;
  for (let i = 0; i < computed.length; i++) {
    diff |= computed.charCodeAt(i) ^ storedHash.charCodeAt(i);
  }

  return diff === 0;
}
