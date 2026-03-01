'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


import { useState, useEffect } from 'react';
import { getAdminData, toggleBlockStatus } from '@/app/actions/admin';
import { ShieldAlert, Activity, Users, Ban, CheckCircle, MapPin, Lock, Key, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  // --- DURUM YÖNETİMİ (STATE) ---
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Başlangıçta KİLİTLİ
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Veriler
  const [data, setData] = useState<{ visitors: any[], totalEvents: number } | null>(null);

  // --- GİRİŞ FONKSİYONU ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // ŞİFRE BURADA: Basitlik için buraya koyduk. 
    // İstersen 'admin123' kısmını değiştirebilirsin.
    if (password === 'n0b3tc1') {
      // Şifre doğruysa verileri çek
      fetchData(); 
    } else {
      alert('ERİŞİM REDDEDİLDİ: Hatalı Şifre');
      setLoading(false);
      setPassword('');
    }
  };

  // Verileri Sunucudan Çeken Fonksiyon
  const fetchData = async () => {
    setLoading(true);
    const result = await getAdminData();
    if (result.success) {
      setData({ visitors: result.visitors, totalEvents: result.totalEvents });
      setIsAuthenticated(true); // Kilidi Aç
    }
    setLoading(false);
  };

  // EĞER KİLİTLİYSE -> GİRİŞ EKRANINI GÖSTER
  if (!isAuthenticated || !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
          {/* Arka plan efekti */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
          
          <div className="flex flex-col items-center mb-8">
            <div className="bg-red-500/10 p-4 rounded-full mb-4 border border-red-500/20">
              <Lock size={40} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wider">GÜVENLİK PROTOKOLÜ</h1>
            <p className="text-gray-500 text-sm mt-2">Sisteme erişmek için kimlik doğrulayın.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Key className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Erişim Şifresi"
                className="w-full bg-black border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                autoFocus
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="animate-spin" /> : 'GİRİŞ YAP'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              * Sayfa her yenilendiğinde oturum otomatik olarak sonlandırılır.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- GİRİŞ BAŞARILIYSA -> DASHBOARD GÖSTER ---
  const { visitors, totalEvents } = data;
  const highRiskCount = visitors.filter(v => v.risk_score >= 50).length;
  const blockedCount = visitors.filter(v => v.is_blocked).length;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-800 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <ShieldAlert className="text-red-500" size={36} />
              Canlı İzleme Merkezi
            </h1>
            <p className="text-gray-400 mt-1">Anlık ziyaretçi konumu ve IP analizi.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchData} 
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={16} /> Verileri Yenile
            </button>
            <div className="bg-green-900/30 text-green-400 px-4 py-2 rounded-lg text-sm border border-green-800 flex items-center gap-2">
              <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></span> 
              Sistem Online
            </div>
          </div>
        </header>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex items-center gap-4">
            <div className="bg-blue-500/20 p-4 rounded-xl text-blue-400"><Activity size={24} /></div>
            <div>
              <p className="text-sm text-gray-400">Toplam Aksiyon</p>
              <p className="text-2xl font-bold">{totalEvents}</p>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex items-center gap-4">
            <div className="bg-purple-500/20 p-4 rounded-xl text-purple-400"><Users size={24} /></div>
            <div>
              <p className="text-sm text-gray-400">Aktif Ziyaretçi</p>
              <p className="text-2xl font-bold">{visitors.length}</p>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex items-center gap-4">
            <div className="bg-orange-500/20 p-4 rounded-xl text-orange-400"><ShieldAlert size={24} /></div>
            <div>
              <p className="text-sm text-gray-400">Yüksek Riskli</p>
              <p className="text-2xl font-bold">{highRiskCount}</p>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-red-900/50 flex items-center gap-4">
            <div className="bg-red-500/20 p-4 rounded-xl text-red-400"><Ban size={24} /></div>
            <div>
              <p className="text-sm text-gray-400">Engellenen</p>
              <p className="text-2xl font-bold">{blockedCount}</p>
            </div>
          </div>
        </div>

        {/* Ziyaretçi Tablosu */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-gray-700 bg-gray-800/50">
            <h2 className="text-xl font-bold">Canlı Ziyaretçi Akışı</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900/50 text-gray-400 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">IP Adresi / ID</th>
                  <th className="px-6 py-4">Konum</th>
                  <th className="px-6 py-4">Risk Skoru</th>
                  <th className="px-6 py-4">Son Görülme</th>
                  <th className="px-6 py-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {visitors.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Henüz ziyaretçi verisi yok.</td></tr>
                ) : (
                  visitors.map((v) => (
                    <tr key={v.id} className={`hover:bg-gray-700/30 transition-colors ${v.is_blocked ? 'opacity-50 bg-red-900/10' : ''}`}>
                      <td className="px-6 py-4 font-mono text-blue-300 font-medium">
                        {v.real_ip}
                        <div className="text-[10px] text-gray-500 mt-1">ID: {v.id.substring(0,8)}...</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin size={16} className="text-brand-yellow" />
                          <span className="font-semibold">{v.location?.city || 'Bilinmiyor'}</span>, {v.location?.country || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded text-xs font-bold ${v.risk_score > 50 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            %{Math.round(v.risk_score)}
                          </div>
                          <span className="text-gray-500 text-xs">({v.events} olay)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(v.last_seen).toLocaleTimeString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={async () => {
                            await toggleBlockStatus(v.id);
                            fetchData(); // İşlemden sonra tabloyu yenile
                          }}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            v.is_blocked 
                              ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                              : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                          }`}
                        >
                          {v.is_blocked ? <CheckCircle size={14} /> : <Ban size={14} />}
                          {v.is_blocked ? 'Engeli Kaldır' : 'Engelle'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}