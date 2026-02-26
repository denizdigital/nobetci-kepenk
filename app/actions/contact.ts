"use server";

export async function submitContactForm(formData: FormData) {
  // 1. Turnstile Token'ını Al
  const token = formData.get("cf-turnstile-response") as string;
  
  if (!token) {
    return { success: false, error: "Güvenlik doğrulaması eksik." };
  }

  // 2. Cloudflare Sunucularından Token'ı Doğrula
  const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const res = await fetch(verifyEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`
  });
  
  const validation = await res.json();

  if (!validation.success) {
    return { success: false, error: "Bot algılandı. İşlem reddedildi." };
  }

  // 3. Verileri Al (Burada veritabanına kayıt veya mail atma işlemi yapılır)
  const name = formData.get("name");
  const phone = formData.get("phone");
  const district = formData.get("district");
  const details = formData.get("details");

  // TODO: E-posta gönderimi veya DB kaydı (Örn: Resend veya Supabase ile)
  console.log("Onaylanmış Form Verisi:", { name, phone, district, details });

  return { success: true, message: "Talebiniz başarıyla alındı. Nöbetçi ekibimiz hemen yola çıkıyor." };
}