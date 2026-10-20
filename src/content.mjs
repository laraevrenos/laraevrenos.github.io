// Site content for every locale. Edit text here, then run `npm run build`.
// Values may contain trusted inline HTML (<em>, <strong>, <br>); never use double quotes
// in strings that end up in attributes (aria-label, meta content).

export const SITE_URL = 'https://laraevrenos.github.io';
export const EMAIL = 'lara.evrenos@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/lara-evrenos/';
export const GITHUB = 'https://github.com/laraevrenos';

export const LOCALES = ['en', 'tr'];
export const DEFAULT_LOCALE = 'en';
export const PATHS = { en: '/', tr: '/tr/' };

export const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  tr: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
};

export const t = {
  en: {
    lang: 'en',
    ogLocale: 'en_US',
    meta: {
      title: 'Lara Evrenos — Technical Recruiter &amp; HR Business Partner | Berlin',
      description: 'Berlin-based Senior Technical Recruiter &amp; HR Business Partner: 10+ years of 360° fintech tech recruitment across Germany, Türkiye &amp; the EU. Fluent EN, DE, TR, NL.',
      ogTitle: 'Lara Evrenos — Senior Technical Recruiter &amp; HR Business Partner, Berlin',
      ogDescription: '360° technical recruitment for fintech — from developers to Product Owners, QA to Delivery Managers — across Germany, Türkiye and the EU. EN · DE · TR · NL.',
      imageAlt: 'Lara Evrenos — Technical Recruiter and HR Business Partner in Berlin',
    },
    ui: {
      skip: 'Skip to content',
      home: 'Lara Evrenos — back to top',
      theme: 'Toggle dark mode',
      menu: 'Open menu',
      langSwitch: 'Türkçe',
      langSwitchLabel: 'Bu sayfayı Türkçe görüntüle',
      social: 'Social links',
      linkedin: 'LinkedIn profile',
      github: 'GitHub profile',
      email: 'Send an email',
      copyEmail: 'Copy email address',
      toTop: 'Back to top',
      external: 'Visit website',
    },
    nav: {
      about: 'About', focus: '360° Hiring', sourcing: 'Sourcing', process: 'Process',
      experience: 'Experience', projects: 'Projects', cta: 'Let’s talk',
    },
    hero: {
      location: 'Berlin, Germany',
      portraitAlt: 'Portrait of Lara Evrenos, Technical Recruiter in Berlin',
      srRole: 'Senior Technical Recruiter and HR Business Partner',
      words: ['Senior Technical Recruiter', 'HR Business Partner', 'Fintech Talent Partner', '360° Tech Recruitment'],
      tagline: '360° technical recruitment for the <strong>fintech ecosystem</strong> — from developers to Product Owners, QA engineers to Delivery Managers.',
      regions: ['Germany', 'Türkiye', 'European Union'],
      ctaPrimary: 'Hiring? Let’s talk',
      ctaSecondary: 'See teams I’ve built',
      floatMatch: 'Match found',
      floatMatchSub: 'Senior Backend Engineer · 96% fit',
      floatOffer: 'Offer accepted',
      floatOfferSub: 'Product Owner · Berlin',
      scroll: 'Scroll to content',
    },
    stats: {
      label: 'Highlights',
      years: 'years of full-cycle recruitment',
      countries: 'countries hired across',
      languages: 'languages: EN · DE · TR · NL',
      followers: 'LinkedIn followers',
    },
    about: {
      eyebrow: 'About',
      title: 'People-first recruiting,<br><em>engineered</em> for tech.',
      lead: '10+ years of full-cycle recruitment in high-growth SaaS, IT and fintech companies. I’ve recruited talent all over the globe — mainly, but not only, for technical positions.',
      body: 'Today I’m an <strong>HR Business Partner</strong> and <strong>Senior Technical Recruiter</strong> at finbyte in Berlin, running technical recruitment for the fintech ecosystem. I’m passionate about technology and about giving candidates and hiring managers the best recruiting experience possible — in English, German, Turkish or Dutch.',
      languagesTitle: 'Languages',
      fluent: 'Fluent',
      expertiseTitle: 'Areas of expertise',
      groups: { sourcing: 'Sourcing', assessment: 'Assessment', strategy: 'HR strategy' },
      chips: {
        sourcing: ['Technical Recruitment', 'Global Talent Acquisition', 'Proactive Sourcing', 'Boolean Search', 'Headhunting'],
        assessment: ['Job Analysis &amp; Job Descriptions', 'CV Screening', 'Structured Interviewing', 'Pre-Employment Testing', 'Reference Checking'],
        strategy: ['HR Business Partnering', 'Employer Branding', 'HR Analytics', 'Applicant Tracking Systems (ATS)', 'Agile HR Management', 'Talent Life Cycle', 'Strategic HR', 'Startups &amp; Scale-ups'],
      },
      card: {
        label: 'Profile summary',
        title: 'HR Business Partner · Sr. Technical Recruiter',
        status: 'Open to connect',
        location: 'Location', locationValue: 'Berlin, Germany',
        company: 'Company', companyValue: 'finbyte <small>(Commencis × finleap)</small>',
        experience: 'Experience', experienceValue: '10+ years',
        languages: 'Languages', languagesValue: 'English · German · Turkish · Dutch',
        education: 'Education', educationValue: 'Radboud University Nijmegen',
        markets: 'Markets', marketsValue: 'Germany · Türkiye · EU · MENA · APAC',
        stage: 'Stage', stageLabel: 'Pipeline stage: offer',
        steps: ['Sourced', 'Screened', 'Interviewed', 'Offer'],
      },
    },
    focus: {
      eyebrow: '360° Recruitment',
      title: 'From developers to Product Owners.<br><em>The whole fintech team.</em>',
      lead: 'My recent focus is technical recruitment for the fintech ecosystem — covering every seat in a product team, from engineering and QA to product, delivery and leadership.',
      familiesLabel: 'Roles I recruit',
      regionsTitle: 'Where I recruit',
      regionsLead: 'Based in Berlin, hiring across Germany, Türkiye and the European Union — and beyond.',
      mapLabel: 'Network map: Berlin connected to hiring locations across Europe, Türkiye, the Middle East and Asia-Pacific',
    },
    sourcing: {
      eyebrow: 'Sourcing',
      title: 'Great engineers rarely apply.<br><em>They’re found.</em>',
      lead: 'Proactive sourcing and precise Boolean search let me reach passive candidates the job boards never see — then genuine, personal outreach turns a cold profile into a warm conversation.',
      points: ['Boolean &amp; X-ray search across talent platforms', 'Tech fluency to speak engineers’ language', 'Outreach in English, German, Turkish and Dutch'],
      termLabel: 'Animated example of a Boolean candidate search returning matching profiles',
      termNote: 'Illustrative example — no real candidate data.',
    },
    process: {
      eyebrow: 'Process',
      title: 'From brief to <em>signed offer</em>.',
      lead: 'A structured, transparent pipeline — so hiring managers get the right people and candidates always know where they stand.',
      step: 'Step',
      steps: [
        ['Intake &amp; job analysis', 'Align with hiring managers on outcomes and must-haves — and write a job description engineers actually want to read.'],
        ['Proactive sourcing', 'Boolean search, headhunting, referrals and talent communities to reach passive candidates worldwide.'],
        ['Screening &amp; interviews', 'CV screening and structured, fair interviews with clear scorecards at every stage.'],
        ['Assessment &amp; references', 'Pre-employment testing and reference checks that validate skills — not just CVs.'],
        ['Offer &amp; onboarding', 'Transparent offers, relocation support and a smooth first day. Great candidate experience until the very end.'],
      ],
    },
    experience: {
      eyebrow: 'Experience',
      title: 'A decade of building <em>tech teams</em>.',
      present: 'Present',
      education: 'Education &amp; research',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Teams I’ve helped <em>build</em>.',
      lead: 'Selected hiring projects — in-house and freelance — across industries, time zones and tech stacks.',
      filterLabel: 'Filter projects by industry',
      all: 'All',
      positions: 'Positions hired',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Your next great hire — <em>or your next great role.</em>',
      lead: 'Whether you’re building a team or looking for your next move, I’d love to hear from you — in English, Deutsch, Türkçe or Nederlands.',
      companiesTitle: 'For companies',
      companiesText: 'Hiring tech talent in Germany, Türkiye or across the EU? Tell me about the role, the team and your timeline.',
      companiesCta: 'Email me about a role',
      companiesSubject: 'Hiring inquiry',
      candidatesTitle: 'For candidates',
      candidatesText: 'Open to new opportunities in fintech and tech? Connect with me and share the kind of team you’d love to join next.',
      candidatesCta: 'Connect on LinkedIn',
    },
    footer: { location: 'Berlin' },
  },

  tr: {
    lang: 'tr',
    ogLocale: 'tr_TR',
    meta: {
      title: 'Lara Evrenos — Teknik İşe Alım Uzmanı &amp; HR Business Partner | Berlin',
      description: 'Berlin merkezli Kıdemli Teknik İşe Alım Uzmanı &amp; HR Business Partner. Almanya, Türkiye ve AB’de fintech için 10+ yıl 360° teknik işe alım. EN, DE, TR, NL.',
      ogTitle: 'Lara Evrenos — Kıdemli Teknik İşe Alım Uzmanı &amp; HR Business Partner, Berlin',
      ogDescription: 'Fintech için 360° teknik işe alım — yazılımcılardan Product Owner’lara, QA’den Delivery Manager’lara — Almanya, Türkiye ve Avrupa’da. EN · DE · TR · NL.',
      imageAlt: 'Lara Evrenos — Berlin’de Teknik İşe Alım Uzmanı ve HR Business Partner',
    },
    ui: {
      skip: 'İçeriğe geç',
      home: 'Lara Evrenos — başa dön',
      theme: 'Karanlık modu aç/kapat',
      menu: 'Menüyü aç',
      langSwitch: 'English',
      langSwitchLabel: 'View this page in English',
      social: 'Sosyal bağlantılar',
      linkedin: 'LinkedIn profili',
      github: 'GitHub profili',
      email: 'E-posta gönder',
      copyEmail: 'E-posta adresini kopyala',
      toTop: 'Başa dön',
      external: 'Web sitesini ziyaret et',
    },
    nav: {
      about: 'Hakkımda', focus: '360° İşe Alım', sourcing: 'Sourcing', process: 'Süreç',
      experience: 'Deneyim', projects: 'Projeler', cta: 'Tanışalım',
    },
    hero: {
      location: 'Berlin, Almanya',
      portraitAlt: 'Berlin’de Teknik İşe Alım Uzmanı Lara Evrenos’un portresi',
      srRole: 'Kıdemli Teknik İşe Alım Uzmanı ve HR Business Partner',
      words: ['Kıdemli Teknik İşe Alım Uzmanı', 'HR Business Partner', 'Fintech Yetenek Ortağı', '360° Teknik İşe Alım'],
      tagline: '<strong>Fintech ekosistemi</strong> için 360° teknik işe alım — yazılımcılardan Product Owner’lara, QA mühendislerinden Delivery Manager’lara.',
      regions: ['Almanya', 'Türkiye', 'Avrupa Birliği'],
      ctaPrimary: 'İşe alım mı yapıyorsunuz? Konuşalım',
      ctaSecondary: 'Kurduğum ekipler',
      floatMatch: 'Eşleşme bulundu',
      floatMatchSub: 'Senior Backend Engineer · %96 uyum',
      floatOffer: 'Teklif kabul edildi',
      floatOfferSub: 'Product Owner · Berlin',
      scroll: 'İçeriğe kaydır',
    },
    stats: {
      label: 'Öne çıkanlar',
      years: 'yıl uçtan uca işe alım deneyimi',
      countries: 'ülkede işe alım',
      languages: 'dil: EN · DE · TR · NL',
      followers: 'LinkedIn takipçisi',
    },
    about: {
      eyebrow: 'Hakkımda',
      title: 'İnsan odaklı işe alım,<br>teknoloji için <em>tasarlandı</em>.',
      lead: 'Hızla büyüyen SaaS, BT ve fintech şirketlerinde 10+ yıllık uçtan uca (full-cycle) işe alım deneyimi. Dünyanın dört bir yanından, ağırlıklı olarak teknik pozisyonlar için yetenekleri işe aldım.',
      body: 'Bugün Berlin’de finbyte’ta <strong>HR Business Partner</strong> ve <strong>Kıdemli Teknik İşe Alım Uzmanı</strong> olarak fintech ekosistemi için teknik işe alımı yönetiyorum. Teknolojiye ve hem adaylara hem de işe alım yöneticilerine en iyi deneyimi sunmaya tutkuyla bağlıyım — İngilizce, Almanca, Türkçe ya da Felemenkçe.',
      languagesTitle: 'Diller',
      fluent: 'Akıcı',
      expertiseTitle: 'Uzmanlık alanları',
      groups: { sourcing: 'Aday bulma', assessment: 'Değerlendirme', strategy: 'İK stratejisi' },
      chips: {
        sourcing: ['Teknik İşe Alım', 'Global Yetenek Kazanımı', 'Proaktif Aday Arama (Sourcing)', 'Boolean Arama', 'Headhunting'],
        assessment: ['İş Analizi &amp; İş Tanımları', 'CV Değerlendirme', 'Yapılandırılmış Mülakat', 'İşe Alım Öncesi Testler', 'Referans Kontrolü'],
        strategy: ['HR Business Partnering', 'İşveren Markası', 'İK Analitiği', 'Aday Takip Sistemleri (ATS)', 'Çevik (Agile) İK Yönetimi', 'Yetenek Yaşam Döngüsü', 'Stratejik İK', 'Startup &amp; Scale-up’lar'],
      },
      card: {
        label: 'Profil özeti',
        title: 'HR Business Partner · Kıdemli Teknik İşe Alım Uzmanı',
        status: 'Bağlantıya açık',
        location: 'Konum', locationValue: 'Berlin, Almanya',
        company: 'Şirket', companyValue: 'finbyte <small>(Commencis × finleap)</small>',
        experience: 'Deneyim', experienceValue: '10+ yıl',
        languages: 'Diller', languagesValue: 'İngilizce · Almanca · Türkçe · Felemenkçe',
        education: 'Eğitim', educationValue: 'Radboud University Nijmegen',
        markets: 'Pazarlar', marketsValue: 'Almanya · Türkiye · AB · MENA · APAC',
        stage: 'Aşama', stageLabel: 'Süreç aşaması: teklif',
        steps: ['Bulundu', 'Ön eleme', 'Mülakat', 'Teklif'],
      },
    },
    focus: {
      eyebrow: '360° İşe Alım',
      title: 'Yazılımcılardan Product Owner’lara.<br><em>Tüm fintech ekibi.</em>',
      lead: 'Son dönemde odağım fintech ekosistemi için teknik işe alım — yazılım ve QA’den ürün, teslimat ve liderlik rollerine kadar bir ürün ekibinin her pozisyonu.',
      familiesLabel: 'İşe aldığım roller',
      regionsTitle: 'Nerede işe alım yapıyorum',
      regionsLead: 'Berlin merkezli; Almanya, Türkiye ve Avrupa Birliği genelinde — ve ötesinde — işe alım.',
      mapLabel: 'Ağ haritası: Berlin’den Avrupa, Türkiye, Orta Doğu ve Asya-Pasifik’teki işe alım lokasyonlarına bağlantılar',
    },
    sourcing: {
      eyebrow: 'Aday Arama',
      title: 'İyi yazılımcılar nadiren başvurur.<br><em>Bulunurlar.</em>',
      lead: 'Proaktif sourcing ve isabetli Boolean aramalarla ilan sitelerinin hiç görmediği pasif adaylara ulaşıyorum; samimi, kişisel iletişimle de soğuk bir profili sıcak bir sohbete dönüştürüyorum.',
      points: ['Yetenek platformlarında Boolean &amp; X-ray arama', 'Yazılımcılarla aynı dili konuşacak teknik bilgi', 'İngilizce, Almanca, Türkçe ve Felemenkçe iletişim'],
      termLabel: 'Eşleşen profilleri listeleyen animasyonlu Boolean aday arama örneği',
      termNote: 'Temsili örnek — gerçek aday verisi içermez.',
    },
    process: {
      eyebrow: 'Süreç',
      title: 'İhtiyaç analizinden <em>imzalı teklife</em>.',
      lead: 'Yapılandırılmış ve şeffaf bir süreç — işe alım yöneticileri doğru kişilere ulaşır, adaylar her zaman nerede olduklarını bilir.',
      step: 'Adım',
      steps: [
        ['İhtiyaç &amp; iş analizi', 'Hedefler ve olmazsa olmazlar üzerinde işe alım yöneticileriyle uyum — ve yazılımcıların gerçekten okumak isteyeceği bir iş tanımı.'],
        ['Proaktif sourcing', 'Dünya genelinde pasif adaylara ulaşmak için Boolean arama, headhunting, referanslar ve yetenek toplulukları.'],
        ['Ön eleme &amp; mülakatlar', 'CV değerlendirme ve her aşamada net puan kartlarıyla yapılandırılmış, adil mülakatlar.'],
        ['Değerlendirme &amp; referanslar', 'Yalnızca CV’yi değil, yetkinlikleri doğrulayan testler ve referans kontrolleri.'],
        ['Teklif &amp; oryantasyon', 'Şeffaf teklifler, relocation desteği ve sorunsuz bir ilk gün. Sonuna kadar güçlü aday deneyimi.'],
      ],
    },
    experience: {
      eyebrow: 'Deneyim',
      title: '<em>Teknoloji ekipleri</em> kurarak geçen on yıl.',
      present: 'Günümüz',
      education: 'Eğitim &amp; araştırma',
    },
    projects: {
      eyebrow: 'Projeler',
      title: 'Kurulmasına katkı sağladığım <em>ekipler</em>.',
      lead: 'Şirket içi ve freelance olarak; farklı sektörler, saat dilimleri ve teknoloji yığınlarında seçilmiş işe alım projeleri.',
      filterLabel: 'Projeleri sektöre göre filtrele',
      all: 'Tümü',
      positions: 'İşe alınan pozisyonlar',
    },
    contact: {
      eyebrow: 'İletişim',
      title: 'Bir sonraki harika çalışanınız — <em>ya da bir sonraki harika rolünüz.</em>',
      lead: 'İster ekip kuruyor olun ister yeni bir adım arıyor olun, sizden haber almak isterim — English, Deutsch, Türkçe ya da Nederlands.',
      companiesTitle: 'Şirketler için',
      companiesText: 'Almanya’da, Türkiye’de ya da Avrupa genelinde teknik yetenek mi arıyorsunuz? Rolü, ekibi ve zaman planınızı anlatın.',
      companiesCta: 'Pozisyon için e-posta gönder',
      companiesSubject: 'İşe alım talebi',
      candidatesTitle: 'Adaylar için',
      candidatesText: 'Fintech ve teknoloji alanında yeni fırsatlara açık mısınız? Bağlantı kurun ve katılmak istediğiniz ekibi anlatın.',
      candidatesCta: 'LinkedIn’de bağlantı kur',
    },
    footer: { location: 'Berlin' },
  },
};

