import "dotenv/config";

import { PrismaClient } from "../genrated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prismaClient = new PrismaClient({
  adapter,
});

export default prismaClient;