import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined
}

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error("DATABASE_URL is missing")
}

const pool = global.pgPool ?? new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const basePrisma = global.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
  global.prisma = basePrisma
  global.pgPool = pool
}

const SITE_SCOPED_MODELS = new Set([
  "User",
  "Department",
  "SecurityEvent",
  "TrustedIp",
])

export function getSiteScopedPrisma(siteId: string) {
  return basePrisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (!SITE_SCOPED_MODELS.has(model)) {
            return query(args)
          }

          if (operation === "create") {
            args.data = { ...args.data, siteId }
            return query(args)
          }

          if (operation === "createMany") {
            args.data = args.data.map((item: Record<string, unknown>) => ({
              ...item,
              siteId,
            }))
            return query(args)
          }

          const opsNeedingWhere = new Set([
            "findMany",
            "findFirst",
            "updateMany",
            "deleteMany",
            "count",
            "aggregate",
            "groupBy",
          ])

          if (opsNeedingWhere.has(operation)) {
            args.where = { ...args.where, siteId }
            return query(args)
          }

          // For findUnique/update/delete/upsert we enforce explicit siteId usage
          const where = args.where as Record<string, unknown> | undefined
          if (!where || where.siteId !== siteId) {
            throw new Error("Site isolation requires explicit siteId filter")
          }

          return query(args)
        },
      },
    },
  })
}

export { basePrisma }
export { basePrisma as prisma } // Alias for compatibility