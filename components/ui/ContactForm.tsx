"use client";
import { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { submitContactForm } from '@/app/actions/contact';
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!token) {
      setErrorMessage('Lütfen güvenlik doğrulamasını bekleyin.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    formData.append('cf-turnstile-response', token);

    try {
      const response = await submitContactForm(formData);
      
      if (response.success) {
        setStatus('success');
        formRef.current?.reset();
      } else {
        setStatus('error');
        setErrorMessage(response.error || 'Bir hata oluştu.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Sunucuya ulaşılamıyor.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center">
        <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Talebiniz Alındı!</h3>
        <p className="text-green-700">Güvenlik doğrulaması başarılı. Nöbetçi ekibimiz saniyeler içinde sizinle iletişime geçecek.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-bold text-green-600 underline">Yeni Talep Oluştur</button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
          <AlertTriangle size={18} className="shrink-0" />
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Adınız Soyadınız</label>
          <input type="text" name="name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow" placeholder="Örn: Emir Yılmaz" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numaranız</label>
          <input type="tel" name="phone" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow" placeholder="05XX XXX XX XX" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">İlçe / Mahalle</label>
        <input type="text" name="district" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow" placeholder="Örn: Şişli, Mecidiyeköy" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Arıza Detayı (Opsiyonel)</label>
        <textarea name="details" rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none" placeholder="Kepengim yarıda kaldı, motor çalışmıyor..."></textarea>
      </div>
      
      {/* Cloudflare Turnstile Widget */}
      <div className="flex justify-center my-4">
        <Turnstile 
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} 
          onSuccess={(t) => setToken(t)}
          options={{ theme: 'light' }}
        />
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading' || !token} 
        className="w-full bg-brand-dark text-white font-bold text-lg py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {status === 'loading' ? <Loader2 className="animate-spin" size={24} /> : 'Servis Talebi Oluştur'}
      </button>
      <p className="text-xs text-gray-400 text-center mt-4">
        🔒 Form üzerinden iletilen bilgileriniz KVKK kapsamında şifrelenir ve sadece servis yönlendirmesi amacıyla kullanılır.
      </p>
    </form>
  );
}