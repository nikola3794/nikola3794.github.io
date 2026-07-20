/* =========================================================================
   Nikola Popovic — personal site (rendering + interactions)
   Renders projects from window.SITE_DATA (assets/projects.js), plus tag
   filtering, BibTeX panels, lazy video, theme toggle, and the section nav.
   No external dependencies.

   NOTE: to add or edit a project, edit assets/projects.js — not this file.
   ========================================================================= */
(function () {
  'use strict';

  /* ------------------------------------------------------------ Site data - */
  var DATA = window.SITE_DATA || {};
  var AUTHORS = DATA.AUTHORS || {};
  var CONFERENCES = DATA.CONFERENCES || {};
  var TAG_STYLES = DATA.TAG_STYLES || {};
  var FILTERS = DATA.FILTERS || [];
  var BIBTEX = DATA.BIBTEX || {};
  var PROJECTS = DATA.PROJECTS || [];
  if (!DATA.PROJECTS) {
    console.error('SITE_DATA not found — make sure assets/projects.js is loaded before assets/app.js.');
  }

  /* --------------------------------------------------------------- Icons --- */
  function svg(paths, cls) {
    return '<svg class="' + (cls || 'h-4 w-4') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>';
  }
  var ICON = {
    paper: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>'),
    website: svg('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'),
    code: svg('<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>'),
    braces: svg('<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"/>'),
    // Badge icons (smaller, inherit the badge text color)
    mic: svg('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>', 'h-3.5 w-3.5'),
    trophy: svg('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>', 'h-3.5 w-3.5')
  };
  function linkIcon(label) {
    var l = (label || '').toLowerCase();
    if (l.indexOf('code') !== -1) return ICON.code;
    if (l.indexOf('web') !== -1 || l.indexOf('site') !== -1 || l.indexOf('project') !== -1 || l.indexOf('page') !== -1) return ICON.website;
    return ICON.paper;
  }

  /* ------------------------------------------------------------- Helpers --- */
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function renderAuthor(key) {
    var trimmed = key.trim();
    var hasStar = trimmed.charAt(trimmed.length - 1) === '*';
    var baseKey = hasStar ? trimmed.slice(0, -1) : trimmed;
    var html = AUTHORS[baseKey] || baseKey;
    return hasStar ? html + '<sup>*</sup>' : html;
  }
  function renderAuthors(keys) {
    return keys.map(renderAuthor).join(', ');
  }
  function renderVenue(conf, year, note) {
    var c = CONFERENCES[conf];
    var label = c ? c.abbr : conf;
    return label + (year ? ' ' + year : '') + (note || '');
  }
  function tagPill(tag) {
    var style = TAG_STYLES[tag] || 'text-gray-600 bg-gray-100 ring-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:ring-gray-700';
    return '<span class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ' + style + '">' + tag + '</span>';
  }
  function badgeHtml(b) {
    var isAward = b.kind === 'award';
    var cls = isAward ? 'badge badge-award' : 'badge badge-oral';
    var icon = isAward ? ICON.trophy : ICON.mic;
    // Award badges show no percentage; oral badges render the rate as "top X%".
    var pct = (!isAward && b.pct) ? ' <span class="badge-pct">(top ' + escapeHtml(b.pct) + ')</span>' : '';
    return '<span class="' + cls + '">' + icon + '<span>' + escapeHtml(b.label) + pct + '</span></span>';
  }
  function renderBadges(badges) {
    if (!badges || !badges.length) return '';
    return '<div class="mb-2 flex flex-wrap gap-1.5">' + badges.map(badgeHtml).join('') + '</div>';
  }
  function mediaHtml(p) {
    if (p.media.type === 'video') {
      return '<video class="max-h-40 w-auto max-w-full rounded-lg object-contain" muted loop playsinline preload="none" data-src="' +
        p.media.src + '" aria-label="' + escapeHtml(p.title) + ' demo"></video>';
    }
    return '<img src="' + p.media.src + '" alt="' + escapeHtml(p.title) +
      '" loading="lazy" decoding="async" class="max-h-40 w-auto max-w-full rounded-lg object-contain">';
  }

  function cardHtml(p) {
    var pills = p.tags.map(tagPill).join(' ');
    var links = p.links.map(function (l) {
      return '<a href="' + l.url + '" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-dark">' +
        linkIcon(l.label) + l.label + '</a>';
    }).join('');
    var bibBtn = '<button type="button" class="bibtex-toggle inline-flex items-center gap-1.5 font-medium text-gray-500 hover:text-accent dark:text-gray-400 dark:hover:text-accent" aria-expanded="false">' +
      ICON.braces + 'BibTeX</button>';
    var bib = escapeHtml(BIBTEX[p.bibtex] || '');
    // Media panel is optional — a project without a teaser renders text-only, full width.
    var mediaPanel = p.media
      ? '<div class="flex items-center justify-center bg-gray-50 p-3 dark:bg-gray-900 sm:w-56 sm:shrink-0">' + mediaHtml(p) + '</div>'
      : '';

    return '<article class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">' +
      '<div class="flex flex-col sm:flex-row">' +
        mediaPanel +
        '<div class="flex flex-col p-5 sm:min-w-0 sm:flex-1">' +
          renderBadges(p.badges) +
          '<div class="mb-1.5 flex flex-wrap items-center gap-2">' +
            '<span class="text-xs font-semibold uppercase tracking-wide text-gray-400">' + renderVenue(p.conf, p.year, p.note) + '</span>' +
            pills +
          '</div>' +
          '<h3 class="font-semibold leading-snug text-gray-900 dark:text-gray-100">' + p.title + '</h3>' +
          '<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">' + renderAuthors(p.authors) + '</p>' +
          '<div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">' + links + bibBtn + '</div>' +
          '<div class="bibtex-panel mt-3">' +
            '<div class="relative">' +
              '<button type="button" class="bibtex-copy absolute right-2 top-2 rounded-md border border-gray-200 bg-white/80 px-2 py-1 text-[11px] font-medium text-gray-500 hover:text-accent dark:border-gray-600 dark:bg-gray-900/80 dark:text-gray-300">Copy</button>' +
              '<pre class="overflow-x-auto rounded-lg bg-gray-50 p-3 pt-9 text-xs leading-relaxed text-gray-600 dark:bg-gray-900 dark:text-gray-300"><code>' + bib + '</code></pre>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  /* --------------------------------------------------------------- State --- */
  var grid = document.getElementById('projects-grid');
  var filtersEl = document.getElementById('projects-filters');
  var emptyEl = document.getElementById('projects-empty');
  var activeFilter = 'selected';

  function visibleProjects() {
    var list;
    if (activeFilter === 'selected') list = PROJECTS.filter(function (p) { return p.important; });
    else if (activeFilter === 'all') list = PROJECTS.slice();
    else list = PROJECTS.filter(function (p) { return p.tags.indexOf(activeFilter) !== -1; });
    return list.sort(function (a, b) { return b.year - a.year; });
  }

  function renderGrid() {
    if (!grid) return;
    var list = visibleProjects();
    if (emptyEl) emptyEl.classList.toggle('hidden', list.length > 0);
    grid.innerHTML = list.map(cardHtml).join('');
    initLazyVideos();
  }

  function updateFilterStyles() {
    var btns = filtersEl.querySelectorAll('.filter-btn');
    Array.prototype.forEach.call(btns, function (btn) {
      var active = btn.getAttribute('data-filter') === activeFilter;
      btn.className = 'filter-btn rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ' + (active
        ? 'border-accent bg-accent text-white'
        : 'border-gray-200 text-gray-600 hover:border-accent hover:text-accent dark:border-gray-700 dark:text-gray-300 dark:hover:border-accent dark:hover:text-accent');
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function renderFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = FILTERS.map(function (f) {
      return '<button type="button" class="filter-btn" data-filter="' + f.key + '">' + f.label + '</button>';
    }).join('');
    Array.prototype.forEach.call(filtersEl.querySelectorAll('.filter-btn'), function (btn) {
      btn.addEventListener('click', function () {
        activeFilter = btn.getAttribute('data-filter');
        updateFilterStyles();
        renderGrid();
      });
    });
    updateFilterStyles();
  }

  /* ----------------------------------------------------------- Lazy video -- */
  function loadVideo(v) {
    if (v.getAttribute('data-loaded')) return;
    var s = document.createElement('source');
    s.src = v.getAttribute('data-src');
    s.type = 'video/mp4';
    v.appendChild(s);
    v.setAttribute('data-loaded', '1');
    v.load();
    var pr = v.play();
    if (pr && pr.catch) pr.catch(function () {});
  }
  function initLazyVideos() {
    if (!grid) return;
    var vids = grid.querySelectorAll('video[data-src]:not([data-loaded])');
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(vids, loadVideo);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { loadVideo(en.target); io.unobserve(en.target); }
      });
    }, { rootMargin: '200px' });
    Array.prototype.forEach.call(vids, function (v) { io.observe(v); });
  }

  /* --------------------------------------------------------- BibTeX events - */
  if (grid) {
    grid.addEventListener('click', function (e) {
      var toggle = e.target.closest('.bibtex-toggle');
      if (toggle) {
        var article = toggle.closest('article');
        var panel = article.querySelector('.bibtex-panel');
        var open = panel.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        return;
      }
      var copyBtn = e.target.closest('.bibtex-copy');
      if (copyBtn) {
        var code = copyBtn.parentElement.querySelector('code');
        var text = code ? code.innerText : '';
        var done = function () {
          var old = copyBtn.textContent;
          copyBtn.textContent = 'Copied';
          setTimeout(function () { copyBtn.textContent = old; }, 1200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
        } else {
          fallbackCopy(text, done);
        }
      }
    });
  }
  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    if (done) done();
  }

  /* ----------------------------------------------------------- Theme ------- */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = document.documentElement.classList.toggle('dark');
      try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
    });
  }

  /* ------------------------------------------------------- Nav (header) ---- */
  // Mobile hamburger menu
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var open = !mobileMenu.classList.toggle('hidden');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    Array.prototype.forEach.call(mobileMenu.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll-spy: highlight the nav link whose section is centered in the viewport
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link[data-nav]'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    var seen = {};
    var sections = [];
    navLinks.forEach(function (l) {
      var id = l.getAttribute('data-nav');
      if (seen[id]) return;
      var el = document.getElementById(id);
      if (el) { seen[id] = true; sections.push(el); }
    });
    var current = null;
    function setActive(id) {
      if (id === current) return;
      current = id;
      navLinks.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('data-nav') === id);
      });
    }
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) setActive(en.target.id);
      });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------------------------------------------- Init ------ */
  renderFilters();
  renderGrid();
})();
