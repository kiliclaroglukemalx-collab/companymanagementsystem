/**
 * Script to promote a user to SUPER_ADMIN
 * Usage: node scripts/promote-to-super-admin.js <email>
 * 
 * ⚠️ WARNING: This gives full system access!
 */

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function promoteToSuperAdmin(email) {
  if (!email) {
    console.error("❌ Error: Email is required")
    console.log("\nUsage: node scripts/promote-to-super-admin.js <email>")
    process.exit(1)
  }

  console.log(`\n🔍 Looking for user with email: ${email}...`)

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        siteId: true,
        isActive: true,
        mustChangePassword: true,
        site: {
          select: { name: true }
        }
      }
    })

    if (!user) {
      console.error(`\n❌ User not found with email: ${email}`)
      process.exit(1)
    }

    console.log("\n📋 Current User Info:")
    console.log(`   Name: ${user.name}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Current Role: ${user.role}`)
    console.log(`   Site: ${user.site?.name || 'N/A'}`)
    console.log(`   Active: ${user.isActive}`)
    console.log(`   Must Change Password: ${user.mustChangePassword}`)

    // Check if already SUPER_ADMIN
    if (user.role === "SUPER_ADMIN" && user.isActive && !user.mustChangePassword) {
      console.log("\n✅ User is already SUPER_ADMIN with correct settings!")
      process.exit(0)
    }

    // Update user
    console.log("\n🔄 Promoting user to SUPER_ADMIN...")
    
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        role: "SUPER_ADMIN",
        isActive: true,
        mustChangePassword: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
      }
    })

    console.log("\n✅ Successfully promoted user!")
    console.log("\n📋 Updated User Info:")
    console.log(`   Name: ${updatedUser.name}`)
    console.log(`   Email: ${updatedUser.email}`)
    console.log(`   New Role: ${updatedUser.role}`)
    console.log(`   Active: ${updatedUser.isActive}`)
    console.log(`   Must Change Password: ${updatedUser.mustChangePassword}`)

    console.log("\n🎉 Done! User now has full SUPER_ADMIN access.")
    console.log("   Please refresh the page or log in again to see changes.")

  } catch (error) {
    console.error("\n❌ Error promoting user:")
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Get email from command line
const email = process.argv[2]

promoteToSuperAdmin(email)
