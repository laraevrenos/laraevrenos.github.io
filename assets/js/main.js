/* Lara Evrenos — site interactions. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var lang = root.lang === 'tr' ? 'tr' : 'en';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var I18N = {
    en: {
      menuOpen: 'Open menu', menuClose: 'Close menu', copied: 'Email copied to clipboard',
      copyFail: 'Copy failed — the address is lara.evrenos@gmail.com',
      found: 'profiles found', ranking: 'ranking by fit…', top: 'top matches',
      showing: function (n) { return n + ' projects shown'; },
      yrs: function (y) { return y + ' yr' + (y > 1 ? 's' : ''); }, mos: function (m) { return m + ' mo' + (m > 1 ? 's' : ''); },
      years: 'yrs'
    },
    tr: {
      menuOpen: 'Menüyü aç', menuClose: 'Menüyü kapat', copied: 'E-posta adresi kopyalandı',
      copyFail: 'Kopyalanamadı — adres: lara.evrenos@gmail.com',
      found: 'profil bulundu', ranking: 'uyuma göre sıralanıyor…', top: 'en iyi eşleşme',
      showing: function (n) { return n + ' proje gösteriliyor'; },
      yrs: function (y) { return y + ' yıl'; }, mos: function (m) { return m + ' ay'; },
      years: 'yıl'
    }
  }[lang];

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  /* ---------- Legacy routes & old Flutter service worker ---------- */
  // The previous Flutter site used hash routes (#/about, #/projects).
  var legacy = { '#/': '#home', '#/about': '#about', '#/projects': '#projects' };
  if (legacy[location.hash]) history.replaceState(null, '', location.pathname + legacy[location.hash]);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (r) { r.unregister(); });
    }).catch(function () {});
  }

  /* ---------- Theme ---------- */
  var themeBtn = $('.theme-toggle');
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (themeBtn) {
    themeBtn.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      themeBtn.setAttribute('aria-pressed', String(next === 'dark'));
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- Header, progress, mobile nav ---------- */
  var header = $('.site-header');
  var progress = $('.scroll-progress span');
  var navToggle = $('.nav-toggle');
  var nav = $('#site-nav');

  function setNav(open) {
    header.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? I18N.menuClose : I18N.menuOpen);
  }
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () { setNav(!header.classList.contains('nav-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) { setNav(false); navToggle.focus(); }
    });
  }

  /* ---------- Scroll-linked effects (one rAF-throttled handler) ---------- */
  var pipeline = $('.pipeline');
  var steps = $$('.step');
  var timeline = $('.timeline');
  var ticking = false;

  function sectionProgress(el, startAt, endAt) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = (vh * startAt - r.top) / (r.height + vh * (startAt - endAt));
    return Math.max(0, Math.min(1, p));
  }

  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    var max = doc.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (header) header.classList.toggle('is-scrolled', y > 12);

    if (pipeline) {
      var p = sectionProgress(pipeline, 0.75, 0.35);
      pipeline.style.setProperty('--p', p.toFixed(4));
      var n = steps.length;
      steps.forEach(function (s, i) { s.classList.toggle('is-lit', p >= (n === 1 ? 0 : i / (n - 1)) - 0.02); });
    }
    if (timeline) timeline.style.setProperty('--tp', sectionProgress(timeline, 0.7, 0.5).toFixed(4));
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Active nav link ---------- */
  var navLinks = $$('.nav ul a');
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
        var link = byId[en.target.id];
        if (link) { link.classList.add('is-active'); link.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Run a callback once when an element first scrolls into view.
  function onceVisible(el, cb, threshold) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var o = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { o.disconnect(); cb(); }
    }, { threshold: threshold || 0.3 });
    o.observe(el);
  }

  /* ---------- Count-up stats ---------- */
  $$('.count').forEach(function (el) {
    var to = parseFloat(el.getAttribute('data-to'));
    var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    if (reduceMotion || isNaN(to)) return;
    el.textContent = (0).toFixed(dec);
    onceVisible(el, function () {
      var start = performance.now();
      var dur = 1600;
      (function frame(now) {
        var t = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - t, 4);
        el.textContent = (to * eased).toFixed(dec);
        if (t < 1) requestAnimationFrame(frame);
      })(start);
    }, 0.6);
  });

  /* ---------- Durations ("Present" roles stay current) ---------- */
  // Mirrors formatDuration() in build.mjs.
  function formatDuration(total) {
    var y = Math.floor(total / 12);
    var m = total % 12;
    return [y ? I18N.yrs(y) : '', m ? I18N.mos(m) : ''].filter(Boolean).join(' ');
  }
  var now = new Date();
  $$('.duration[data-start]:not([data-end])').forEach(function (el) {
    var p = el.getAttribute('data-start').split('-');
    var months = (now.getFullYear() - +p[0]) * 12 + (now.getMonth() + 1 - +p[1]) + 1;
    if (months > 0) el.textContent = formatDuration(months);
  });
  $$('.year').forEach(function (el) { el.textContent = String(now.getFullYear()); });

  /* ---------- Typewriter role ---------- */
  var typer = $('.typer');
  if (typer && !reduceMotion) {
    var words = [];
    try { words = JSON.parse(typer.getAttribute('data-words')); } catch (e) {}
    if (words.length > 1) {
      var wi = 0, ci = words[0].length, deleting = true;
      var tick = function () {
        var w = words[wi];
        if (deleting) {
          ci--;
          if (ci <= 0) { deleting = false; wi = (wi + 1) % words.length; }
        } else {
          ci++;
          if (ci >= words[wi].length) { deleting = true; typer.textContent = words[wi]; setTimeout(tick, 2200); return; }
        }
        typer.textContent = words[wi].slice(0, Math.max(0, ci)) || '​';
        setTimeout(tick, deleting ? 38 : 70);
      };
      setTimeout(tick, 2600);
    }
  }

  /* ---------- Hero "talent network" canvas ---------- */
  (function heroCanvas() {
    var canvas = $('.hero-canvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var hero = canvas.parentElement;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, nodes = [], pulses = [], mouse = { x: -9999, y: -9999 };
    var running = false, visible = true, raf = 0, lastMatch = 0;
    var COLORS = { teal: '22, 163, 148', amber: '224, 138, 18', brand: '163, 40, 58' };

    function ink() { return getComputedStyle(root).getPropertyValue('--canvas-ink').trim() || '30, 34, 41'; }
    var inkRGB = ink();

    function resize() {
      var r = hero.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(78, Math.max(28, Math.round((W * H) / 19000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        var kind = Math.random();
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
          // ~30% are "roles" (pixel squares in banner colours), the rest are "candidates" (dots)
          type: kind < 0.3 ? 'role' : 'cand',
          color: kind < 0.12 ? 'teal' : kind < 0.22 ? 'amber' : 'brand',
          s: kind < 0.3 ? 5 + Math.random() * 5 : 1.6 + Math.random() * 1.8,
          rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.01
        });
      }
    }

    // Periodically "match" a candidate with a nearby role and draw a pulse between them.
    function spawnMatch(t) {
      if (t - lastMatch < 1400) return;
      lastMatch = t;
      var c = nodes[Math.floor(Math.random() * nodes.length)];
      if (c.type !== 'cand') return;
      var best = null, bd = 1e9;
      nodes.forEach(function (n) {
        if (n.type !== 'role') return;
        var d = Math.hypot(n.x - c.x, n.y - c.y);
        if (d < bd && d < 260) { bd = d; best = n; }
      });
      if (best) pulses.push({ a: c, b: best, t: 0 });
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      var LINK = 120, i, j, a, b, dx, dy, d;

      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        a.x += a.vx; a.y += a.vy; a.rot += a.vr;
        if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20;
        if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20;

        // gentle attraction toward the cursor
        dx = mouse.x - a.x; dy = mouse.y - a.y; d = Math.hypot(dx, dy);
        if (d < 180) {
          a.x += dx * 0.0035; a.y += dy * 0.0035;
          ctx.strokeStyle = 'rgba(' + COLORS.teal + ',' + (0.35 * (1 - d / 180)) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j];
          dx = a.x - b.x; dy = a.y - b.y;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = 'rgba(' + inkRGB + ',' + (0.12 * (1 - d / LINK)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        if (a.type === 'role') {
          ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(a.rot);
          ctx.fillStyle = 'rgba(' + COLORS[a.color] + ',0.55)';
          ctx.fillRect(-a.s / 2, -a.s / 2, a.s, a.s);
          ctx.restore();
        } else {
          ctx.fillStyle = 'rgba(' + inkRGB + ',0.35)';
          ctx.beginPath(); ctx.arc(a.x, a.y, a.s, 0, Math.PI * 2); ctx.fill();
        }
      }

      spawnMatch(t);
      for (i = pulses.length - 1; i >= 0; i--) {
        var p = pulses[i];
        p.t += 0.012;
        if (p.t >= 1.4) { pulses.splice(i, 1); continue; }
        var k = Math.min(1, p.t);
        var x = p.a.x + (p.b.x - p.a.x) * k, y = p.a.y + (p.b.y - p.a.y) * k;
        ctx.strokeStyle = 'rgba(' + COLORS.brand + ',' + (0.5 * (1.4 - p.t)) + ')';
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(p.a.x, p.a.y); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = 'rgba(' + COLORS.brand + ',0.9)';
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill();
        if (p.t > 1) {
          var r = 6 + (p.t - 1) * 60;
          ctx.strokeStyle = 'rgba(' + COLORS.teal + ',' + (1 - (p.t - 1) / 0.4) * 0.6 + ')';
          ctx.beginPath(); ctx.arc(p.b.x, p.b.y, r, 0, Math.PI * 2); ctx.stroke();
        }
      }
    }

    function loop(t) {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    }
    function start() { if (!running && visible && !doc.hidden) { running = true; raf = requestAnimationFrame(loop); } }
    function stop() { running = false; cancelAnimationFrame(raf); }

    resize();
    if (reduceMotion) { draw(0); return; }

    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 150); });
    hero.addEventListener('pointermove', function (e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', function () { mouse.x = mouse.y = -9999; });
    doc.addEventListener('visibilitychange', function () { if (doc.hidden) stop(); else start(); });
    new MutationObserver(function () { inkRGB = ink(); }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { inkRGB = ink(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); else stop(); }).observe(hero);
    }
    start();
  })();

  /* ---------- Boolean search terminal ---------- */
  (function terminal() {
    var term = $('.terminal');
    if (!term) return;
    var qEl = $('.term-query', term), metaEl = $('.term-meta', term), list = $('.term-results', term);
    var COLORS = ['#3DD6C4', '#F5A524', '#F07A86', '#A9B6CC'];
    var QUERIES = [
      {
        q: '("Senior" OR "Lead") AND ("Node.js" OR "TypeScript") AND (Berlin OR remote) NOT intern',
        hits: 1284,
        rows: [
          ['Senior Backend Engineer', ['Node.js', 'AWS', 'Kafka'], 96],
          ['Lead Full Stack Engineer', ['TypeScript', 'React', 'GraphQL'], 92],
          ['Senior Software Engineer', ['Node.js', 'PostgreSQL'], 88]
        ]
      },
      {
        q: '("Product Owner" OR "Delivery Manager") AND (fintech OR banking OR payments) AND Scrum',
        hits: 642,
        rows: [
          ['Product Owner · Payments', ['Scrum', 'PSD2', 'Jira'], 95],
          ['Delivery Manager', ['SAFe', 'Fintech', 'Stakeholders'], 91],
          ['Senior Product Owner', ['B2B SaaS', 'OKRs'], 87]
        ]
      },
      {
        q: '("QA" OR "Test Automation") AND (Cypress OR Selenium OR Playwright) AND (Istanbul OR "Türkiye")',
        hits: 917,
        rows: [
          ['Senior Test Automation Engineer', ['Playwright', 'Java', 'CI/CD'], 94],
          ['QA Engineer', ['Cypress', 'API testing'], 90],
          ['SDET', ['Selenium', 'Kotlin', 'Appium'], 86]
        ]
      }
    ];

    function highlight(text) {
      return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/("[^"]*")/g, '<span class="str">$1</span>')
        .replace(/\b(AND|OR|NOT)\b/g, '<span class="op">$1</span>');
    }
    function renderRows(rows) {
      list.innerHTML = '';
      rows.forEach(function (r, i) {
        var li = doc.createElement('li');
        li.style.animationDelay = (i * 160) + 'ms';
        var initials = r[0].replace(/[^A-Z]/g, '').slice(0, 2) || 'TA';
        li.innerHTML =
          '<span class="tr-avatar" style="background:' + COLORS[i % COLORS.length] + '">' + initials + '</span>' +
          '<span class="tr-main"><strong>' + r[0] + '</strong><span class="tr-tags">' +
          r[1].map(function (tg) { return '<span>' + tg + '</span>'; }).join('') + '</span></span>' +
          '<span class="tr-score">' + r[2] + '%<span class="tr-bar"><i style="--w:' + r[2] + '%"></i></span></span>';
        list.appendChild(li);
      });
    }
    function fmt(n) { return n.toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US'); }

    if (reduceMotion) {
      var q0 = QUERIES[0];
      qEl.innerHTML = highlight(q0.q);
      metaEl.innerHTML = '→ <b>' + fmt(q0.hits) + '</b> ' + I18N.found + ' · ' + q0.rows.length + ' ' + I18N.top;
      renderRows(q0.rows);
      return;
    }

    var qi = 0, timer = 0, active = false;
    function run() {
      var item = QUERIES[qi];
      var i = 0;
      list.innerHTML = ''; metaEl.innerHTML = ''; qEl.innerHTML = '';
      (function type() {
        if (!active) return;
        i++;
        qEl.innerHTML = highlight(item.q.slice(0, i));
        if (i < item.q.length) { timer = setTimeout(type, 22 + Math.random() * 30); return; }
        timer = setTimeout(function () {
          metaEl.innerHTML = '→ <b>' + fmt(item.hits) + '</b> ' + I18N.found + ' · ' + I18N.ranking;
          timer = setTimeout(function () {
            metaEl.innerHTML = '→ <b>' + fmt(item.hits) + '</b> ' + I18N.found + ' · ' + item.rows.length + ' ' + I18N.top;
            renderRows(item.rows);
            timer = setTimeout(function () { qi = (qi + 1) % QUERIES.length; run(); }, 5200);
          }, 900);
        }, 400);
      })();
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        var vis = en[0].isIntersecting;
        if (vis && !active) { active = true; run(); }
        else if (!vis && active) { active = false; clearTimeout(timer); }
      }, { threshold: 0.25 }).observe(term);
    } else { active = true; run(); }
  })();

  /* ---------- Project filters ---------- */
  var filters = $$('.filter');
  var projects = $$('.project');
  var status = $('.filter-status');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      var shown = 0;
      projects.forEach(function (p) {
        var match = f === 'all' || p.getAttribute('data-industry') === f;
        p.classList.toggle('is-hidden', !match);
        p.classList.remove('is-entering');
        if (match) {
          shown++;
          p.classList.add('is-visible');
          void p.offsetWidth; // restart the entry animation
          p.classList.add('is-entering');
        }
      });
      if (status) status.textContent = I18N.showing(shown);
    });
  });

  /* ---------- Pointer effects: spotlight, tilt, magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    $$('.spotlight').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    $$('.tilt').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(900px) rotateY(' + (px * 6).toFixed(2) + 'deg) rotateX(' + (-py * 6).toFixed(2) + 'deg)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
    $$('.magnetic').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px');
        el.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1) + 'px');
      });
      el.addEventListener('pointerleave', function () { el.style.setProperty('--bx', '0px'); el.style.setProperty('--by', '0px'); });
    });
  }

  /* ---------- Contact: pixel field + copy email ---------- */
  var field = $('.pixel-field');
  if (field && !reduceMotion) {
    var cols = ['#3DD6C4', '#F5A524', '#3DD6C4', '#F07A86'];
    for (var k = 0; k < 18; k++) {
      var px = doc.createElement('i');
      px.style.left = (Math.random() * 100).toFixed(1) + '%';
      px.style.top = (Math.random() * 100).toFixed(1) + '%';
      px.style.background = cols[k % cols.length];
      px.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';
      px.style.animationDuration = (5 + Math.random() * 4).toFixed(2) + 's';
      field.appendChild(px);
    }
  }

  var toast = $('.toast'), toastTimer = 0;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2400);
  }
  $$('.copy-email').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var email = btn.getAttribute('data-email');
      var done = function () {
        btn.classList.add('is-done'); showToast(I18N.copied);
        setTimeout(function () { btn.classList.remove('is-done'); }, 2000);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(done, function () { showToast(I18N.copyFail); });
      } else {
        showToast(I18N.copyFail);
      }
    });
  });

  /* ---------- A note for curious developers ---------- */
  try {
    console.log(
      '%c👋 Hey, curious engineer!%c\nYou opened DevTools on a recruiter’s site — that’s exactly the kind of curiosity I look for.\nLet’s talk: lara.evrenos@gmail.com · linkedin.com/in/lara-evrenos',
      'font: 600 16px/1.6 system-ui; color: #7A1A1A', 'font: 13px/1.6 system-ui; color: #4A505B'
    );
  } catch (e) {}
})();