// Language names shown in the native language plus the page language.
export const LANGUAGES = [
  { code: 'EN', native: 'English', en: 'English', tr: 'İngilizce' },
  { code: 'DE', native: 'Deutsch', en: 'German', tr: 'Almanca' },
  { code: 'TR', native: 'Türkçe', en: 'Turkish', tr: 'Türkçe' },
  { code: 'NL', native: 'Nederlands', en: 'Dutch', tr: 'Felemenkçe' },
];

// 360° role families. Job titles stay in English — the industry standard in both markets.
export const ROLE_FAMILIES = [
  { icon: 'code', color: 'teal', name: { en: 'Engineering', tr: 'Yazılım Geliştirme' },
    roles: ['Backend Developers', 'Frontend Developers', 'Full Stack (Node.js &amp; React.js)', 'Java &amp; .NET Developers', 'iOS &amp; Android Developers', 'Salesforce Developers'] },
  { icon: 'cloud', color: 'amber', name: { en: 'Data &amp; Cloud', tr: 'Veri &amp; Bulut' },
    roles: ['Data Engineers', 'Big Data Architects', 'Cloud Solutions Architects', 'DevOps &amp; SysOps Engineers'] },
  { icon: 'shield', color: 'brand', name: { en: 'Quality', tr: 'Kalite' },
    roles: ['QA Engineers', 'Test Automation Engineers'] },
  { icon: 'compass', color: 'teal', name: { en: 'Product &amp; Delivery', tr: 'Ürün &amp; Teslimat' },
    roles: ['Product Owners', 'Delivery Managers', 'Agile Delivery Leads', 'Business Analysts'] },
  { icon: 'pen', color: 'amber', name: { en: 'Design &amp; Docs', tr: 'Tasarım &amp; Dokümantasyon' },
    roles: ['UX/UI Designers', 'API Technical Writers'] },
  { icon: 'chart', color: 'brand', name: { en: 'Business &amp; Leadership', tr: 'İş Geliştirme &amp; Liderlik' },
    roles: ['VP &amp; AVP roles', 'Country Managers', 'Account Executives', 'Customer Success Managers'] },
];

