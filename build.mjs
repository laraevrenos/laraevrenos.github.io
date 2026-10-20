// Static site generator: renders src/content.mjs into index.html (EN) and tr/index.html (TR),
// plus sitemap.xml. No dependencies — run with `npm run build`.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_URL, EMAIL, LINKEDIN, GITHUB, LOCALES, DEFAULT_LOCALE, PATHS, MONTHS, t,
  LANGUAGES, ROLE_FAMILIES, REGIONS, MAP, EXPERIENCE, EDUCATION, INDUSTRIES, PROJECTS,
} from './src/content.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const NOW = new Date();
const TODAY = NOW.toISOString().slice(0, 10);

// ---------- helpers ----------
const pick = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v);
const stripTags = (s) => s.replace(/<[^>]+>/g, '');
const decode = (s) => stripTags(s).replace(/&amp;/g, '&');
const icon = (id, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const ext = (href, label, body) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer"${label ? ` aria-label="${label}"` : ''}>${body}</a>`;

function parseYm(ym) {
  const [y, m] = ym.split('-').map(Number);
  return { y, m };
}
function monthsBetween(start, end) {
  const s = parseYm(start);
  const e = end ? parseYm(end) : { y: NOW.getFullYear(), m: NOW.getMonth() + 1 };
  return (e.y - s.y) * 12 + (e.m - s.m) + 1;
}
// Mirrors formatDuration() in assets/js/main.js, which refreshes "Present" durations at runtime.
function formatDuration(total, lang) {
  const y = Math.floor(total / 12);
  const m = total % 12;
  if (lang === 'tr') return [y && `${y} yıl`, m && `${m} ay`].filter(Boolean).join(' ');
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
}
const fmtYm = (ym, lang) => {
  const { y, m } = parseYm(ym);
  return `${MONTHS[lang][m - 1]} ${y}`;
};
const duration = (start, end, lang) =>
  `<span class="duration" data-start="${start}"${end ? ` data-end="${end}"` : ''}>${formatDuration(monthsBetween(start, end), lang)}</span>`;
const range = (start, end, L, lang) => `${fmtYm(start, lang)} – ${end ? fmtYm(end, lang) : L.experience.present}`;
const absUrl = (lang) => SITE_URL + PATHS[lang];

// ---------- head ----------
function jsonLd(lang) {
  const L = t[lang];
  const url = absUrl(lang);
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Lara Evrenos',
    givenName: 'Lara',
    familyName: 'Evrenos',
    jobTitle: lang === 'tr'
      ? ['Kıdemli Teknik İşe Alım Uzmanı (Senior Technical Recruiter)', 'HR Business Partner']
      : ['Senior Technical Recruiter', 'HR Business Partner'],
    description: decode(L.meta.description),
    image: `${SITE_URL}/assets/images/profile.jpeg`,
    url: SITE_URL + '/',
    email: `mailto:${EMAIL}`,
    sameAs: [LINKEDIN, GITHUB],
    worksFor: { '@type': 'Organization', name: 'finbyte', url: 'https://finbyte.com/' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Radboud University Nijmegen' },
    workLocation: { '@type': 'Place', name: 'Berlin', address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' } },
    homeLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' } },
    knowsLanguage: LANGUAGES.map((l) => ({ '@type': 'Language', name: l.en, alternateName: l.code.toLowerCase() })),
    knowsAbout: [
      'Technical Recruitment', 'Tech Recruiting', 'Headhunting', 'Fintech Recruitment', 'Global Talent Acquisition',
      'HR Business Partnering', 'Boolean Search', 'Proactive Sourcing', 'Structured Interviewing', 'Employer Branding',
      'HR Analytics', 'Applicant Tracking Systems', 'Strategic HR',
      ...(lang === 'tr' ? ['Teknik İşe Alım', 'İnsan Kaynakları', 'İşe Alım', 'Yetenek Kazanımı'] : []),
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: lang === 'tr' ? 'Teknik İşe Alım Uzmanı' : 'Technical Recruiter',
      occupationLocation: [
        { '@type': 'City', name: 'Berlin' },
        { '@type': 'Country', name: 'Germany' },
        { '@type': 'Country', name: 'Türkiye' },
        { '@type': 'AdministrativeArea', name: 'European Union' },
      ],
      skills: 'Technical recruitment, 360° recruitment, fintech hiring, Boolean search, sourcing, structured interviewing, HR business partnering',
    },
  };
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL + '/', name: 'Lara Evrenos', inLanguage: ['en', 'tr'], publisher: { '@id': person['@id'] } },
      {
        '@type': 'ProfilePage', '@id': `${url}#profile`, url, name: decode(L.meta.title), inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` }, mainEntity: { '@id': person['@id'] }, dateModified: TODAY,
        primaryImageOfPage: `${SITE_URL}/assets/images/og-cover.png`,
      },
      person,
    ],
  };
  return JSON.stringify(graph, null, 2).replace(/</g, '\\u003c');
}

function head(lang) {
  const L = t[lang];
  const url = absUrl(lang);
  const alt = LOCALES.filter((l) => l !== lang);
  return `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${L.meta.title}</title>
  <meta name="description" content="${L.meta.description}">
  <meta name="author" content="Lara Evrenos">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta name="theme-color" content="#FAFAF8" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0E131B" media="(prefers-color-scheme: dark)">
  <meta name="color-scheme" content="light dark">
  <link rel="canonical" href="${url}">
${LOCALES.map((l) => `  <link rel="alternate" hreflang="${l}" href="${absUrl(l)}">`).join('\n')}
  <link rel="alternate" hreflang="x-default" href="${absUrl(DEFAULT_LOCALE)}">

  <meta property="og:type" content="profile">
  <meta property="og:site_name" content="Lara Evrenos">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${L.meta.ogTitle}">
  <meta property="og:description" content="${L.meta.ogDescription}">
  <meta property="og:image" content="${SITE_URL}/assets/images/og-cover.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${L.meta.imageAlt}">
  <meta property="og:locale" content="${L.ogLocale}">
${alt.map((l) => `  <meta property="og:locale:alternate" content="${t[l].ogLocale}">`).join('\n')}
  <meta property="profile:first_name" content="Lara">
  <meta property="profile:last_name" content="Evrenos">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${L.meta.ogTitle}">
  <meta name="twitter:description" content="${L.meta.ogDescription}">
  <meta name="twitter:image" content="${SITE_URL}/assets/images/og-cover.png">

  <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.json">

  <link rel="preload" href="/assets/fonts/woff2/roboto-slab-semibold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/images/profile.webp" as="image" type="image/webp">
  <link rel="stylesheet" href="/assets/css/style.css">

  <!-- Apply the saved theme before first paint to avoid a flash -->
  <script>
    (function () {
      try {
        var th = localStorage.getItem('theme');
        if (th === 'light' || th === 'dark') document.documentElement.setAttribute('data-theme', th);
      } catch (e) {}
      document.documentElement.classList.add('js');
    })();
  </script>

  <script type="application/ld+json">
${jsonLd(lang)}
  </script>
</head>`;
}

// ---------- icon sprite ----------
const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
    <defs>
      <symbol id="i-linkedin" viewBox="0 0 24 24"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></symbol>
      <symbol id="i-github" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></symbol>
      <symbol id="i-mail" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/></g></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></symbol>
      <symbol id="i-external" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M8 7h9v9"/></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></g></symbol>
      <symbol id="i-sun" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></g></symbol>
      <symbol id="i-moon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.6 6.6 0 0 0 9.7 9.7z"/></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/></symbol>
      <symbol id="i-copy" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15h-.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5"/></g></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M5 12.5 10 17.5 19 7"/></symbol>
      <symbol id="i-brief" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V2.8h6V4M9 10h6M9 14h4"/></g></symbol>
      <symbol id="i-target" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><circle cx="11" cy="11" r="3"/><path d="m20.5 20.5-4.5-4.5"/></g></symbol>
      <symbol id="i-chat" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8.5 8.5 0 0 1-12.3 7.6L3.5 21l1.4-5A8.5 8.5 0 1 1 21 12z"/><path d="M8.5 11h7M8.5 14.5h4"/></g></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3z"/><path d="m9 12 2 2 4-4"/></g></symbol>
      <symbol id="i-rocket" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9-.8-.8-2.1-.8-2.9-.1z"/><path d="m12 15-3-3a22 22 0 0 1 2-4 13 13 0 0 1 10.5-5.5c0 2.7-.8 7.5-6 11a22 22 0 0 1-3.5 1.5z"/><path d="M9 12H4.5s.6-3 2-4c1.6-1.1 4.5 0 4.5 0M12 15v4.5s3-.6 4-2c1.1-1.6 0-4.5 0-4.5"/></g></symbol>
      <symbol id="i-cap" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9.5 12 4.5l10 5-10 5-10-5z"/><path d="M6 11.5v4.5c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9.5v5.5"/></g></symbol>
      <symbol id="i-users" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/></g></symbol>
      <symbol id="i-globe" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></g></symbol>
      <symbol id="i-up" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 19V5M6 11l6-6 6 6"/></symbol>
      <symbol id="i-code" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></symbol>
      <symbol id="i-cloud" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 17.9 11a3.8 3.8 0 0 1-.4 7.5z"/></symbol>
      <symbol id="i-compass" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></g></symbol>
      <symbol id="i-pen" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></g></symbol>
      <symbol id="i-chart" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M3 20h18M6 16v-5M11 16V6M16 16v-8M20 5l-4 3-5-2-5 5"/></symbol>
    </defs>
  </svg>`;

// ---------- sections ----------
function header(lang) {
  const L = t[lang];
  const other = LOCALES.find((l) => l !== lang);
  const links = ['about', 'focus', 'sourcing', 'process', 'experience', 'projects'];
  return `<a class="skip-link" href="#main">${L.ui.skip}</a>
  <div class="scroll-progress" aria-hidden="true"><span></span></div>

  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="#home" aria-label="${L.ui.home}">
        <span class="brand-pixels" aria-hidden="true"><i></i><i></i><i></i></span>
        LARA EVRENOS
      </a>

      <nav class="nav" id="site-nav" aria-label="Primary">
        <ul>
${links.map((k) => `          <li><a href="#${k}">${L.nav[k]}</a></li>`).join('\n')}
        </ul>
        <a class="btn btn-primary btn-sm nav-cta" href="#contact">${L.nav.cta}</a>
      </nav>

      <div class="header-actions">
        <a class="lang-switch" href="${PATHS[other]}" hreflang="${other}" lang="${other}" aria-label="${L.ui.langSwitchLabel}">
          <span class="ls-current" aria-hidden="true">${lang.toUpperCase()}</span><span class="ls-sep" aria-hidden="true">/</span><span class="ls-other">${other.toUpperCase()}</span>
        </a>
        <button class="icon-btn theme-toggle" type="button" aria-label="${L.ui.theme}">
          ${icon('sun', 'icon icon-sun')}
          ${icon('moon', 'icon icon-moon')}
        </button>
        <button class="icon-btn nav-toggle" type="button" aria-label="${L.ui.menu}" aria-expanded="false" aria-controls="site-nav">
          ${icon('menu', 'icon icon-open')}
          ${icon('close', 'icon icon-close')}
        </button>
      </div>
    </div>
  </header>`;
}

function socials(L, cls = 'socials') {
  return `<ul class="${cls}" aria-label="${L.ui.social}">
          <li>${ext(LINKEDIN, L.ui.linkedin, icon('linkedin'))}</li>
          <li>${ext(GITHUB, L.ui.github, icon('github'))}</li>
          <li><a href="mailto:${EMAIL}" aria-label="${L.ui.email}">${icon('mail')}</a></li>
        </ul>`;
}

function hero(lang) {
  const L = t[lang];
  const H = L.hero;
  return `<section class="hero" id="home" aria-labelledby="hero-name">
      <canvas class="hero-canvas" aria-hidden="true"></canvas>
      <div class="hero-glow" aria-hidden="true"></div>

      <div class="container hero-inner">
        <div class="hero-portrait reveal">
          <div class="portrait-ring" aria-hidden="true"></div>
          <img src="/assets/images/profile.webp" width="457" height="457" alt="${H.portraitAlt}" fetchpriority="high">
          <span class="status-dot" aria-hidden="true"></span>

          <div class="float-card fc-match" aria-hidden="true">
            <span class="fc-icon fc-teal">${icon('users')}</span>
            <span><strong>${H.floatMatch}</strong><small>${H.floatMatchSub}</small></span>
          </div>
          <div class="float-card fc-offer" aria-hidden="true">
            <span class="fc-icon fc-green">${icon('check')}</span>
            <span><strong>${H.floatOffer}</strong><small>${H.floatOfferSub}</small></span>
          </div>
          <div class="float-card fc-code" aria-hidden="true">
            <code>(Fintech <b>OR</b> Banking) <b>AND</b> &quot;Product Owner&quot;</code>
          </div>
        </div>

        <p class="hero-eyebrow reveal" style="--d:1">
          ${icon('pin')}
          ${H.location} <span class="sep" aria-hidden="true">·</span> finbyte
        </p>

        <h1 class="hero-name reveal" id="hero-name" style="--d:2">Lara Evrenos<span class="visually-hidden"> — ${H.srRole}</span></h1>

        <p class="hero-role reveal" style="--d:3" aria-hidden="true">
          <span class="typer" data-words='${JSON.stringify(H.words).replace(/'/g, '&#39;')}'>${H.words[0]}</span><span class="caret"></span>
        </p>

        <p class="hero-tagline reveal" style="--d:4">${H.tagline}</p>

        <ul class="hero-regions reveal" style="--d:5">
${H.regions.map((r, i) => `          <li><span class="dot dot-${['brand', 'amber', 'teal'][i]}" aria-hidden="true"></span>${r}</li>`).join('\n')}
        </ul>

        <div class="hero-cta reveal" style="--d:6">
          <a class="btn btn-primary magnetic" href="#contact">${H.ctaPrimary} ${icon('arrow')}</a>
          <a class="btn btn-ghost magnetic" href="#projects">${H.ctaSecondary}</a>
        </div>

        <div class="reveal" style="--d:7">
        ${socials(L)}
        </div>
      </div>

      <a class="scroll-cue" href="#stats" aria-label="${H.scroll}"><span></span></a>
    </section>`;
}

function stats(lang) {
  const S = t[lang].stats;
  const items = [
    ['10', '+', S.years], ['15', '+', S.countries], ['4', '', S.languages], ['19.6', 'K', S.followers],
  ];
  return `<section class="stats" id="stats" aria-label="${S.label}">
      <div class="container">
        <ul class="stats-grid">
${items.map(([n, suf, label], i) => `          <li class="stat reveal" style="--d:${i}">
            <span class="stat-value"><span class="count" data-to="${n}"${n.includes('.') ? ' data-decimals="1"' : ''}>${n}</span>${suf}</span>
            <span class="stat-label">${label}</span>
          </li>`).join('\n')}
        </ul>
      </div>
    </section>`;
}

const eyebrow = (n, text, extra = '') => `<p class="eyebrow reveal${extra}"><span>${n}</span> ${text}</p>`;

function about(lang) {
  const A = t[lang].about;
  const C = A.card;
  const group = (key, dot, d) => `<div class="skill-group reveal" style="--d:${d}">
              <h4><span class="dot dot-${dot}" aria-hidden="true"></span>${A.groups[key]}</h4>
              <ul class="chips">${A.chips[key].map((c) => `<li>${c}</li>`).join('')}</ul>
            </div>`;
  const fields = [
    [C.location, C.locationValue], [C.company, C.companyValue], [C.experience, C.experienceValue],
    [C.languages, C.languagesValue], [C.education, C.educationValue], [C.markets, C.marketsValue],
  ];
  return `<section class="section about" id="about" aria-labelledby="about-title">
      <div class="container about-grid">
        <div class="about-copy">
          ${eyebrow('01', A.eyebrow)}
          <h2 class="section-title reveal" id="about-title">${A.title}</h2>
          <p class="lead reveal">${A.lead}</p>
          <p class="reveal">${A.body}</p>

          <h3 class="sub-title reveal">${A.languagesTitle}</h3>
          <ul class="languages">
${LANGUAGES.map((l, i) => `            <li class="lang-card reveal" style="--d:${i}">
              <span class="lang-code" aria-hidden="true">${l.code}</span>
              <span class="lang-text"><strong lang="${l.code.toLowerCase()}">${l.native}</strong><small>${l.native === l[lang] ? '' : `${l[lang]} · `}${A.fluent}</small></span>
            </li>`).join('\n')}
          </ul>

          <h3 class="sub-title reveal">${A.expertiseTitle}</h3>
          <div class="skill-groups">
            ${group('sourcing', 'teal', 0)}
            ${group('assessment', 'amber', 1)}
            ${group('strategy', 'brand', 2)}
          </div>
        </div>

        <aside class="profile-card reveal tilt" aria-label="${C.label}">
          <div class="pc-head">
            <img src="/assets/images/profile.webp" width="56" height="56" alt="" loading="lazy">
            <div>
              <p class="pc-name">Lara Evrenos</p>
              <p class="pc-title">${C.title}</p>
            </div>
          </div>
          <span class="pill pill-green"><span class="live-dot" aria-hidden="true"></span>${C.status}</span>
          <dl class="pc-fields">
${fields.map(([k, v]) => `            <div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n')}
          </dl>
          <div class="pc-foot">
            <span class="pc-stage">${C.stage}</span>
            <ol class="pc-steps" aria-label="${C.stageLabel}">
              ${C.steps.map((s, i) => `<li class="${i === C.steps.length - 1 ? 'current' : 'done'}">${s}</li>`).join('')}
            </ol>
          </div>
        </aside>
      </div>
    </section>`;
}

function networkMap(lang) {
  const F = t[lang].focus;
  const { hub, nodes } = MAP;
  const regionColor = Object.fromEntries(REGIONS.map((r) => [r.key, r.color]));
  // Gentle arcs: control point lifted perpendicular to the chord.
  const arc = (n) => {
    const mx = (hub.x + n.x) / 2;
    const my = (hub.y + n.y) / 2;
    const dx = n.x - hub.x;
    const dy = n.y - hub.y;
    const len = Math.hypot(dx, dy) || 1;
    const lift = Math.min(70, len * 0.28);
    return `M${hub.x} ${hub.y} Q${(mx + (dy / len) * lift).toFixed(1)} ${(my - (dx / len) * lift).toFixed(1)} ${n.x} ${n.y}`;
  };
  return `<figure class="net-map reveal" role="img" aria-label="${F.mapLabel}">
            <svg viewBox="100 70 680 340" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <defs>
                <pattern id="map-dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" class="map-dot-fill"/></pattern>
              </defs>
              <rect x="100" y="70" width="680" height="340" fill="url(#map-dots)" class="map-grid"/>
              ${nodes.map((n, i) => `<path class="map-arc c-${regionColor[n.region]}" d="${arc(n)}" style="--i:${i}"/>`).join('\n              ')}
              ${nodes.map((n, i) => `<g class="map-node c-${regionColor[n.region]}" style="--i:${i}" transform="translate(${n.x} ${n.y})"><circle class="pulse" r="6"/><circle class="core" r="6"/><text y="-14">${n.label}</text></g>`).join('\n              ')}
              <g class="map-hub" transform="translate(${hub.x} ${hub.y})"><circle class="pulse" r="10"/><circle class="pulse p2" r="10"/><circle class="core" r="9"/><text y="30">${hub.label}</text></g>
            </svg>
          </figure>`;
}

function focus(lang) {
  const F = t[lang].focus;
  return `<section class="section focus" id="focus" aria-labelledby="focus-title">
      <div class="container">
        <div class="section-head">
          ${eyebrow('02', F.eyebrow)}
          <h2 class="section-title reveal" id="focus-title">${F.title}</h2>
          <p class="lead reveal">${F.lead}</p>
        </div>

        <h3 class="visually-hidden">${F.familiesLabel}</h3>
        <ul class="families">
${ROLE_FAMILIES.map((f, i) => `          <li class="family reveal spotlight" style="--d:${i % 3}">
            <span class="fam-icon fam-${f.color}">${icon(f.icon)}</span>
            <h4>${f.name[lang]}</h4>
            <ul class="chips chips-sm">${f.roles.map((r) => `<li>${r}</li>`).join('')}</ul>
          </li>`).join('\n')}
        </ul>

        <div class="regions">
          <div class="regions-copy">
            <h3 class="sub-title reveal">${F.regionsTitle}</h3>
            <p class="reveal">${F.regionsLead}</p>
            <ul class="region-list">
${REGIONS.map((r, i) => `              <li class="reveal" style="--d:${i}"><span class="dot dot-${r.color}" aria-hidden="true"></span><span><strong>${r.name[lang]}</strong><small>${r.places[lang]}</small></span></li>`).join('\n')}
            </ul>
          </div>
          ${networkMap(lang)}
        </div>
      </div>
    </section>`;
}

function sourcing(lang) {
  const S = t[lang].sourcing;
  return `<section class="section sourcing" id="sourcing" aria-labelledby="sourcing-title">
      <div class="container sourcing-grid">
        <div class="sourcing-copy">
          ${eyebrow('03', S.eyebrow)}
          <h2 class="section-title reveal" id="sourcing-title">${S.title}</h2>
          <p class="lead reveal">${S.lead}</p>
          <ul class="check-list reveal">
${S.points.map((p) => `            <li>${icon('check')}${p}</li>`).join('\n')}
          </ul>
        </div>

        <div class="terminal reveal" style="--d:1" role="img" aria-label="${S.termLabel}">
          <div class="term-bar" aria-hidden="true">
            <span class="tb-dot r"></span><span class="tb-dot y"></span><span class="tb-dot g"></span>
            <span class="tb-title">talent-search — zsh</span>
          </div>
          <div class="term-body" aria-hidden="true">
            <p class="term-line"><span class="prompt">lara@berlin</span> <span class="path">~</span> <span class="dollar">$</span> <span class="term-query"></span><span class="term-caret"></span></p>
            <p class="term-meta"></p>
            <ul class="term-results"></ul>
          </div>
          <p class="term-note">${S.termNote}</p>
        </div>
      </div>
    </section>`;
}

function processSection(lang) {
  const P = t[lang].process;
  const icons = ['brief', 'target', 'chat', 'shield', 'rocket'];
  return `<section class="section process" id="process" aria-labelledby="process-title">
      <div class="container">
        <div class="section-head">
          ${eyebrow('04', P.eyebrow)}
          <h2 class="section-title reveal" id="process-title">${P.title}</h2>
          <p class="lead reveal">${P.lead}</p>
        </div>

        <div class="pipeline">
          <div class="pipeline-track" aria-hidden="true">
            <span class="pipeline-fill"></span>
            <span class="pipeline-token"><img src="/assets/images/profile.webp" alt="" width="32" height="32" loading="lazy"></span>
          </div>
          <ol class="pipeline-steps">
${P.steps.map(([title, text], i) => `            <li class="step reveal" style="--d:${i}">
              <span class="step-icon">${icon(icons[i])}</span>
              <span class="step-num">${P.step} ${i + 1}</span>
              <h3>${title}</h3>
              <p>${text}</p>
            </li>`).join('\n')}
          </ol>
        </div>
      </div>
    </section>`;
}

function experience(lang) {
  const L = t[lang];
  const E = L.experience;
  const item = (x) => {
    const logo = x.logo
      ? `<div class="tl-logo"><img src="/assets/images/${x.logo}" alt="${x.org} logo" width="56" height="56" loading="lazy"></div>`
      : `<div class="tl-logo tl-mono" aria-hidden="true">${x.mono}</div>`;
    const name = x.url ? ext(x.url, '', `${x.org} ${icon('external')}`) : x.org;
    return `          <li class="tl-item reveal">
            ${logo}
            <article class="tl-card">
              <header class="tl-head">
                <h3>${name}</h3>
                <p class="tl-meta">${x.type[lang]} · ${duration(x.start, x.end, lang)} · ${x.location[lang]}</p>
              </header>
              <ul class="roles">
${x.roles.map((r) => `                <li class="role${r.end ? '' : ' current'}">
                  <h4>${r.title}</h4>
                  <p class="role-meta">${range(r.start, r.end, L, lang)}${r.hideDuration ? '' : ` · ${duration(r.start, r.end, lang)}`}${r.where ? ` · ${r.where[lang]}` : ''}</p>
                </li>`).join('\n')}
              </ul>
              <p class="tl-desc">${x.desc[lang]}</p>
            </article>
          </li>`;
  };
  const edu = `          <li class="tl-item reveal">
            <div class="tl-logo tl-mono tl-mono-alt" aria-hidden="true">${icon('cap')}</div>
            <article class="tl-card">
              <header class="tl-head"><h3>${E.education}</h3></header>
              <ul class="roles">
${EDUCATION.map((e) => `                <li class="role">
                  <h4>${pick(e.title, lang)}</h4>
                  <p class="role-meta">${e.start ? `${range(e.start, e.end, L, lang)} · ${duration(e.start, e.end, lang)} · ` : ''}${e.meta[lang]}</p>
                </li>`).join('\n')}
              </ul>
            </article>
          </li>`;
  return `<section class="section experience" id="experience" aria-labelledby="experience-title">
      <div class="container">
        <div class="section-head">
          ${eyebrow('05', E.eyebrow)}
          <h2 class="section-title reveal" id="experience-title">${E.title}</h2>
        </div>
        <ol class="timeline">
${EXPERIENCE.map(item).join('\n')}
${edu}
        </ol>
      </div>
    </section>`;
}

function projects(lang) {
  const L = t[lang];
  const P = L.projects;
  const ind = Object.fromEntries(INDUSTRIES.map((i) => [i.key, i[lang]]));
  const logos = PROJECTS.map((p) => `<img src="/assets/images/${p.logo}" alt="" width="48" height="48" loading="lazy">`).join('');
  return `<section class="section projects" id="projects" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-head">
          ${eyebrow('06', P.eyebrow)}
          <h2 class="section-title reveal" id="projects-title">${P.title}</h2>
          <p class="lead reveal">${P.lead}</p>
        </div>

        <div class="logo-marquee reveal" aria-hidden="true">
          <div class="marquee-track">${logos}${logos}</div>
        </div>

        <div class="filters reveal" role="group" aria-label="${P.filterLabel}">
          <button type="button" class="filter is-active" data-filter="all" aria-pressed="true">${P.all}</button>
${INDUSTRIES.map((i) => `          <button type="button" class="filter" data-filter="${i.key}" aria-pressed="false">${i[lang]}</button>`).join('\n')}
        </div>

        <ul class="project-grid">
${PROJECTS.map((p, i) => `          <li class="project reveal spotlight" data-industry="${p.industry}" style="--d:${i % 3}">
            <div class="pj-head">
              <img src="/assets/images/${p.logo}" alt="${p.name} logo" width="52" height="52" loading="lazy">
              <div><h3>${p.name}</h3><p class="pj-role">${p.role}</p></div>
              <span class="tag tag-${p.color}">${ind[p.industry]}</span>
            </div>
            <p class="pj-label">${P.positions}</p>
            <ul class="pj-roles">${p.positions.map((r) => `<li>${r}</li>`).join('')}</ul>
            <div class="pj-foot">
              <span class="pj-loc">${icon('pin')}${p.location[lang]}</span>
              ${ext(p.url, `${L.ui.external}: ${p.name}`, icon('external'))}
            </div>
          </li>`).join('\n')}
        </ul>
        <p class="filter-status visually-hidden" aria-live="polite"></p>
      </div>
    </section>`;
}

function contact(lang) {
  const L = t[lang];
  const C = L.contact;
  return `<section class="section contact" id="contact" aria-labelledby="contact-title">
      <div class="container">
        <div class="contact-panel reveal">
          <div class="pixel-field" aria-hidden="true"></div>
          <div class="contact-head">
            <p class="eyebrow eyebrow-light"><span>07</span> ${C.eyebrow}</p>
            <h2 class="section-title" id="contact-title">${C.title}</h2>
            <p class="lead">${C.lead}</p>
          </div>

          <div class="contact-cards">
            <article class="contact-card">
              <span class="cc-icon cc-teal">${icon('users')}</span>
              <h3>${C.companiesTitle}</h3>
              <p>${C.companiesText}</p>
              <a class="btn btn-light" href="mailto:${EMAIL}?subject=${encodeURIComponent(C.companiesSubject)}">${C.companiesCta} ${icon('arrow')}</a>
            </article>
            <article class="contact-card">
              <span class="cc-icon cc-amber">${icon('globe')}</span>
              <h3>${C.candidatesTitle}</h3>
              <p>${C.candidatesText}</p>
              <a class="btn btn-light" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">${C.candidatesCta} ${icon('linkedin')}</a>
            </article>
          </div>

          <div class="email-row">
            <a href="mailto:${EMAIL}" class="email-link">${EMAIL}</a>
            <button type="button" class="icon-btn copy-email" data-email="${EMAIL}" aria-label="${L.ui.copyEmail}">
              ${icon('copy', 'icon icon-copy')}
              ${icon('check', 'icon icon-done')}
            </button>
          </div>
        </div>
      </div>
    </section>`;
}

function footer(lang) {
  const L = t[lang];
  return `<footer class="site-footer">
    <div class="container footer-inner">
      <p>© <span class="year">${NOW.getFullYear()}</span> Lara Evrenos · ${L.footer.location}</p>
      ${socials(L, 'socials socials-sm')}
      <a class="to-top" href="#home">${L.ui.toTop} ${icon('up')}</a>
    </div>
  </footer>`;
}

function page(lang) {
  return `<!DOCTYPE html>
<!-- Generated by build.mjs from src/content.mjs — edit the source, then run \`npm run build\`. -->
<html lang="${lang}">
${head(lang)}
<body>
  ${SPRITE}

  ${header(lang)}

  <main id="main">
    ${hero(lang)}

    ${stats(lang)}

    ${about(lang)}

    ${focus(lang)}

    ${sourcing(lang)}

    ${processSection(lang)}

    ${experience(lang)}

    ${projects(lang)}

    ${contact(lang)}
  </main>

  ${footer(lang)}

  <div class="toast" role="status" aria-live="polite"></div>

  <script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

function sitemap() {
  const alts = LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absUrl(l)}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${absUrl(DEFAULT_LOCALE)}"/>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LOCALES.map((l) => `  <url>
    <loc>${absUrl(l)}</loc>
    <lastmod>${TODAY}</lastmod>
${alts}
  </url>`).join('\n')}
</urlset>
`;
}

// ---------- write ----------
const outputs = [
  ...LOCALES.map((l) => [join(ROOT, PATHS[l], 'index.html'), page(l)]),
  [join(ROOT, 'sitemap.xml'), sitemap()],
];
for (const [file, html] of outputs) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html, 'utf8');
  console.log('wrote', file.replace(ROOT, '.'));
}
