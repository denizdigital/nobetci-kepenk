import { eventLogs, getVisitorStats } from '@/lib/logger';
import { toggleBlockStatus } from '@/app/actions/admin';
import { ShieldAlert, Activity, Users, Ban, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Güvenlik Kontrol Merkezi | Admin',
  robots: { index: false, follow: false } // Arama motorlarının burayı taramasını kesinlikle engelliyoruz
};

export default function AdminDashboard() {
  const visitors = getVisitorStats();
  const totalEvents = eventLogs.length;
  const highRiskCount = visitors.filter(v => v.risk_score >= 50).length;
  const blockedCount = visitors.filter(v => v.is_blocked).length;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <ShieldAlert className="text-red-500" size={36} />
              Anti-Manipülasyon Merkezi
            </h1>
            <p className="text-gray-400 mt-1">Gerçek zamanlı trafik analizi ve tehdit önleme paneli.</p>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg text-sm border border-gray-700">
            <span className="text-green-400 font-bold mr-2">●</span> Sistem Aktif
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
              <p className="text-sm text-gray-400">Tekil Ziyaretçi</p>
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
              <p className="text-sm text-gray-400">Engellenen (Blocked)</p>
              <p className="text-2xl font-bold">{blockedCount}</p>
            </div>
          </div>
        </div>

        {/* Ziyaretçi Risk Tablosu */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">Ziyaretçi Risk Analizi</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900/50 text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Anonim IP Hash (KVKK)</th>
                  <th className="px-6 py-4 font-medium">Risk Skoru</th>
                  <th className="px-6 py-4 font-medium">Toplam Aksiyon</th>
                  <th className="px-6 py-4 font-medium">Son Görülme</th>
                  <th className="px-6 py-4 font-medium text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {visitors.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Henüz veri yok. Sistem dinleniyor...</td></tr>
                ) : (
                  visitors.map((v) => (
                    <tr key={v.id} className={`hover:bg-gray-700/50 transition-colors ${v.is_blocked ? 'opacity-50' : ''}`}>
                      <td className="px-6 py-4 font-mono text-gray-300">{v.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-700 rounded-full h-2 max-w-[100px]">
                            <div 
                              className={`h-2 rounded-full ${v.risk_score >= 50 ? 'bg-red-500' : v.risk_score >= 20 ? 'bg-orange-500' : 'bg-green-500'}`} 
                              style={{ width: `${Math.min(v.risk_score, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`font-bold ${v.risk_score >= 50 ? 'text-red-400' : ''}`}>{Math.round(v.risk_score)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{v.events} Etkileşim</td>
                      <td className="px-6 py-4 text-gray-400">{new Date(v.last_seen).toLocaleTimeString('tr-TR')}</td>
                      <td className="px-6 py-4 text-right">
                        <form action={toggleBlockStatus.bind(null, v.id)}>
                          {v.is_blocked ? (
                            <button type="submit" className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                              <CheckCircle size={16} className="text-green-400" /> Engeli Kaldır
                            </button>
                          ) : (
                            <button type="submit" className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors">
                              <Ban size={16} /> IP'yi Engelle
                            </button>
                          )}
                        </form>
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