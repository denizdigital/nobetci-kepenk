import crypto from 'crypto';

export function hashIp(ip: string): string {
  const salt = process.env.TRACKER_SALT || 'nobetci-kepenk-secure-salt-2026';
  return crypto.createHash('sha256').update(ip + salt).digest('hex').substring(0, 16);
}

export const eventLogs: any[] = [];
export const blockedIps: Set<string> = new Set(); // Engellenen Ziyaretçi ID'leri

export function logEvent(data: any) {
  eventLogs.unshift({ ...data, id: Date.now().toString(), server_time: new Date().toISOString() });
  if (eventLogs.length > 2000) eventLogs.pop(); // Son 2000 hareketi tut
}

// Admin panelinde göstermek üzere ziyaretçileri grupla ve risk skoru hesapla
export function getVisitorStats() {
  const visitors = new Map();
  
  eventLogs.forEach(log => {
    if (!visitors.has(log.visitor_id)) {
      visitors.set(log.visitor_id, {
        id: log.visitor_id,
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
    
    if (log.risk_flags?.is_suspicious_ua) v.suspicious_flags += 1;
    if (log.risk_flags?.webdriver) v.suspicious_flags += 5; // Headless bot tespiti ağır kusurdur
    
    // Risk Algoritması: Çok fazla event (spam) + Şüpheli sinyaller
    v.risk_score = Math.min(100, (v.events * 1.5) + (v.suspicious_flags * 20));
  });
  
  // En yüksek riskliler en üstte olacak şekilde sırala
  return Array.from(visitors.values()).sort((a, b) => b.risk_score - a.risk_score);
}