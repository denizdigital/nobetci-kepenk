import { NextResponse } from 'next/server'
import { readSecurityEvents } from '@/lib/security/store'

export const runtime = 'nodejs'

export async function GET() {
  const events = await readSecurityEvents(500)

  const byIp = new Map<string, number>()
  const byPath = new Map<string, number>()

  for (const event of events) {
    byIp.set(event.ip, (byIp.get(event.ip) || 0) + 1)
    byPath.set(event.path, (byPath.get(event.path) || 0) + 1)
  }

  const topIps = [...byIp.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([ip, count]) => ({ ip, count }))

  const topPaths = [...byPath.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([path, count]) => ({ path, count }))

  return NextResponse.json({
    ok: true,
    totalEvents: events.length,
    topIps,
    topPaths,
    latest: events.slice(-20).reverse(),
  })
}