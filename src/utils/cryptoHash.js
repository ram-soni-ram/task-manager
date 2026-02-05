import crypto from "crypto";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function verifyHashToken(plainTextToken, storedHash) {
  const hashed = crypto.createHash("sha256").update(plainTextToken).digest("hex");
  return storedHash === hashed;
}

export { hashToken, verifyHashToken };
