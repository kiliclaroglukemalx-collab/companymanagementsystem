"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { basePrisma } from "@/lib/prisma"

/**
 * Server Action: Logout işlemi
 * - Session'ı revoke eder
 * - Cookie'yi siler
 * - Login sayfasına redirect eder
 */
export async function logoutAction() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("cms-auth")?.value

    if (token) {
      // Token'dan session ID'yi çıkar ve revoke et
      try {
        const { jwtVerify } = await import("jose")
        const secret = process.env.AUTH_SECRET_KEY
        if (secret) {
          const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(secret)
          )
          const sessionId = payload.sid as string | undefined
          if (sessionId) {
            await basePrisma.session.update({
              where: { id: sessionId },
              data: { revokedAt: new Date() },
            })
          }
        }
      } catch (err) {
        console.error("[logoutAction] Token verify error:", err)
      }
    }

    // Cookie'yi sil
    cookieStore.delete("cms-auth")

    // Login sayfasına redirect
    redirect("/login")
  } catch (error) {
    console.error("[logoutAction] Error:", error)
    // Redirect error ise ignore et (zaten redirect yapıyoruz)
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error
    }
    redirect("/login")
  }
}
