import { PrismaClient } from '@prisma/client'
declare global {
  var cachedPrisma: PrismaClient | undefined;
}

const client = globalThis.cachedPrisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') {
  globalThis.cachedPrisma = client;
}

export default client;
