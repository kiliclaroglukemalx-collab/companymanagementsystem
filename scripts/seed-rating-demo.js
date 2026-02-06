/**
 * Rating System Seeder
 * Creates demo rating criteria and ratings for testing
 * 
 * ⚠️ WARNING: This script is for DEVELOPMENT/DEMO purposes only!
 * DO NOT run in production - it creates fake test data.
 * 
 * Usage:
 *   node scripts/seed-rating-demo.js
 * 
 * Prerequisites:
 *   - Database must be accessible
 *   - Rating models must exist in schema
 *   - Sites and departments must exist
 */

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// Demo criteria templates (Turkish)
const CRITERIA_TEMPLATES = [
  { name: "İletişim Becerileri", weight: 20 },
  { name: "Takım Çalışması", weight: 15 },
  { name: "Teknik Yeterlilik", weight: 25 },
  { name: "Problem Çözme", weight: 20 },
  { name: "Zaman Yönetimi", weight: 10 },
  { name: "Yaratıcılık", weight: 10 },
]

function getRandomScore() {
  // Generate realistic scores (mostly 6-9, sometimes 4-5 or 10)
  const rand = Math.random()
  if (rand < 0.1) return 4 + Math.floor(Math.random() * 2) // 4-5 (10%)
  if (rand < 0.9) return 6 + Math.floor(Math.random() * 4) // 6-9 (80%)
  return 10 // 10 (10%)
}

function getRandomDateInLast7Days() {
  const now = new Date()
  const daysAgo = Math.floor(Math.random() * 7)
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
  return date.toISOString().split("T")[0]
}

async function main() {
  console.log("🌱 Seeding Rating System...")
  
  // Get all departments
  const departments = await prisma.department.findMany({
    include: {
      site: true,
      users: {
        where: { isActive: true },
        select: { id: true, name: true },
      },
    },
  })
  
  if (departments.length === 0) {
    console.error("❌ No departments found. Please seed departments first.")
    process.exit(1)
  }
  
  console.log(`📍 Found ${departments.length} department(s)`)
  
  // Clear existing rating data
  await prisma.ratingScore.deleteMany({})
  await prisma.rating.deleteMany({})
  await prisma.ratingCriteria.deleteMany({})
  console.log("🗑️  Cleared existing rating data")
  
  let totalCriteria = 0
  let totalRatings = 0
  
  // Create criteria and ratings for each department
  for (const department of departments) {
    console.log(`\n🏢 Department: ${department.name} (${department.site.name})`)
    
    if (department.users.length < 2) {
      console.log("   ⚠️  Not enough users (need at least 2), skipping...")
      continue
    }
    
    // Create criteria for this department
    console.log("   📋 Creating criteria...")
    const createdCriteria = []
    
    for (const template of CRITERIA_TEMPLATES) {
      const criteria = await prisma.ratingCriteria.create({
        data: {
          departmentId: department.id,
          name: template.name,
          weight: template.weight,
          isActive: true,
        },
      })
      createdCriteria.push(criteria)
    }
    
    console.log(`   ✅ Created ${createdCriteria.length} criteria`)
    totalCriteria += createdCriteria.length
    
    // Create random ratings for last 7 days
    console.log("   ⭐ Creating ratings...")
    let departmentRatings = 0
    
    const users = department.users
    const ratingPairs = new Set() // Track who rated whom on which day
    
    // Create 20-40 ratings per department
    const targetRatings = 20 + Math.floor(Math.random() * 21)
    
    for (let i = 0; i < targetRatings; i++) {
      // Pick random rater and rated (different users)
      const rater = users[Math.floor(Math.random() * users.length)]
      let rated = users[Math.floor(Math.random() * users.length)]
      
      // Make sure rater != rated
      let attempts = 0
      while (rated.id === rater.id && attempts < 10) {
        rated = users[Math.floor(Math.random() * users.length)]
        attempts++
      }
      
      if (rated.id === rater.id) continue // Skip if still same
      
      const date = getRandomDateInLast7Days()
      const pairKey = `${rater.id}-${rated.id}-${date}`
      
      if (ratingPairs.has(pairKey)) continue // Already rated on this day
      ratingPairs.add(pairKey)
      
      // Generate scores for all criteria
      const scores = createdCriteria.map((criteria) => ({
        criteriaId: criteria.id,
        score: getRandomScore(),
      }))
      
      const totalScore = scores.reduce((sum, s) => sum + s.score, 0) / scores.length
      
      // Create rating with scores
      try {
        await prisma.rating.create({
          data: {
            siteId: department.siteId,
            departmentId: department.id,
            raterUserId: rater.id,
            ratedUserId: rated.id,
            date,
            totalScore,
            scores: {
              create: scores,
            },
          },
        })
        departmentRatings++
      } catch (error) {
        // Skip duplicates
        continue
      }
    }
    
    console.log(`   ✅ Created ${departmentRatings} ratings`)
    totalRatings += departmentRatings
  }
  
  console.log(`\n✨ Successfully seeded rating system!`)
  console.log(`   📋 Total Criteria: ${totalCriteria}`)
  console.log(`   ⭐ Total Ratings: ${totalRatings}`)
  
  // Show sample ratings
  console.log("\n🔥 Sample Ratings:")
  const sampleRatings = await prisma.rating.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      rater: { select: { name: true } },
      rated: { select: { name: true } },
      department: { select: { name: true } },
      scores: {
        include: {
          criteria: { select: { name: true } },
        },
      },
    },
  })
  
  for (const rating of sampleRatings) {
    console.log(`   • ${rating.rater.name} → ${rating.rated.name}: ${rating.totalScore?.toFixed(1)}/10`)
    console.log(`     ${rating.department.name}, ${rating.date}`)
  }
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:")
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
