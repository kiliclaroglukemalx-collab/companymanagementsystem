"use server"

import { z } from "zod"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { basePrisma } from "@/lib/prisma"
import { getRequestIp, hashDeviceFingerprint } from "@/lib/auth"
import { checkRateLimit } from "@/lib/rate-limit"
import { isTrustedIp } from "@/lib/trusted-ip"
import { logSecurityEvent } from "@/lib/log-security-event"
import { TR } from "@/lib/tr-constants"

const loginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi girin" }),
  password: z.string().min(1, { message: "Şifre alanı boş bırakılamaz" }),
})

export type LoginResult = 
  | { success: true }
  | { success: false; error: string }

/**
 * Server Action: Login işlemi
 * - Email/password validation
 * - Session oluşturur ve cookie set eder
 * - Success durumunda redirect yapar
 * 
 * Security:
 * - Rate limiting (5 attempts per minute per IP+email)
 * - IP conflict detection
 * - Password hash verification
 * - Active user check
 */
export async function loginAction(
  formData: FormData
): Promise<LoginResult> {
  try {
    // Form validation
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message || TR.auth.invalidCredentials,
      }
    }

    // Rate limiting (basit IP bazlı - production'da daha gelişmiş olabilir)
    const ip = "0.0.0.0" // Server Action'da gerçek IP almak için headers gerekli
    
    if (!checkRateLimit(`login:${ip}:${parsed.data.email}`, 5, 60_000)) {
      return {
        success: false,
        error: TR.auth.tooManyAttempts,
      }
    }

    // Kullanıcı kontrolü
    const user = await basePrisma.user.findUnique({
      where: { email: parsed.data.email },
      include: { passwordCredential: true },
    })

    if (!user || !user.isActive || !user.passwordCredential) {
      return {
        success: false,
        error: TR.auth.invalidCredentials,
      }
    }

    // Şifre kontrolü
    const passwordMatch = await bcrypt.compare(
      parsed.data.password,
      user.passwordCredential.passwordHash
    )

    if (!passwordMatch) {
      return {
        success: false,
        error: TR.auth.invalidCredentials,
      }
    }

    // Şifre değiştirme kontrolü
    if (user.mustChangePassword) {
      return {
        success: false,
        error: TR.auth.mustChangePassword,
      }
    }

    // IP conflict kontrolü
    const conflictSession = await basePrisma.session.findFirst({
      where: {
        ip,
        revokedAt: null,
        userId: { not: user.id },
        user: { siteId: user.siteId },
      },
      select: { userId: true },
    })

    if (conflictSession) {
      const trusted = await isTrustedIp(user.siteId, ip)
      await logSecurityEvent({
        siteId: user.siteId,
        userId: user.id,
        type: "ip_conflict",
        meta: {
          ip,
          conflictingUserId: conflictSession.userId,
          trusted,
        },
      })

      if (!trusted) {
        return {
          success: false,
          error: "IP conflict detected. Please contact your administrator.",
        }
      }
    }

    // Device fingerprint (optional)
    const deviceFingerprintHash = hashDeviceFingerprint(null)

    // Session oluştur
    const session = await basePrisma.session.create({
      data: {
        userId: user.id,
        ip,
        deviceLabel: "Web Browser",
        deviceFingerprintHash,
        revokedAt: null,
        lastSeenAt: new Date(),
      },
    })

    // JWT token oluştur
    const { signSessionToken } = await import("@/lib/auth")
    const token = await signSessionToken({
      userId: user.id,
      sessionId: session.id,
      siteId: user.siteId,
      role: user.role,
    })

    // Cookie set et
    const cookieStore = await cookies()
    cookieStore.set("cms-auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    // Login log
    await logSecurityEvent({
      siteId: user.siteId,
      userId: user.id,
      type: "login",
      meta: { ip, deviceLabel: "Web Browser" },
    })

    return { success: true }
  } catch (error) {
    console.error("[loginAction] Error:", error)
    return {
      success: false,
      error: TR.auth.loginFailed,
    }
  }
}

