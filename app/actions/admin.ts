"use server";

import { blockedIps } from '@/lib/logger';
import { revalidatePath } from 'next/cache';

export async function toggleBlockStatus(visitorId: string) {
  // Set nesnesini direkt manipüle ediyoruz (Logger dosyasından import edilen)
  if (blockedIps.has(visitorId)) {
    blockedIps.delete(visitorId);
  } else {
    blockedIps.add(visitorId);
  }
  
  // Admin sayfasını yenile ki butonun durumu (Engelle/Kaldır) değişsin
  revalidatePath('/admin');
}
// app/actions/admin.ts dosyasının EN ALTINA ekle:

import { getVisitorStats, eventLogs } from '@/lib/logger';

export async function getAdminData() {
  return {
    visitors: getVisitorStats(),
    totalEvents: eventLogs.length,
    success: true
  };
}