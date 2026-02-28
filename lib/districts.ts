export const districts = [
  // --- ANADOLU YAKASI ---
  { name: "Ataşehir", slug: "atasehir-kepenk-tamiri" },
  { name: "Beykoz", slug: "beykoz-kepenk-tamiri" },
  { name: "Çekmeköy", slug: "cekmekoy-kepenk-tamiri" },
  { name: "Kadıköy", slug: "kadikoy-kepenk-tamiri" },
  { name: "Kartal", slug: "kartal-kepenk-tamiri" },
  { name: "Maltepe", slug: "maltepe-kepenk-tamiri" },
  { name: "Pendik", slug: "pendik-kepenk-tamiri" },
  { name: "Sancaktepe", slug: "sancaktepe-kepenk-tamiri" },
  { name: "Sultanbeyli", slug: "sultanbeyli-kepenk-tamiri" },
  { name: "Şile", slug: "sile-kepenk-tamiri" },
  { name: "Tuzla", slug: "tuzla-kepenk-tamiri" },
  { name: "Ümraniye", slug: "umraniye-kepenk-tamiri" },
  { name: "Üsküdar", slug: "uskudar-kepenk-tamiri" },

  // --- AVRUPA YAKASI ---
  { name: "Arnavutköy", slug: "arnavutkoy-kepenk-tamiri" },
  { name: "Avcılar", slug: "avcilar-kepenk-tamiri" },
  { name: "Bağcılar", slug: "bagcilar-kepenk-tamiri" },
  { name: "Bahçelievler", slug: "bahcelievler-kepenk-tamiri" },
  { name: "Bakırköy", slug: "bakirkoy-kepenk-tamiri" },
  { name: "Başakşehir", slug: "basaksehir-kepenk-tamiri" },
  { name: "Bayrampaşa", slug: "bayrampasa-kepenk-tamiri" },
  { name: "Beşiktaş", slug: "besiktas-kepenk-tamiri" },
  { name: "Beylikdüzü", slug: "beylikduzu-kepenk-tamiri" },
  { name: "Beyoğlu", slug: "beyoglu-kepenk-tamiri" },
  { name: "Büyükçekmece", slug: "buyukcekmece-kepenk-tamiri" },
  { name: "Esenler", slug: "esenler-kepenk-tamiri" },
  { name: "Esenyurt", slug: "esenyurt-kepenk-tamiri" },
  { name: "Eyüpsultan", slug: "eyupsultan-kepenk-tamiri" },
  { name: "Fatih", slug: "fatih-kepenk-tamiri" },
  { name: "Gaziosmanpaşa", slug: "gaziosmanpasa-kepenk-tamiri" },
  { name: "Güngören", slug: "gungoren-kepenk-tamiri" },
  { name: "Kağıthane", slug: "kagithane-kepenk-tamiri" },
  { name: "Küçükçekmece", slug: "kucukcekmece-kepenk-tamiri" },
  { name: "Sarıyer", slug: "sariyer-kepenk-tamiri" },
  { name: "Silivri", slug: "silivri-kepenk-tamiri" },
  { name: "Sultangazi", slug: "sultangazi-kepenk-tamiri" },
  { name: "Şişli", slug: "sisli-kepenk-tamiri" },
  { name: "Zeytinburnu", slug: "zeytinburnu-kepenk-tamiri" },
].sort((a, b) => a.name.localeCompare(b.name));

// --- AŞAĞIDAKİ FONKSİYONLAR SİLİNDİĞİ İÇİN HATA ALIYORDUK ---
// --- BUNLARI GERİ EKLEDİK: ---

// Slug'a (URL'deki isme) göre ilçeyi bulan fonksiyon
export function getDistrictBySlug(slug: string) {
  return districts.find((d) => d.slug === slug);
}

// Diğer ilçeleri (Komşu ilçeler olarak) öneren fonksiyon
export function getNeighborDistricts(slug: string) {
  // Basit mantık: Şu anki ilçe hariç sıradaki 4 ilçeyi getirir
  return districts.filter((d) => d.slug !== slug).slice(0, 4);
}