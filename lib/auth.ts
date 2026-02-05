import { createHash } from "crypto"
import { jwtVerify, SignJWT } from "jose"
import { basePrisma } from "@/lib/prisma"

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "STAFF"

export type AuthContext = {
  userId: string
  siteId: string
  role: UserRole
  sessionId: string
}

export const AUTH_COOKIE = "cms-auth"
export const SESSION_TTL_DAYS = 7

export class AuthError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return null
  }
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function getRequestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "0.0.0.0"
  }
  return request.headers.get("x-real-ip") || "0.0.0.0"
}

export function hashDeviceFingerprint(value: string | null) {
  const input = value ?? ""
  return createHash("sha256").update(input).digest("hex")
}

export async function signSessionToken(payload: {
  sessionId: string
  userId: string
  siteId: string
  role: UserRole
}) {
  const secret = process.env.AUTH_SECRET_KEY
  if (!secret) {
    throw new AuthError(500, "AUTH_SECRET_KEY is missing")
  }

  return new SignJWT({
    siteId: payload.siteId,
    role: payload.role,
    sid: payload.sessionId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_DAYS}d`)
    .setJti(payload.sessionId)
    .sign(new TextEncoder().encode(secret))
}

export async function verifySessionToken(token: string) {
  const secret = process.env.AUTH_SECRET_KEY
  if (!secret) {
    throw new AuthError(500, "AUTH_SECRET_KEY is missing")
  }
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
  const siteId = payload.siteId
  const role = payload.role
  const userId = payload.sub
  const sessionId = payload.sid

  if (
    typeof siteId !== "string" ||
    typeof role !== "string" ||
    typeof userId !== "string" ||
    typeof sessionId !== "string"
  ) {
    return null
  }

  return {
    siteId,
    role: role as UserRole,
    userId,
    sessionId,
  } satisfies AuthContext
}

export function setSessionCookie(response: Response, token: string) {
  const secure = process.env.NODE_ENV === "production"
  const maxAge = SESSION_TTL_DAYS * 24 * 60 * 60
  response.headers.append(
    "Set-Cookie",
    `${AUTH_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge};${secure ? " Secure;" : ""}`
  )
}

export function clearSessionCookie(response: Response) {
  response.headers.append(
    "Set-Cookie",
    `${AUTH_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0;`
  )
}

export async function getAuthContext(request: Request) {
  const authHeader = request.headers.get("authorization")
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null
  const cookieToken = getCookieValue(request.headers.get("cookie"), AUTH_COOKIE)
  const token = bearer || cookieToken

  if (!token) {
    return null
  }

  const payload = await verifySessionToken(token)
  if (!payload) {
    return null
  }

  const session = await basePrisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  })

  if (!session || session.revokedAt) {
    return null
  }

  if (
    !session.user.isActive ||
    session.user.siteId !== payload.siteId ||
    session.user.role !== payload.role
  ) {
    return null
  }

  await basePrisma.session.update({
    where: { id: session.id },
    data: { lastSeenAt: new Date() },
  })

  return payload
}

export async function requireAuth(request: Request) {
  const auth = await getAuthContext(request)
  if (!auth) {
    throw new AuthError(401, "Unauthorized")
  }
  return auth
}

export function assertSiteAccess(auth: AuthContext, resourceSiteId: string) {
  if (auth.siteId !== resourceSiteId) {
    throw new AuthError(403, "Forbidden")
  }
}