// Regions for the network map. x/y are hand-placed (stylised, not to scale); build.mjs crops the viewBox to 100,70 → 780,410.
export const REGIONS = [
  { key: 'de', color: 'brand', name: { en: 'Germany &amp; DACH', tr: 'Almanya &amp; DACH' },
    places: { en: 'Berlin · Germany · Austria · Switzerland', tr: 'Berlin · Almanya · Avusturya · İsviçre' } },
  { key: 'tr', color: 'amber', name: { en: 'Türkiye', tr: 'Türkiye' },
    places: { en: 'Istanbul · remote teams across Türkiye', tr: 'İstanbul · Türkiye genelinde uzaktan ekipler' } },
  { key: 'eu', color: 'teal', name: { en: 'European Union &amp; UK', tr: 'Avrupa Birliği &amp; Birleşik Krallık' },
    places: { en: 'Netherlands · Benelux · Poland · UK', tr: 'Hollanda · Benelüks · Polonya · Birleşik Krallık' } },
  { key: 'mena', color: 'ink', name: { en: 'MENA', tr: 'Orta Doğu' },
    places: { en: 'United Arab Emirates · Israel', tr: 'Birleşik Arap Emirlikleri · İsrail' } },
  { key: 'apac', color: 'ink', name: { en: 'APAC', tr: 'Asya-Pasifik' },
    places: { en: 'Singapore · Hong Kong · Malaysia · Indonesia · Thailand · Australia', tr: 'Singapur · Hong Kong · Malezya · Endonezya · Tayland · Avustralya' } },
];

