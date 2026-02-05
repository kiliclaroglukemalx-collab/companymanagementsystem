import { basePrisma } from "@/lib/prisma"

function ipToInt(ip: string) {
  const parts = ip.split(".").map((part) => Number(part))
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    return null
  }
  return (
    (parts[0] << 24) +
    (parts[1] << 16) +
    (parts[2] << 8) +
    parts[3]
  ) >>> 0
}

function isInCidr(ip: string, cidr: string) {
  const [range, bitsRaw] = cidr.split("/")
  const bits = Number(bitsRaw)
  if (!range || Number.isNaN(bits) || bits < 0 || bits > 32) {
    return false
  }
  const ipInt = ipToInt(ip)
  const rangeInt = ipToInt(range)
  if (ipInt === null || rangeInt === null) {
    return false
  }
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0
  return (ipInt & mask) === (rangeInt & mask)
}

export async function isTrustedIp(siteId: string, ip: string) {
  const trusted = await basePrisma.trustedIp.findMany({
    where: { siteId },
    select: { ipCidrOrIp: true },
  })

  return trusted.some(({ ipCidrOrIp }) => {
    if (ipCidrOrIp.includes("/")) {
      return isInCidr(ip, ipCidrOrIp)
    }
    return ipCidrOrIp === ip
  })
}
