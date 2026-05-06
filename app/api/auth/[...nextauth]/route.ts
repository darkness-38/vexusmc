import { handlers } from "@/lib/auth";

// Force Node.js runtime — this route uses Prisma + bcryptjs + crypto
// which are NOT available in Edge Runtime.
export const runtime = "nodejs";

export const { GET, POST } = handlers;
