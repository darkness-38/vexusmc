// @ts-nocheck
import { defineConfig } from "prisma/config";

export default defineConfig({
  prisma: {
    schema: "prisma/schema.prisma",
  },
  client: {
    output: "./node_modules/@prisma/client",
  },
});
