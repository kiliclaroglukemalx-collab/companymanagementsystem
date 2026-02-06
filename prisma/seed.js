const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.DEFAULT_ADMIN_EMAIL;
  if (!email) {
    throw new Error("DEFAULT_ADMIN_EMAIL is missing");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin already exists for ${email}. Skipping seed.`);
    return;
  }

  const siteName = process.env.DEFAULT_SITE_NAME || "Default Site";
  const departmentName = process.env.DEFAULT_DEPARTMENT_NAME || "General";
  const adminName = process.env.DEFAULT_ADMIN_NAME || "Super Admin";

  const tempPassword = crypto.randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(tempPassword, 12);

  const site = await prisma.site.create({
    data: { name: siteName },
  });

  const department = await prisma.department.create({
    data: { name: departmentName, siteId: site.id },
  });

  const user = await prisma.user.create({
    data: {
      siteId: site.id,
      departmentId: department.id,
      role: "SUPER_ADMIN",
      name: adminName,
      email,
      mustChangePassword: true,
      isActive: true,
    },
  });

  await prisma.passwordCredential.create({
    data: {
      userId: user.id,
      passwordHash,
      passwordSetAt: new Date(),
    },
  });

  await prisma.userSecurity.create({
    data: {
      userId: user.id,
      twoFactorEnabled: false,
    },
  });

  console.log("Seed complete.");
  console.log(`Admin email: ${email}`);
  console.log(`Temporary password: ${tempPassword}`);
  console.log(`Site ID: ${site.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });