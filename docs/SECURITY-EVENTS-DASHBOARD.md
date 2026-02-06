# Security Events Dashboard

## Overview

The Security Events Dashboard is a comprehensive read-only monitoring interface for tracking and managing security-related events across your multi-tenant enterprise system. It provides role-based access control, site isolation, and detailed event analysis capabilities.

## Features

### 1. Event Monitoring
- **Real-time tracking** of security events across all sites
- **Categorization** by severity, type, and category
- **Filtering and search** capabilities
- **Pagination** for handling large datasets
- **Detailed event metadata** with expandable views

### 2. Role-Based Access Control
- **SUPER_ADMIN**: Full access to all security events across all sites
- **ADMIN**: Access limited to events from their assigned site
- **MANAGER/STAFF**: No access (blocked with clear error message)

### 3. Site Isolation
- Automatic enforcement of site-level data isolation
- SUPER_ADMIN can filter by specific sites
- ADMIN users only see events from their site
- All server actions validate site access permissions

### 4. Event Resolution
- **Single event resolution**: Mark individual events as resolved
- **Bulk resolution**: Resolve multiple events at once
- **Resolution tracking**: Records who resolved each event and when
- **Resolution metadata**: Optional notes and context

### 5. Statistics Dashboard
- **Total events** count
- **Unresolved events** requiring attention
- **Resolved events** count
- **Recent activity** (last 24 hours)
- **Severity distribution** visualization
- **Category breakdown** by event type

## Event Types

### Authentication Events
- `LOGIN_SUCCESS` - User successfully authenticated
- `LOGIN_FAILED` - Failed login attempt
- `LOGOUT` - User logged out
- `PASSWORD_CHANGED` - Password updated
- `PASSWORD_RESET_REQUESTED` - Password reset initiated
- `TWO_FACTOR_ENABLED` - 2FA activated
- `TWO_FACTOR_DISABLED` - 2FA deactivated

### Session Events
- `SESSION_CREATED` - New session initiated
- `SESSION_TERMINATED` - Session ended
- `SESSION_EXPIRED` - Session timeout
- `SUSPICIOUS_SESSION` - Anomalous session behavior detected

### Access Control Events
- `UNAUTHORIZED_ACCESS_ATTEMPT` - Attempted unauthorized resource access
- `PERMISSION_DENIED` - Insufficient permissions
- `PRIVILEGE_ESCALATION_ATTEMPT` - Attempted privilege escalation

### Account Events
- `ACCOUNT_LOCKED` - User account locked
- `ACCOUNT_UNLOCKED` - User account unlocked
- `ACCOUNT_CREATED` - New user account created
- `ACCOUNT_DELETED` - User account deleted
- `ACCOUNT_MODIFIED` - User account settings changed

### Data Events
- `SENSITIVE_DATA_ACCESS` - Sensitive data accessed
- `DATA_EXPORT` - Data exported
- `BULK_OPERATION` - Bulk data operation performed

### Security Alerts
- `BRUTE_FORCE_ATTEMPT` - Brute force attack detected
- `SUSPICIOUS_IP` - Activity from suspicious IP
- `RATE_LIMIT_EXCEEDED` - API rate limit exceeded
- `SQL_INJECTION_ATTEMPT` - SQL injection detected
- `XSS_ATTEMPT` - Cross-site scripting detected

## Severity Levels

- **CRITICAL**: Immediate action required (red)
- **HIGH**: High priority issue (orange)
- **MEDIUM**: Moderate concern (yellow)
- **LOW**: Minor issue (blue)
- **INFO**: Informational only (gray)

## Categories

- **auth**: Authentication-related events
- **session**: Session management events
- **access**: Access control events
- **account**: Account management events
- **data**: Data-related events
- **alert**: Security alerts and threats

## Usage

### Accessing the Dashboard

Navigate to `/admin/security-events` in the admin panel. The dashboard is accessible to SUPER_ADMIN and ADMIN roles only.

### Filtering Events

Use the filter controls at the top of the dashboard:
- **Site**: Filter by specific site (SUPER_ADMIN only)
- **Status**: Show all, unresolved, or resolved events
- **Event Type**: Filter by specific event type

### Resolving Events

1. **Single Event**: Click the green checkmark button next to an event
2. **Bulk Resolution**: 
   - Select multiple events using checkboxes
   - Click "Resolve Selected (N)" button
   - Confirm the action

### Viewing Event Details

Click the "Details" button next to any event to expand and view the complete metadata JSON.

## Logging Security Events

### Basic Usage

```typescript
import { logSecurityEvent } from "@/lib/log-security-event"
import { SecurityEventType } from "@/lib/security-events"

await logSecurityEvent({
  siteId: user.siteId,
  userId: user.id,
  type: SecurityEventType.LOGIN_SUCCESS,
  metaJson: {
    ip: request.ip,
    userAgent: request.headers["user-agent"],
  },
})
```

### Convenience Functions

#### Authentication Events
```typescript
import { logAuthEvent } from "@/lib/log-security-event"
import { SecurityEventType } from "@/lib/security-events"

await logAuthEvent(
  siteId,
  userId,
  SecurityEventType.LOGIN_FAILED,
  {
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0...",
    success: false,
    reason: "Invalid password",
  }
)
```

