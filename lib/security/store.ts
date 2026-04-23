import { mkdir, appendFile, readFile } from 'node:fs/promises'
import path from 'node:path'

const DATA_DIR = path.join(process.cwd(), '.data')
const EVENTS_FILE = path.join(DATA_DIR, 'security-events.jsonl')

export type SecurityEvent = {
  id: string
  createdAt: string
  type: 'page_view' | 'page_leave' | 'cta_click'
  visitorId: string | null
  ip: string
  forwardedFor: string | null
  userAgent: string
  referer: string | null
  path: string
  search: string | null
  method: string
  country?: string | null
  city?: string | null
  payload?: Record<string, unknown>
}

export async function appendSecurityEvent(event: SecurityEvent) {
  await mkdir(DATA_DIR, { recursive: true })
  await appendFile(EVENTS_FILE, JSON.stringify(event) + '\n', 'utf8')
}

export async function readSecurityEvents(limit = 200): Promise<SecurityEvent[]> {
  try {
    const raw = await readFile(EVENTS_FILE, 'utf8')
    const lines = raw.trim().split('\n').filter(Boolean)
    return lines
      .slice(-limit)
      .map((line) => JSON.parse(line) as SecurityEvent)
  } catch {
    return []
  }
}