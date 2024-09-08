import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // Use var here
}

const client = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = client;
}

export default client;
