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
  const email = process.argv[2] || process.env.DEFAULT_ADMIN_EMAIL || "admin@company.com";
  
  console.log(`🔍 Looking for user: ${email}`);
  
  const user = await prisma.user.findUnique({ 
    where: { email },
    include: { passwordCredential: true }
  });
  
  if (!user) {
    console.log("❌ User not found!");
    return;
  }

  console.log(`✅ User found: ${user.name} (${user.role})`);
  
  // Generate new temp password
  const tempPassword = crypto.randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(tempPassword, 12);
  
  // Update password
  if (user.passwordCredential) {
    await prisma.passwordCredential.update({
      where: { userId: user.id },
      data: {
        passwordHash,
        passwordSetAt: new Date(),
      },
    });
  } else {
    await prisma.passwordCredential.create({
      data: {
        userId: user.id,
        passwordHash,
        passwordSetAt: new Date(),
      },
    });
  }
  
  // Reset flags
  await prisma.user.update({
    where: { id: user.id },
    data: {
      mustChangePassword: false,
      isActive: true,
    },
  });
  
  console.log("\n✅ Password reset complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password: ${tempPassword}`);
  console.log(`👤 Role: ${user.role}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("⚠️  SAVE THIS PASSWORD! Use it to login.");
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
