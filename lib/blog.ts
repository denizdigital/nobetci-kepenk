export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'kepenk-gicirdamasi-nasil-gecer',
    title: 'Otomatik Kepenk Neden Gıcırdar? (5 Saniyede Çözüm)',
    excerpt: 'Kepenkleriniz açılıp kapanırken rahatsız edici sesler mi çıkarıyor? İşte evde yapabileceğiniz basit bakım yöntemleri.',
    date: '27 Şubat 2026',
    content: `<h3>Kepenk Gıcırdaması Neden Olur?</h3><p>Otomatik kepenk sistemleri zamanla tozlanma ve metal sürtünmesi nedeniyle gıcırdar.</p><h4>🛠️ Ücretsiz Çözüm</h4><p>Yapı marketten alacağınız silikon bazlı spreyi (WD-40 değil, silikonlu yağlayıcı önerilir) rayların içine sıkın.</p><h3>Ses Kesilmediyse?</h3><p>Sorun motor bilyelerinde olabilir. Zorlamayın, motor yanabilir. Bizi arayın.</p>`
  },
  {
    id: '2',
    slug: 'kepenk-kumanda-calismiyor',
    title: 'Kepenk Kumandası Işığı Yanıyor Ama Açmıyor',
    excerpt: 'Kumanda ışığı yanıyor ama kepenk hareket etmiyor mu? Pil değiştirmeden önce bunu okuyun.',
    date: '26 Şubat 2026',
    content: `<h3>Sinyal Sorunu Mu?</h3><p>Kumanda ışığının yanması pilin dolu olduğunu göstermez. Alıcı kart kilitlenmiş olabilir.</p><h4>🛠️ Resetleme Yöntemi</h4><p>Dükkanın şalterini kapatın, 1 dakika bekleyip açın. Alıcı beyin kendini resetleyecektir.</p>`
  },
  {
    id: '3',
    slug: 'kepenk-yarida-kaliyor',
    title: 'Kepenk Yarıda Kalıyor / Tam Açılmıyor',
    excerpt: 'Kepenk kalkarken zorlanıyor veya yarıda duruyorsa motoru yakmak üzeresiniz demektir.',
    date: '25 Şubat 2026',
    content: `<h3>Yay Kırılması Tehlikesi</h3><p>Kepenk yarıda kalıyorsa %90 ihtimalle denge yaylarından biri kırılmıştır. Yük motora biner.</p><h4>⚠️ Uyarı</h4><p>Kepenki elle kaldırmaya çalışmayın, aniden düşebilir. Hemen servis çağırın.</p>`
  },
  {
    id: '4',
    slug: 'elektrik-kesintisi-manuel-acma',
    title: 'Elektrik Gittiğinde Kepenk Nasıl Açılır?',
    excerpt: 'Elektrik kesildiğinde dükkanda mahsur kalmayın. Manuel kol kullanımı rehberi.',
    date: '24 Şubat 2026',
    content: `<h3>Manuel Kol Kullanımı</h3><p>Motor kutusundan sarkan kancaya manuel kolu takın ve yavaşça çevirin.</p><h4>Dönmüyor mu?</h4><p>Zorlamayın, redüktör dişlisini sıyırabilirsiniz. Acil ekibimiz özel aparatla açabilir.</p>`
  },
  {
    id: '5',
    slug: 'kepenk-motoru-ses-yapiyor',
    title: 'Motor Uğultu Yapıyor Ama Dönmüyor',
    excerpt: 'Motordan "vınnn" sesi geliyor ama hareket yoksa sorun kapasitör olabilir.',
    date: '23 Şubat 2026',
    content: `<h3>Kapasitör Arızası</h3><p>Motorun ilk hareket parçasının ömrü bitmiştir.</p><h4>🛠️ Geçici Yöntem</h4><p>Kumandaya basarken elinizle hafifçe yukarı destek verin. Kalkarsa sorun kapasitördür, değişmesi gerekir.</p>`
  },
  {
    id: '6',
    slug: 'kepenk-raydan-cikti',
    title: 'Kepenk Raydan Çıktı / Yan Yattı',
    excerpt: 'Kepenk inerken bir şeye takıldı ve çapraz duruyor. Sakın tekrar çalıştırmayın!',
    date: '22 Şubat 2026',
    content: `<h3>Neden Olur?</h3><p>Genellikle altına sandalye, koli sıkışması sonucu olur.</p><h4>⚠️ Tehlike</h4><p>Raydan çıkmış kepenk sıkışmış yay gibidir. Müdahale ederseniz fırlayıp yaralanmaya sebep olabilir.</p>`
  },
  {
    id: '7',
    slug: 'kepenk-kendi-kendine-aciliyor',
    title: 'Kepenk Kendi Kendine Açılıyor (Hayalet Arıza)',
    excerpt: 'Gece yarısı kepenk kendi kendine mi açılıyor? Güvenlik açığınız olabilir.',
    date: '21 Şubat 2026',
    content: `<h3>Frekans Karışması</h3><p>Komşunun kumandası veya baz istasyonları sinyalinizi etkiliyor olabilir.</p><h4>Çözüm: Rolling Code</h4><p>Değişken şifreli alıcı takarak bu sorunu %100 çözüyoruz.</p>`
  },
  {
    id: '8',
    slug: 'kepenk-cok-yavas',
    title: 'Kepenk Çok Yavaş Açılıyor',
    excerpt: 'Eskiden hızlı olan kepenk şimdi kağnı gibi mi? Motor yorulmuş olabilir.',
    date: '20 Şubat 2026',
    content: `<h3>Yay Tansiyonu</h3><p>Yaylar gevşediği için motor tüm yükü taşıyor demektir. Yayların tekrar kurulması gerekir.</p>`
  },
  {
    id: '9',
    slug: 'kepenk-yamuk-kapaniyor',
    title: 'Kepenk Tam Kapanmıyor, Altı Yamuk Duruyor',
    excerpt: 'Kepenk yere değdiğinde bir tarafı havada kalıyorsa ısı kaybı yaşarsınız.',
    date: '19 Şubat 2026',
    content: `<h3>Askı Kopması</h3><p>Motora bağlayan çelik askılardan biri kopmuş olabilir. Kutunun içine bakarak kontrol edin.</p>`
  },
  {
    id: '10',
    slug: 'yagmurda-kepenk-calismiyor',
    title: 'Yağmur Yağınca Kepenk Çalışmıyor / Sigorta Atıyor',
    excerpt: 'Sadece yağmurlu havalarda sorun yaşıyorsanız su izolasyonu bitmiş demektir.',
    date: '18 Şubat 2026',
    content: `<h3>Su Teması</h3><p>Motor veya alıcı kart su alıyordur. Şalteri indirin ve kurumadan çalıştırmayın. Motor yanabilir.</p>`
  }
];