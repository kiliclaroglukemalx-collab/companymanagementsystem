/**
 * Script to seed sample security events for testing
 * Run with: node scripts/seed-security-events.js
 */

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

// Security Event Types
const SecurityEventType = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGOUT: "LOGOUT",
  PASSWORD_CHANGED: "PASSWORD_CHANGED",
  SESSION_CREATED: "SESSION_CREATED",
  SESSION_TERMINATED: "SESSION_TERMINATED",
  UNAUTHORIZED_ACCESS_ATTEMPT: "UNAUTHORIZED_ACCESS_ATTEMPT",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  BRUTE_FORCE_ATTEMPT: "BRUTE_FORCE_ATTEMPT",
  SUSPICIOUS_IP: "SUSPICIOUS_IP",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
};

async function main() {
  console.log("Seeding security events...");
  
  // Get the first site and user for testing
  const site = await prisma.site.findFirst();
  const user = await prisma.user.findFirst();
  
  if (!site) {
    console.error("No site found. Please run the main seed first.");
    return;
  }
  
  if (!user) {
    console.error("No user found. Please run the main seed first.");
    return;
  }
  
  console.log(`Using site: ${site.name} (${site.id})`);
  console.log(`Using user: ${user.name} (${user.email})`);
  
  // Sample security events
  const events = [
    // Recent successful login
    {
      siteId: site.id,
      userId: user.id,
      type: SecurityEventType.LOGIN_SUCCESS,
      metaJson: {
        ip: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    
    // Failed login attempt
    {
      siteId: site.id,
      userId: user.id,
      type: SecurityEventType.LOGIN_FAILED,
      metaJson: {
        ip: "192.168.1.100",
        reason: "Invalid password",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    
    // Suspicious IP alert (unresolved)
    {
      siteId: site.id,
      userId: null,
      type: SecurityEventType.SUSPICIOUS_IP,
      metaJson: {
        ip: "203.0.113.42",
        reason: "IP from known malicious range",
        endpoint: "/admin/users",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    
    // Brute force attempt (unresolved)
    {
      siteId: site.id,
      userId: null,
      type: SecurityEventType.BRUTE_FORCE_ATTEMPT,
      metaJson: {
        ip: "198.51.100.50",
        attempts: 15,
        timeWindow: "5 minutes",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    
    // Unauthorized access attempt (unresolved)
    {
      siteId: site.id,
      userId: user.id,
      type: SecurityEventType.UNAUTHORIZED_ACCESS_ATTEMPT,
      metaJson: {
        resource: "/admin/sites",
        action: "CREATE",
        ip: "192.168.1.100",
        reason: "Insufficient permissions",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    
    // Rate limit exceeded (unresolved)
    {
      siteId: site.id,
      userId: user.id,
      type: SecurityEventType.RATE_LIMIT_EXCEEDED,
      metaJson: {
        endpoint: "/api/users",
        requestCount: 150,
        limit: 100,
        timeWindow: "1 minute",
        ip: "192.168.1.100",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    
    // Password changed
    {
      siteId: site.id,
      userId: user.id,
      type: SecurityEventType.PASSWORD_CHANGED,
      metaJson: {
        ip: "192.168.1.100",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      resolvedAt: new Date(Date.now() - 11 * 60 * 60 * 1000),
      resolvedBy: user.id,
    },
    
    // Session created
    {
      siteId: site.id,
      userId: user.id,
      type: SecurityEventType.SESSION_CREATED,
      metaJson: {
        ip: "192.168.1.100",
        deviceLabel: "MacBook Pro",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    
    // Permission denied
    {
      siteId: site.id,
      userId: user.id,
      type: SecurityEventType.PERMISSION_DENIED,
      metaJson: {
        resource: "/admin/sites",
        action: "DELETE",
        ip: "192.168.1.100",
        timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
      resolvedAt: new Date(Date.now() - 35 * 60 * 60 * 1000),
      resolvedBy: user.id,
    },
    
    // Account locked (resolved)
    {
      siteId: site.id,
      userId: user.id,
      type: SecurityEventType.ACCOUNT_LOCKED,
      metaJson: {
        reason: "Too many failed login attempts",
        ip: "192.168.1.100",
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      resolvedAt: new Date(Date.now() - 47 * 60 * 60 * 1000),
      resolvedBy: user.id,
    },
  ];
  
  // Create all events
  let created = 0;
  for (const event of events) {
    await prisma.securityEvent.create({ data: event });
    created++;
  }
  
  console.log(`✓ Created ${created} sample security events`);
  console.log("\nEvent breakdown:");
  console.log(`  - ${events.filter(e => !e.resolvedAt).length} unresolved events`);
  console.log(`  - ${events.filter(e => e.resolvedAt).length} resolved events`);
  console.log("\nYou can now visit /admin/security-events to view the dashboard!");
}

main()
  .catch((error) => {
    console.error("Error seeding security events:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
