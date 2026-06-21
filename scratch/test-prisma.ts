import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

console.log("DATABASE_URL in env:", process.env.DATABASE_URL);
const adapter = new PrismaLibSql({
  url: "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Connecting...");
  const users = await prisma.user.findMany();
  console.log("Users in DB:", users);
}

main().catch(console.error);