export const MAP = {
  hub: { x: 300, y: 150, label: 'Berlin' },
  nodes: [
    { x: 212, y: 128, label: 'Amsterdam', region: 'eu' },
    { x: 140, y: 168, label: 'London', region: 'eu' },
    { x: 398, y: 120, label: 'Warsaw', region: 'eu' },
    { x: 330, y: 222, label: 'Vienna', region: 'de' },
    { x: 452, y: 262, label: 'Istanbul', region: 'tr' },
    { x: 486, y: 336, label: 'Tel Aviv', region: 'mena' },
    { x: 598, y: 304, label: 'Dubai', region: 'mena' },
    { x: 724, y: 236, label: 'Hong Kong', region: 'apac' },
    { x: 702, y: 372, label: 'Singapore', region: 'apac' },
  ],
};

export const EXPERIENCE = [
  {
    org: 'finbyte', url: 'https://finbyte.com/', logo: 'finbyte.jpeg', start: '2021-07', end: null,
    type: { en: 'Full-time', tr: 'Tam zamanlı' },
    location: { en: 'Berlin, Germany', tr: 'Berlin, Almanya' },
    roles: [
      { title: 'HR Business Partner', start: '2025-05', end: null, where: { en: 'Remote', tr: 'Uzaktan' } },
      { title: 'Senior Technical Recruiter', start: '2021-07', end: null },
    ],
    desc: {
      en: 'Technical recruitment for the fintech ecosystem — 360° hiring from developers to Product Owners and from QA engineers to Delivery Managers, for teams in Germany, Türkiye and across the EU. finbyte is a Berlin-based joint venture of Commencis and finleap, helping businesses build fintech solutions that reshape the future of finance.',
      tr: 'Fintech ekosistemi için teknik işe alım — Almanya, Türkiye ve AB genelindeki ekipler için yazılımcılardan Product Owner’lara, QA mühendislerinden Delivery Manager’lara 360° işe alım. finbyte, Commencis ve finleap’in Berlin merkezli ortak girişimidir; şirketlerin finansın geleceğini şekillendiren fintech çözümleri geliştirmesine yardımcı olur.',
    },
  },
  {
    org: 'Commencis', url: 'https://www.commencis.com/', logo: 'commencis.jpg', start: '2019-05', end: '2021-06',
    type: { en: 'Full-time', tr: 'Tam zamanlı' },
    location: { en: 'Istanbul, Türkiye', tr: 'İstanbul, Türkiye' },
    roles: [
      { title: 'Senior Technical Recruiter', start: '2021-02', end: '2021-06' },
      { title: 'Talent Acquisition Specialist', start: '2019-05', end: '2021-02' },
    ],
    desc: {
      en: 'Matched Turkish tech talent with international projects at Commencis &amp; finbyte. Commencis helps leading global brands grow and scale in digital with digital strategy, product design, product development, quality assurance and cloud transformation services.',
      tr: 'Commencis &amp; finbyte’ta Türk teknoloji yeteneklerini uluslararası projelerle buluşturdum. Commencis; dijital strateji, ürün tasarımı, ürün geliştirme, kalite güvence ve bulut dönüşümü hizmetleriyle global markaların dijitalde büyümesine yardımcı olur.',
    },
  },
  {
    org: 'Insider', url: 'https://useinsider.com/', logo: 'insider.png', start: '2018-02', end: '2019-05',
    type: { en: 'Full-time', tr: 'Tam zamanlı' },
    location: { en: 'Istanbul, Türkiye', tr: 'İstanbul, Türkiye' },
    roles: [
      { title: 'Recruitment Specialist', start: '2018-07', end: '2019-05' },
      { title: 'Talent Researcher', start: '2018-02', end: '2018-06' },
    ],
    desc: {
      en: 'Sourced candidates for Insider’s offices in Europe (Poland, Türkiye) and APAC (Singapore, Hong Kong, Malaysia, Indonesia, Thailand) — from Strategic Account Managers to Technical Account Managers — for the AI-powered Growth Management Platform.',
      tr: 'Insider’ın Avrupa (Polonya, Türkiye) ve Asya-Pasifik (Singapur, Hong Kong, Malezya, Endonezya, Tayland) ofisleri için Strategic Account Manager’dan Technical Account Manager’a kadar pozisyonlarda aday buldum.',
    },
  },
  {
    org: 'Talentra', url: null, logo: null, mono: 'T', start: '2015-05', end: '2018-01',
    type: { en: 'Full-time', tr: 'Tam zamanlı' },
    location: { en: 'Istanbul, Türkiye', tr: 'İstanbul, Türkiye' },
    roles: [{ title: 'Technical Recruitment Consultant', start: '2015-05', end: '2018-01', hideDuration: true }],
    desc: {
      en: 'Türkiye’s leading recruitment agency in the ICT sector, partnering with exciting local startups, SMEs and major international corporations.',
      tr: 'BT sektöründe Türkiye’nin önde gelen işe alım ajansı; yerel startup’lar, KOBİ’ler ve büyük uluslararası şirketlerle çalışır.',
    },
  },
];

