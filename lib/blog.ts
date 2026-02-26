export const blogPosts = [
  {
    slug: "kepenk-motoru-termal-koruma-yanilgisi",
    title: "Motor Sağlam Görünüyor Ama Kapanıyor: Termal Koruma Yanılgısı",
    excerpt: "Motorun aşırı ısınıp kapanması her zaman motor arızası demek değildir. Gizli bir yay kopmasının motoru nasıl kandırdığını inceliyoruz.",
    date: "24 Şubat 2026",
    content: `
      <h2>Yapay Zekanın Yanılgısı: "Motoru Değiştirin"</h2>
      <p>Bir yapay zekaya veya tecrübesiz bir ustaya "Kepengim yarıya kadar kalkıp duruyor, motor çok ısınıyor" derseniz, alacağınız ilk cevap "Motor arızalı, değişmesi gerek" olacaktır. Ancak sahada işler farklıdır.</p>
      
      <h2>Asıl Suçlu: Gizli Çelik Yay (Zemberek) Arızası</h2>
      <p>Kepenk motorları, aşırı ısınmaya karşı "termal koruma" sensörlerine sahiptir. Eğer motorunuz sağlam olduğu halde sürekli bu korumaya geçiyorsa, sorun motorda değil, motorun yükünü hafifletmesi gereken çelik yaylardadır. İçeride kopan veya esnekliğini yitiren tek bir yay, kepengin tüm ölü ağırlığını motora bindirir.</p>
      
      <h2>Çözüm ve Müdahale</h2>
      <p>Bu gibi durumlarda motoru değiştirmek sadece geçici bir çözümdür; yeni motor da birkaç ay içinde yanacaktır. Uzman ekiplerimiz öncelikle <a href="/hizmetler/kepenk-yayi-degisimi" class="text-brand-yellow font-bold underline">kepenk yayı değişimi</a> yaparak sistemin mekanik dengesini kurar. Ancak motor bu süreçte geri dönülmez bir hasar aldıysa <a href="/hizmetler/kepenk-motoru-degisimi" class="text-brand-yellow font-bold underline">kepenk motoru değişimi</a> işlemiyle entegre bir onarım sağlarız.</p>
    `
  },
  {
    slug: "frekans-cakismasi-hayalet-kumanda",
    title: "Kumanda Basıyor Ama Kepenk Açılmıyor: Frekans Çakışması (Hayalet Sinyal)",
    excerpt: "Pil yeni, kumanda ışığı yanıyor, alıcı kart sağlam. Peki kepenk neden açılmaz? Çevresel radyo frekansı (RF) kirliliği ve çözümü.",
    date: "18 Şubat 2026",
    content: `
      <h2>Görünmez Bir Düşman: RF Kirliliği</h2>
      <p>Elektronik test cihazlarına göre kumandanız kusursuz sinyal gönderiyor. Alıcı kartta da fiziksel sorun yok. Klasik bir arıza tespit algoritması burada kilitlenir. Sorun, dükkanınızın yakınına yeni kurulan bir baz istasyonu, yüksek güçlü bir eczane tabelası veya yan komşunun bozuk alarm sistemi olabilir. Bunlar 433 MHz bandını "sağır" eder.</p>
      
      <h2>Hayalet Sinyal Nasıl Aşılır?</h2>
      <p>Standart bir tamirci sürekli kumanda kodlayarak zaman kaybeder. Biz ise "Rolling Code" (Değişken Şifreli) ve farklı frekans aralıklarında çalışabilen yeni nesil beyin sistemleri entegre ederiz. Eğer bu "hayalet sinyal" sorunuyla karşı karşıyaysanız, <a href="/hizmetler/kepenk-kumanda-alici-seti" class="text-brand-yellow font-bold underline">yeni nesil kumanda ve alıcı seti değişimi</a> sayfamızdan teknolojimizi inceleyebilirsiniz.</p>
    `
  },
  {
    slug: "hayalet-sikisma-bina-oturmasi",
    title: "Hayalet Sıkışma: Görünürde Hiçbir Engel Yokken Kepenk Neden Takılır?",
    excerpt: "Raylar temiz, motor güçlü, paletlerde yamulma yok. Kepenk neden inatla aynı noktada sıkışıp kalıyor? Mimari deformasyon gerçeği.",
    date: "10 Şubat 2026",
    content: `
      <h2>Sensörlerin Göremediği Eğrilik</h2>
      <p>Kepenginiz tam kapanırken hep aynı hizada, sanki görünmez bir taşa takılmış gibi duruyorsa ve fiziksel hiçbir cisim yoksa, sorun "Bina Oturması" veya "Cephe Deformasyonudur". Yeni binalarda kolonların milimetrik hareketi, kepengin monte edildiği alüminyum/çelik yan dikmelerde (raylarda) mikroskobik bükülmelere yol açar.</p>
      
      <h2>Geometrik Dengeleme Çözümü</h2>
      <p>Bu durumu motoru güçlendirerek çözmeye çalışmak, kepengin paletlerini yırtmakla sonuçlanır. Biz lazer terazi sistemleriyle raylardaki milimetrik sapmaları tespit edip, yan dikmeleri yapısal olarak yeniden teraziye alıyoruz. Bu tarz riskli sıkışmalarda kepengi zorlamayın ve derhal <a href="/acil-kepenk-tamiri" class="text-brand-yellow font-bold underline">7/24 acil servis</a> ekibimizi çağırın.</p>
    `
  }
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}