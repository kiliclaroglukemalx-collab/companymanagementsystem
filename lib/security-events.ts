/**
 * Security Event Types and Utilities
 */

// Security Event Types
export const SecurityEventType = {
  // Authentication Events
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGOUT: "LOGOUT",
  PASSWORD_CHANGED: "PASSWORD_CHANGED",
  PASSWORD_RESET_REQUESTED: "PASSWORD_RESET_REQUESTED",
  TWO_FACTOR_ENABLED: "TWO_FACTOR_ENABLED",
  TWO_FACTOR_DISABLED: "TWO_FACTOR_DISABLED",
  
  // Session Events
  SESSION_CREATED: "SESSION_CREATED",
  SESSION_TERMINATED: "SESSION_TERMINATED",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  SUSPICIOUS_SESSION: "SUSPICIOUS_SESSION",
  
  // Access Control Events
  UNAUTHORIZED_ACCESS_ATTEMPT: "UNAUTHORIZED_ACCESS_ATTEMPT",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  PRIVILEGE_ESCALATION_ATTEMPT: "PRIVILEGE_ESCALATION_ATTEMPT",
  
  // Account Events
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  ACCOUNT_UNLOCKED: "ACCOUNT_UNLOCKED",
  ACCOUNT_CREATED: "ACCOUNT_CREATED",
  ACCOUNT_DELETED: "ACCOUNT_DELETED",
  ACCOUNT_MODIFIED: "ACCOUNT_MODIFIED",
  
  // Data Events
  SENSITIVE_DATA_ACCESS: "SENSITIVE_DATA_ACCESS",
  DATA_EXPORT: "DATA_EXPORT",
  BULK_OPERATION: "BULK_OPERATION",
  
  // Security Alerts
  BRUTE_FORCE_ATTEMPT: "BRUTE_FORCE_ATTEMPT",
  SUSPICIOUS_IP: "SUSPICIOUS_IP",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  SQL_INJECTION_ATTEMPT: "SQL_INJECTION_ATTEMPT",
  XSS_ATTEMPT: "XSS_ATTEMPT",
} as const

export type SecurityEventTypeValue = typeof SecurityEventType[keyof typeof SecurityEventType]

