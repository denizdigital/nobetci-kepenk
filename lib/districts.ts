export const districts = [
  { name: 'Şişli', slug: 'sisli' }, { name: 'Beşiktaş', slug: 'besiktas' },
  { name: 'Bakırköy', slug: 'bakirkoy' }, { name: 'Beyoğlu', slug: 'beyoglu' },
  { name: 'Fatih', slug: 'fatih' }, { name: 'Zeytinburnu', slug: 'zeytinburnu' },
  { name: 'Bağcılar', slug: 'bagcilar' }, { name: 'Bahçelievler', slug: 'bahcelievler' },
  { name: 'Küçükçekmece', slug: 'kucukcekmece' }, { name: 'Avcılar', slug: 'avcilar' },
  { name: 'Beylikdüzü', slug: 'beylikduzu' }, { name: 'Esenyurt', slug: 'esenyurt' },
  { name: 'Başakşehir', slug: 'basaksehir' }, { name: 'Sarıyer', slug: 'sariyer' },
  { name: 'Kağıthane', slug: 'kagithane' }
];

export function getDistrictBySlug(slug: string) {
  const index = districts.findIndex(d => d.slug === slug);
  if (index === -1) return null;
  return { ...districts[index], index };
}

// SEO İç Linkleme: Her ilçeden sonraki 2 komşu ilçeye link vererek link suyunu (link juice) dağıtıyoruz.
export function getNeighborDistricts(currentIndex: number) {
  const count = districts.length;
  const next1 = districts[(currentIndex + 1) % count];
  const next2 = districts[(currentIndex + 2) % count];
  return [next1, next2];
}