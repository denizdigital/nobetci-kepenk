import crypto from 'crypto';

// Global Hafıza
const globalStore = global as unknown as { 
  eventLogs: any[], 
  blockedIps: Set<string> 
};

if (!globalStore.eventLogs) globalStore.eventLogs = [];
if (!globalStore.blockedIps) globalStore.blockedIps = new Set();

export const eventLogs = globalStore.eventLogs;
export const blockedIps = globalStore.blockedIps;

export function hashIp(ip: string): string {
  const salt = process.env.TRACKER_SALT || 'salt-2026';
  return crypto.createHash('sha256').update(ip + salt).digest('hex').substring(0, 16);
}

// Olay Kaydetme
export function logEvent(data: any) {
  eventLogs.unshift({ 
    ...data, 
    server_time: new Date().toISOString() 
  });
  if (eventLogs.length > 2000) eventLogs.pop();
}

// İstatistikleri Derleme
export function getVisitorStats() {
  const visitors = new Map();
  
  eventLogs.forEach(log => {
    if (!log.visitor_id) return;

    if (!visitors.has(log.visitor_id)) {
      visitors.set(log.visitor_id, {
        id: log.visitor_id,
        real_ip: log.ip || 'Gizli',         // <--- IP EKLENDİ
        location: log.geo || { city: '-', country: '-' }, // <--- KONUM EKLENDİ
        events: 0,
        risk_score: 0,
        is_blocked: blockedIps.has(log.visitor_id),
        last_seen: log.server_time,
        suspicious_flags: 0,
        interactions: []
      });
    }
    const v = visitors.get(log.visitor_id);
    v.events += 1;
    v.interactions.push(log.event_type);
    
    // Risk Skoru
    if (log.risk_flags?.is_suspicious_ua) v.suspicious_flags += 1;
    v.risk_score = Math.min(100, (v.events * 1.5) + (v.suspicious_flags * 20));

    if (new Date(log.server_time) > new Date(v.last_seen)) {
      v.last_seen = log.server_time;
    }
  });
  
  return Array.from(visitors.values()).sort((a, b) => b.risk_score - a.risk_score);
}