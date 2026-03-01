'use client';

import { useState, useEffect } from 'react';
import { getAdminData, toggleBlockStatus } from '@/app/actions/admin';
import { ShieldAlert, Activity, Users, Ban, CheckCircle, MapPin, Lock, Key, RefreshCw } from 'lucide-react';

export default function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ visitors: any[], totalEvents: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // ŞİFRE: admin123
    if (password === 'admin123') {
      fetchData(); 
    } else {
      alert('ERİŞİM REDDEDİLDİ: Hatalı Şifre');
      setLoading(false);
      setPassword('');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAdminData();
      if (result && result.success) {
        setData({ 
          visitors: result.visitors || [], 
          totalEvents: result.totalEvents || 0 
        });
        setIsAuthenticated(true);
      } else {
        alert("Veri çekilemedi. Sunucu hatası.");
      }
    } catch (err) {
      console.error(err);
      alert("Bağlantı hatası.");
    }
    setLoading(false);
  };

  if (!mounted) return null;

  // --- KİLİT EKRANI ---
  if (!isAuthenticated || !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
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
            <p className="text-xs text-gray-600">* Sayfa yenilendiğinde oturum kapanır.</p>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD ---
  const { visitors, totalEvents } = data;
  const highRiskCount = visitors.filter((v: any) => v.risk_score >= 50).length;
  const blockedCount = visitors.filter((v: any) => v.is_blocked).length;

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
          <button 
            onClick={fetchData} 
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 flex items-center gap-2 transition-colors"
          >
            <RefreshCw size={16} /> Verileri Yenile
          </button>
        </header>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-xs">Toplam Aksiyon</p>
            <p className="text-2xl font-bold">{totalEvents}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-xs">Aktif Ziyaretçi</p>
            <p className="text-2xl font-bold">{visitors.length}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
             <p className="text-gray-400 text-xs">Yüksek Risk</p>
             <p className="text-2xl font-bold text-orange-500">{highRiskCount}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
             <p className="text-gray-400 text-xs">Engellenen</p>
             <p className="text-2xl font-bold text-red-500">{blockedCount}</p>
          </div>
        </div>

        {/* Tablo */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900/50 text-gray-400">
              <tr>
                <th className="px-6 py-4">IP / Konum</th>
                <th className="px-6 py-4">Risk</th>
                <th className="px-6 py-4">Zaman</th>
                <th className="px-6 py-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {visitors.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">Veri bekleniyor...</td></tr>
              ) : (
                visitors.map((v: any) => (
                  <tr key={v.id} className={`hover:bg-gray-700/30 ${v.is_blocked ? 'opacity-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="font-mono text-blue-300">{v.real_ip}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={10} /> {v.location?.city || '-'}, {v.location?.country || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded text-xs font-bold ${v.risk_score > 50 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                         %{Math.round(v.risk_score)}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {new Date(v.last_seen).toLocaleTimeString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={async () => {
                          await toggleBlockStatus(v.id);
                          fetchData();
                        }}
                        className={`px-3 py-1 rounded text-xs font-bold border ${v.is_blocked ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}
                      >
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
  );
}