export const EDUCATION = [
  { title: 'Radboud University Nijmegen', meta: { en: 'Nijmegen, Netherlands', tr: 'Nijmegen, Hollanda' } },
  { title: { en: 'Research Assistant · Koç University', tr: 'Araştırma Asistanı · Koç Üniversitesi' }, start: '2014-01', end: '2014-04',
    meta: { en: 'Istanbul, Türkiye', tr: 'İstanbul, Türkiye' } },
];

export const INDUSTRIES = [
  { key: 'fintech', en: 'FinTech', tr: 'FinTech' },
  { key: 'it', en: 'IT', tr: 'BT' },
  { key: 'banking', en: 'Banking', tr: 'Bankacılık' },
  { key: 'insurtech', en: 'InsurTech', tr: 'InsurTech' },
  { key: 'martech', en: 'MarTech', tr: 'MarTech' },
  { key: 'esports', en: 'E-Sports', tr: 'E-Spor' },
];

export const PROJECTS = [
  { name: 'finbyte', logo: 'finbyte.jpeg', url: 'https://finbyte.com/', industry: 'fintech', color: 'teal',
    role: 'Senior Technical Recruiter',
    positions: ['Senior Full Stack Engineer (Node.js &amp; React.js)', 'Senior Salesforce Developer', 'Senior Test Automation Engineer', 'Senior API Technical Writer', 'Product Owners', 'Delivery Managers'],
    location: { en: 'Germany · Türkiye (remote) · relocation to Germany', tr: 'Almanya · Türkiye (uzaktan) · Almanya’ya relocation' } },
  { name: 'Commencis', logo: 'commencis.jpg', url: 'https://www.commencis.com/', industry: 'it', color: 'brand',
    role: 'Senior Technical Recruiter',
    positions: ['Senior Java Developers', 'React.js Developers', 'Android &amp; iOS Developers', 'Big Data Solutions Architect', 'Senior Big Data Engineer', 'Data Engineer', 'Cloud Solutions Architect', 'Cloud DevOps Engineer', 'Cloud SysOps Engineer'],
    location: { en: 'Türkiye', tr: 'Türkiye' } },
  { name: 'Emirates NBD', logo: 'emirates.jpeg', url: 'https://www.emiratesnbd.com/en/', industry: 'banking', color: 'amber',
    role: 'Freelance Technical Recruiter',
    positions: ['VP Agile Delivery', 'AVP Reporting &amp; Analytics', 'AVP Data Ingestion'],
    location: { en: 'United Arab Emirates', tr: 'Birleşik Arap Emirlikleri' } },
  { name: 'Sapiens International', logo: 'sapiens.jpeg', url: 'https://sapiens.com/', industry: 'insurtech', color: 'teal',
    role: 'Freelance Technical Recruiter',
    positions: ['Senior Business Analyst', 'Java Developer', 'QA Engineer'],
    location: { en: 'Israel · Türkiye', tr: 'İsrail · Türkiye' } },
  { name: 'TokiGames', logo: 'toki.jpeg', url: 'https://tokigames.com/', industry: 'esports', color: 'amber',
    role: 'Freelance Technical Recruiter',
    positions: ['Senior Java Developer', 'Senior React.js Developer'],
    location: { en: 'Singapore · Türkiye (remote)', tr: 'Singapur · Türkiye (uzaktan)' } },
  { name: 'Insider', logo: 'insider.png', url: 'https://useinsider.com/', industry: 'martech', color: 'brand',
    role: 'Recruitment Specialist',
    positions: ['Country Manager', 'Aviation Sales Director', 'Account Executive', 'Business Development Representative', 'Customer Success Manager', 'Technical Account Manager'],
    location: { en: 'UK · DACH · Benelux · Poland · Australia', tr: 'Birleşik Krallık · DACH · Benelüks · Polonya · Avustralya' } },
  { name: 'Ovidos Creative', logo: 'ovidos.jpeg', url: 'https://www.ovidos.com/', industry: 'it', color: 'brand',
    role: 'Technical Recruitment Specialist',
    positions: ['.NET Developer', 'Angular Developer', 'iOS &amp; Android Developers', 'QA Engineer', 'DevOps Engineer', 'UX/UI Designer'],
    location: { en: 'Türkiye', tr: 'Türkiye' } },
];
