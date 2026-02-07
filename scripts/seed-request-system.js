/**
 * Seed script for Request System
 * 
 * Bu script talep sistemi için örnek veriler oluşturur:
 * - Tüm kullanıcılara maaş bilgisi atar
 * - Örnek izin/mesai talepleri oluşturur
 * - Örnek avans talepleri oluşturur
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedRequestSystem() {
  console.log('🌱 Starting Request System seed...')

  try {
    // 1. Tüm kullanıcılara maaş bilgisi ekle
    console.log('📊 Adding salary information to users...')
    
    const users = await prisma.user.findMany({
      where: {
        isActive: true
      }
    })

    for (const user of users) {
      // Random maaş: 30,000 - 150,000 TL arası
      const baseSalary = user.role === 'SUPER_ADMIN' ? 100000 : 
                        user.role === 'ADMIN' ? 80000 :
                        user.role === 'MANAGER' ? 60000 : 40000
      
      const monthlySalary = baseSalary + Math.floor(Math.random() * 30000)

      await prisma.userSalary.upsert({
        where: { userId: user.id },
        update: {
          monthlySalary,
          currency: 'TRY'
        },
        create: {
          userId: user.id,
          monthlySalary,
          currency: 'TRY'
        }
      })
    }

    console.log(`✅ Added salary info to ${users.length} users`)

    // 2. Örnek İzin/Mesai Talepleri Oluştur
    console.log('📅 Creating sample leave/overtime requests...')

    const staff = users.filter(u => u.role === 'STAFF' && u.departmentId)
    const managers = users.filter(u => u.role === 'MANAGER')

    if (staff.length > 0 && managers.length > 0) {
      // Her personel için 1-2 talep
      for (let i = 0; i < Math.min(5, staff.length); i++) {
        const person = staff[i]
        
        // Birim müdürünü bul
        const manager = managers.find(m => m.departmentId === person.departmentId)
        if (!manager) continue

        // İzin talebi
        const leaveStartDate = new Date()
        leaveStartDate.setDate(leaveStartDate.getDate() + Math.floor(Math.random() * 30) + 5)
        const leaveEndDate = new Date(leaveStartDate)
        leaveEndDate.setDate(leaveEndDate.getDate() + Math.floor(Math.random() * 5) + 1)
        const days = Math.ceil((leaveEndDate - leaveStartDate) / (1000 * 60 * 60 * 24)) + 1

        await prisma.request.create({
          data: {
            type: 'LEAVE',
            status: i % 3 === 0 ? 'APPROVED' : i % 3 === 1 ? 'PENDING' : 'REJECTED',
            requestedById: person.id,
            approverId: manager.id,
            reason: 'Yıllık izin talebi',
            approvedAt: i % 3 === 0 ? new Date() : null,
            rejectedAt: i % 3 === 2 ? new Date() : null,
            rejectionReason: i % 3 === 2 ? 'Personel yetersizliği nedeniyle' : null,
            leaveRequest: {
              create: {
                leaveType: 'ANNUAL',
                startDate: leaveStartDate,
                endDate: leaveEndDate,
                days: days,
                isReflectedToCalendar: i % 3 === 0,
                reflectedAt: i % 3 === 0 ? new Date() : null
              }
            }
          }
        })
      }

      console.log('✅ Created sample leave requests')
    }

    // 3. Örnek Avans Talepleri Oluştur
    console.log('💰 Creating sample advance requests...')

    // Finans müdürünü bul
    const financeManager = await prisma.user.findFirst({
      where: {
        role: 'MANAGER',
        department: {
          name: {
            contains: 'Finans',
            mode: 'insensitive'
          }
        }
      }
    })

    if (financeManager && staff.length > 0) {
      // Farklı birimlerden 3 avans talebi
      for (let i = 0; i < Math.min(3, staff.length); i++) {
        const person = staff[i]
        const userSalary = await prisma.userSalary.findUnique({
          where: { userId: person.id }
        })

        if (userSalary) {
          // Maaşın %30-70'i arası avans
          const amount = Math.floor(userSalary.monthlySalary * (0.3 + Math.random() * 0.4))

          await prisma.request.create({
            data: {
              type: 'ADVANCE',
              status: i % 2 === 0 ? 'PENDING' : 'APPROVED',
              requestedById: person.id,
              approverId: financeManager.id,
              reason: 'Acil maddi ihtiyaç nedeniyle avans talebi',
              approvedAt: i % 2 === 1 ? new Date() : null,
              advanceRequest: {
                create: {
                  amount: amount,
                  userSalary: userSalary.monthlySalary,
                  isPaid: i % 2 === 1,
                  paidAt: i % 2 === 1 ? new Date() : null
                }
              }
            }
          })
        }
      }

      console.log('✅ Created sample advance requests')
    }

    console.log('✅ Request System seed completed!')

    // Stats
    const requestCount = await prisma.request.count()
    const salaryCount = await prisma.userSalary.count()
    
    console.log('\n📊 Summary:')
    console.log(`   - Total Salaries: ${salaryCount}`)
    console.log(`   - Total Requests: ${requestCount}`)
    console.log(`   - Pending: ${await prisma.request.count({ where: { status: 'PENDING' } })}`)
    console.log(`   - Approved: ${await prisma.request.count({ where: { status: 'APPROVED' } })}`)
    console.log(`   - Rejected: ${await prisma.request.count({ where: { status: 'REJECTED' } })}`)

  } catch (error) {
    console.error('❌ Error seeding request system:', error)
    throw error
  }
}

// Eğer direkt çalıştırılırsa
if (require.main === module) {
  seedRequestSystem()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

module.exports = { seedRequestSystem }