// Severity Levels
export enum SecurityEventSeverity {
  INFO = "INFO",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

// Event Type Metadata
export const SecurityEventMetadata: Record<
  SecurityEventTypeValue,
  {
    label: string
    severity: SecurityEventSeverity
    category: "auth" | "session" | "access" | "account" | "data" | "alert"
    description: string
    requiresResolution: boolean
  }
> = {
  // Authentication Events
  [SecurityEventType.LOGIN_SUCCESS]: {
    label: "Successful Login",
    severity: SecurityEventSeverity.INFO,
    category: "auth",
    description: "User successfully authenticated",
    requiresResolution: false,
  },
  [SecurityEventType.LOGIN_FAILED]: {
    label: "Failed Login",
    severity: SecurityEventSeverity.LOW,
    category: "auth",
    description: "Login attempt failed",
    requiresResolution: false,
  },
  [SecurityEventType.LOGOUT]: {
    label: "Logout",
    severity: SecurityEventSeverity.INFO,
    category: "auth",
    description: "User logged out",
    requiresResolution: false,
  },
  [SecurityEventType.PASSWORD_CHANGED]: {
    label: "Password Changed",
    severity: SecurityEventSeverity.INFO,
    category: "auth",
    description: "User changed their password",
    requiresResolution: false,
  },
  [SecurityEventType.PASSWORD_RESET_REQUESTED]: {
    label: "Password Reset Requested",
    severity: SecurityEventSeverity.MEDIUM,
    category: "auth",
    description: "Password reset was requested",
    requiresResolution: true,
  },
  [SecurityEventType.TWO_FACTOR_ENABLED]: {
    label: "2FA Enabled",
    severity: SecurityEventSeverity.INFO,
    category: "auth",
    description: "Two-factor authentication enabled",
    requiresResolution: false,
  },
  [SecurityEventType.TWO_FACTOR_DISABLED]: {
    label: "2FA Disabled",
    severity: SecurityEventSeverity.MEDIUM,
    category: "auth",
    description: "Two-factor authentication disabled",
    requiresResolution: true,
  },
  
  // Session Events
  [SecurityEventType.SESSION_CREATED]: {
    label: "Session Created",
    severity: SecurityEventSeverity.INFO,
    category: "session",
    description: "New session created",
    requiresResolution: false,
  },
  [SecurityEventType.SESSION_TERMINATED]: {
    label: "Session Terminated",
    severity: SecurityEventSeverity.INFO,
    category: "session",
    description: "Session was terminated",
    requiresResolution: false,
  },
  [SecurityEventType.SESSION_EXPIRED]: {
    label: "Session Expired",
    severity: SecurityEventSeverity.INFO,
    category: "session",
    description: "Session expired due to inactivity",
    requiresResolution: false,
  },
  [SecurityEventType.SUSPICIOUS_SESSION]: {
    label: "Suspicious Session",
    severity: SecurityEventSeverity.HIGH,
    category: "session",
    description: "Session exhibited suspicious behavior",
    requiresResolution: true,
  },
  
  // Access Control Events
  [SecurityEventType.UNAUTHORIZED_ACCESS_ATTEMPT]: {
    label: "Unauthorized Access",
    severity: SecurityEventSeverity.HIGH,
    category: "access",
    description: "Attempted to access unauthorized resource",
    requiresResolution: true,
  },
  [SecurityEventType.PERMISSION_DENIED]: {
    label: "Permission Denied",
    severity: SecurityEventSeverity.MEDIUM,
    category: "access",
    description: "Access denied due to insufficient permissions",
    requiresResolution: false,
  },
  [SecurityEventType.PRIVILEGE_ESCALATION_ATTEMPT]: {
    label: "Privilege Escalation",
    severity: SecurityEventSeverity.CRITICAL,
    category: "access",
    description: "Attempted to escalate privileges",
    requiresResolution: true,
  },
  
  // Account Events
  [SecurityEventType.ACCOUNT_LOCKED]: {
    label: "Account Locked",
    severity: SecurityEventSeverity.MEDIUM,
    category: "account",
    description: "User account locked",
    requiresResolution: true,
  },
  [SecurityEventType.ACCOUNT_UNLOCKED]: {
    label: "Account Unlocked",
    severity: SecurityEventSeverity.INFO,
    category: "account",
    description: "User account unlocked",
    requiresResolution: false,
  },
  [SecurityEventType.ACCOUNT_CREATED]: {
    label: "Account Created",
    severity: SecurityEventSeverity.INFO,
    category: "account",
    description: "New user account created",
    requiresResolution: false,
  },
  [SecurityEventType.ACCOUNT_DELETED]: {
    label: "Account Deleted",
    severity: SecurityEventSeverity.MEDIUM,
    category: "account",
    description: "User account deleted",
    requiresResolution: false,
  },
  [SecurityEventType.ACCOUNT_MODIFIED]: {
    label: "Account Modified",
    severity: SecurityEventSeverity.INFO,
    category: "account",
    description: "User account settings modified",
    requiresResolution: false,
  },
  
  // Data Events
  [SecurityEventType.SENSITIVE_DATA_ACCESS]: {
    label: "Sensitive Data Access",
    severity: SecurityEventSeverity.MEDIUM,
    category: "data",
    description: "Sensitive data was accessed",
    requiresResolution: false,
  },
  [SecurityEventType.DATA_EXPORT]: {
    label: "Data Export",
    severity: SecurityEventSeverity.MEDIUM,
    category: "data",
    description: "Data was exported",
    requiresResolution: true,
  },
  [SecurityEventType.BULK_OPERATION]: {
    label: "Bulk Operation",
    severity: SecurityEventSeverity.MEDIUM,
    category: "data",
    description: "Bulk data operation performed",
    requiresResolution: true,
  },
  
  // Security Alerts
  [SecurityEventType.BRUTE_FORCE_ATTEMPT]: {
    label: "Brute Force Attack",
    severity: SecurityEventSeverity.CRITICAL,
    category: "alert",
    description: "Possible brute force attack detected",
    requiresResolution: true,
  },
  [SecurityEventType.SUSPICIOUS_IP]: {
    label: "Suspicious IP",
    severity: SecurityEventSeverity.HIGH,
    category: "alert",
    description: "Activity from suspicious IP address",
    requiresResolution: true,
  },
  [SecurityEventType.RATE_LIMIT_EXCEEDED]: {
    label: "Rate Limit Exceeded",
    severity: SecurityEventSeverity.MEDIUM,
    category: "alert",
    description: "API rate limit exceeded",
    requiresResolution: true,
  },
  [SecurityEventType.SQL_INJECTION_ATTEMPT]: {
    label: "SQL Injection",
    severity: SecurityEventSeverity.CRITICAL,
    category: "alert",
    description: "SQL injection attempt detected",
    requiresResolution: true,
  },
  [SecurityEventType.XSS_ATTEMPT]: {
    label: "XSS Attack",
    severity: SecurityEventSeverity.CRITICAL,
    category: "alert",
    description: "Cross-site scripting attempt detected",
    requiresResolution: true,
  },
}

// Helper functions
export function getEventMetadata(type: string) {
  return SecurityEventMetadata[type as SecurityEventTypeValue] || {
    label: type,
    severity: SecurityEventSeverity.INFO,
    category: "data" as const,
    description: "Unknown event type",
    requiresResolution: false,
  }
}

export function getSeverityColor(severity: SecurityEventSeverity): string {
  switch (severity) {
    case SecurityEventSeverity.CRITICAL:
      return "bg-red-100 text-red-800 border-red-200"
    case SecurityEventSeverity.HIGH:
      return "bg-orange-100 text-orange-800 border-orange-200"
    case SecurityEventSeverity.MEDIUM:
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case SecurityEventSeverity.LOW:
      return "bg-blue-100 text-blue-800 border-blue-200"
    case SecurityEventSeverity.INFO:
      return "bg-slate-100 text-slate-800 border-slate-200"
    default:
      return "bg-slate-100 text-slate-800 border-slate-200"
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case "auth":
      return "bg-green-100 text-green-800 border-green-200"
    case "session":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "access":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "account":
      return "bg-indigo-100 text-indigo-800 border-indigo-200"
    case "data":
      return "bg-cyan-100 text-cyan-800 border-cyan-200"
    case "alert":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-slate-100 text-slate-800 border-slate-200"
  }
}

export function formatEventMeta(metaJson: any): string {
  if (!metaJson || typeof metaJson !== "object") return ""
  
  const entries = Object.entries(metaJson)
    .filter(([key]) => !key.startsWith("_"))
    .map(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, " $1").trim()
      return `${formattedKey}: ${JSON.stringify(value)}`
    })
  
  return entries.join(", ")
}
