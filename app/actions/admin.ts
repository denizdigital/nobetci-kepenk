"use server";
import { blockedIps } from '@/lib/logger';
import { revalidatePath } from 'next/cache';

export async function toggleBlockStatus(visitorId: string) {
  if (blockedIps.has(visitorId)) {
    blockedIps.delete(visitorId); // Engeli kaldır
  } else {
    blockedIps.add(visitorId); // Engelle
  }
  // Paneli anında güncelle
  revalidatePath('/admin');
}