#### Session Events
```typescript
import { logSessionEvent } from "@/lib/log-security-event"
import { SecurityEventType } from "@/lib/security-events"

await logSessionEvent(
  siteId,
  userId,
  sessionId,
  SecurityEventType.SESSION_CREATED,
  {
    ip: "192.168.1.1",
    deviceLabel: "MacBook Pro",
  }
)
```

#### Access Control Events
```typescript
import { logAccessEvent } from "@/lib/log-security-event"
import { SecurityEventType } from "@/lib/security-events"

await logAccessEvent(
  siteId,
  userId,
  SecurityEventType.UNAUTHORIZED_ACCESS_ATTEMPT,
  {
    resource: "/admin/sites",
    action: "DELETE",
    ip: "192.168.1.1",
    reason: "Insufficient permissions",
  }
)
```

#### Security Alerts
```typescript
import { logSecurityAlert } from "@/lib/log-security-event"
import { SecurityEventType } from "@/lib/security-events"

await logSecurityAlert(
  siteId,
  null, // userId can be null for system-level alerts
  SecurityEventType.BRUTE_FORCE_ATTEMPT,
  {
    ip: "198.51.100.50",
    endpoint: "/login",
    payload: { attempts: 15 },
    reason: "Multiple failed login attempts",
  }
)
```

## Server Actions

### List Security Events
```typescript
import { listSecurityEvents } from "@/lib/admin-actions"

const result = await listSecurityEvents({
  siteId: "site_123", // Optional, SUPER_ADMIN only
  userId: "user_456", // Optional
  type: SecurityEventType.LOGIN_FAILED, // Optional
  resolved: false, // Optional: true, false, or undefined
  page: 1,
  limit: 50,
})
```

### Resolve Single Event
```typescript
import { resolveSecurityEvent } from "@/lib/admin-actions"

const result = await resolveSecurityEvent(
  eventId,
  "Investigated and confirmed legitimate activity"
)
```

### Bulk Resolve Events
```typescript
import { bulkResolveSecurityEvents } from "@/lib/admin-actions"

const result = await bulkResolveSecurityEvents([
  "event_1",
  "event_2",
  "event_3",
])
```

### Get Statistics
```typescript
import { getSecurityEventStats } from "@/lib/admin-actions"

const result = await getSecurityEventStats()
// Returns: { total, unresolved, bySeverity, byCategory, recentCount }
```

## Database Schema

The `SecurityEvent` model in Prisma:

```prisma
model SecurityEvent {
  id         String    @id @default(cuid())
  siteId     String
  userId     String?
  type       String
  metaJson   Json
  createdAt  DateTime  @default(now())
  resolvedAt DateTime?
  resolvedBy String?

  site Site  @relation(fields: [siteId], references: [id], onDelete: Cascade)
  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([siteId])
  @@index([userId])
}
```

## Testing

### Seed Sample Events

Run the seed script to populate sample security events for testing:

```bash
node scripts/seed-security-events.js
```

This will create:
- 10 sample security events
- Mix of resolved and unresolved events
- Various event types and severities
- Events across different time periods

### Manual Testing Checklist

1. **Access Control**
   - [ ] SUPER_ADMIN can access dashboard
   - [ ] ADMIN can access dashboard (only their site)
   - [ ] MANAGER cannot access dashboard
   - [ ] STAFF cannot access dashboard

2. **Filtering**
   - [ ] Filter by site works (SUPER_ADMIN)
   - [ ] Filter by status (all/resolved/unresolved)
   - [ ] Filter by event type
   - [ ] Pagination works correctly

3. **Resolution**
   - [ ] Single event resolution works
   - [ ] Bulk resolution works
   - [ ] Cannot resolve already resolved events
   - [ ] Resolution is recorded with timestamp and user

4. **Statistics**
   - [ ] Total count is accurate
   - [ ] Unresolved count is accurate
   - [ ] Recent count (24h) is accurate
   - [ ] Severity distribution is correct

## Security Considerations

1. **Site Isolation**: All queries automatically filter by site for ADMIN users
2. **Role Validation**: Server actions enforce role requirements before processing
3. **Read-Only**: Dashboard is read-only except for resolution actions
4. **Audit Trail**: All resolutions are tracked with user ID and timestamp
5. **No Deletion**: Events cannot be deleted, only resolved
6. **Error Handling**: Failed logging attempts don't break main application flow

## UI Consistency

The dashboard follows your existing design patterns:
- **Slate color scheme** for main interface
- **Status badges** with semantic colors
- **Alert components** for error messages
- **shadcn/ui components** throughout
- **Responsive design** with mobile support
- **Lucide icons** for visual consistency

## Future Enhancements

Potential improvements for future iterations:

1. **Real-time Updates**: WebSocket integration for live event updates
2. **Email Alerts**: Automated notifications for critical events
3. **Event Correlation**: Link related events together
4. **Advanced Analytics**: Charts and graphs for trend analysis
5. **Export Functionality**: CSV/JSON export of filtered events
6. **Custom Event Types**: Allow defining organization-specific event types
7. **Retention Policies**: Automatic archival of old events
8. **Integration**: Webhook support for external SIEM systems

## Support

For issues or questions about the Security Events Dashboard, please refer to the main project documentation or contact the development team.
