const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkUserRole() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@company.com' },
      include: { 
        site: true,
        department: true,
        sessions: {
          where: { revokedAt: null },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!user) {
      console.log('❌ User not found!');
      return;
    }

    console.log('\n📋 USER INFORMATION:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Email: ${user.email}`);
    console.log(`Name: ${user.name}`);
    console.log(`Role: ${user.role}`);
    console.log(`Site: ${user.site.name}`);
    console.log(`Department: ${user.department.name}`);
    console.log(`Active: ${user.isActive}`);
    console.log(`Must Change Password: ${user.mustChangePassword}`);
    
    if (user.sessions.length > 0) {
      console.log('\n🔐 ACTIVE SESSION:');
      console.log(`Session ID: ${user.sessions[0].id}`);
      console.log(`Created: ${user.sessions[0].createdAt}`);
      console.log(`Last Seen: ${user.sessions[0].lastSeenAt}`);
      console.log(`IP: ${user.sessions[0].ip}`);
    } else {
      console.log('\n⚠️  No active sessions found');
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (user.role !== 'SUPER_ADMIN') {
      console.log('\n⚠️  WARNING: User role is NOT SUPER_ADMIN!');
      console.log('Current role:', user.role);
      console.log('\nTo fix, run: node scripts/promote-to-super-admin.js');
    } else {
      console.log('\n✅ User has SUPER_ADMIN role');
      console.log('\n💡 If you\'re seeing ADMIN in UI:');
      console.log('   1. Logout from the application');
      console.log('   2. Close all browser tabs');
      console.log('   3. Clear cookies for localhost');
      console.log('   4. Login again');
      console.log('\n   Session may contain old role information.');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

checkUserRole();
