/* =====================================================================
   Interactions, i18n rendering, scroll reveals
   ===================================================================== */
(function () {
  "use strict";

  const body = document.body;
  // Default to English (targets international audience); honor a saved choice.
  const saved = localStorage.getItem("lang");
  let lang = (saved === "en" || saved === "zh") ? saved : "en";

  const t = (key) => (I18N[lang] && I18N[lang][key]) || (I18N.en[key]) || key;
  const pick = (obj) => (obj && (obj[lang] !== undefined ? obj[lang] : obj.en));

  /* ---------- renderers ---------- */
  function renderStatic() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    body.setAttribute("data-lang", lang);
    document.querySelectorAll("[data-lang-opt]").forEach((el) => {
      el.classList.toggle("is-active", el.getAttribute("data-lang-opt") === lang);
    });
  }

  function renderMetrics() {
    const root = document.getElementById("heroMetrics");
    root.innerHTML = METRICS.map((m) => `
      <div class="metric">
        <span class="metric__value">${m.value}</span>
        <span class="metric__label">${m[lang]}</span>
      </div>`).join("");
  }

  function renderPillars() {
    const root = document.getElementById("aboutPillars");
    root.innerHTML = PILLARS.map((p) => {
      const c = p[lang];
      return `<div class="pillar">
        <h4 class="pillar__k">${c.k}</h4>
        <p class="pillar__v">${c.v}</p>
      </div>`;
    }).join("");
  }

  function renderFocus() {
    const root = document.getElementById("focusGrid");
    root.innerHTML = FOCUS.map((f) => {
      const c = f[lang];
      return `<article class="focus__card">
        <span class="focus__no">${f.no}</span>
        <h3 class="focus__title">${c.title}</h3>
        <p class="focus__body">${c.body}</p>
      </article>`;
    }).join("");
  }

  function renderTimeline() {
    const root = document.getElementById("timeline");
    root.innerHTML = EXPERIENCE.map((e) => {
      const pts = pick(e.points).map((p) => `<li>${p}</li>`).join("");
      const tags = e.tags.map((tg) => `<span class="chip">${tg}</span>`).join("");
      return `<article class="tl">
        <div class="tl__meta">
          <span class="tl__period">${pick(e.period)}</span>
          <span class="tl__dot" aria-hidden="true"></span>
        </div>
        <div class="tl__content">
          <h3 class="tl__org">${pick(e.org)}</h3>
          <p class="tl__role">${pick(e.role)}</p>
          <ul class="tl__points">${pts}</ul>
          <div class="tl__tags">${tags}</div>
        </div>
      </article>`;
    }).join("");
  }

  function projectLinks(links) {
    if (!links || !links.length) return "";
    const arrow = `<svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>`;
    return `<div class="pcard__links">` + links.map((l) => {
      const label = (typeof l.label === "object") ? pick(l.label) : l.label;
      return `<a class="pcard__link" href="${l.url}" target="_blank" rel="noopener noreferrer">${label}${arrow}</a>`;
    }).join("") + `</div>`;
  }

  function renderProjects() {
    const root = document.getElementById("projectGrid");
    root.innerHTML = PROJECTS.map((p) => {
      const stats = p.stats.map((s) => `
        <div class="pstat"><span class="pstat__v">${s.v}</span><span class="pstat__l">${s[lang]}</span></div>`).join("");
      return `<article class="pcard">
        <span class="pcard__tag">${pick(p.tag)}</span>
        <h3 class="pcard__title">${pick(p.title)}</h3>
        <p class="pcard__body">${pick(p.body)}</p>
        <div class="pcard__stats">${stats}</div>
        ${projectLinks(p.links)}
      </article>`;
    }).join("");
  }

  function linkChips(links) {
    if (!links || !links.length) return "";
    return `<span class="pub__links">` + links.map((l) =>
      `<a class="pub__link" href="${l.url}" target="_blank" rel="noopener noreferrer">${t("ui." + l.label)}<svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></svg></a>`
    ).join("") + `</span>`;
  }

  function statusBadge(status) {
    if (status === "review") return `<span class="badge badge--review">${t("ui.review")}</span>`;
    if (status === "accepted") return `<span class="badge badge--ok">${t("ui.accepted")}</span>`;
    return "";
  }

  function renderPubs() {
    document.getElementById("pubLLM").innerHTML = PUBS_LLM.map((p) => `
      <li class="pub">
        <div class="pub__head">
          <span class="pub__authors">${p.authors}</span>
          ${p.first ? `<span class="badge badge--first">${t(p.cofirst ? "ui.cofirst" : "ui.firstAuthor")}</span>` : ""}
          ${statusBadge(p.status)}
        </div>
        <p class="pub__title">${p.title}</p>
        <div class="pub__foot"><span class="pub__venue">${p.venue}</span>${linkChips(p.links)}</div>
      </li>`).join("");

    document.getElementById("pubSCI").innerHTML = PUBS_SCI.map((p) => `
      <li class="pub">
        <div class="pub__head">
          <span class="pub__authors">${p.authors}</span>
          ${p.first ? `<span class="badge badge--first">${t("ui.firstAuthor")}</span>` : ""}
        </div>
        <p class="pub__title">${p.title}</p>
        <div class="pub__foot"><span class="pub__venue">${p.venue}</span>${linkChips(p.links)}</div>
      </li>`).join("");

    document.getElementById("pubPatents").innerHTML = PATENTS.map((p) => `
      <li class="pub pub--plain"><p class="pub__title">${pick(p)}</p></li>`).join("");
  }

  function renderEdu() {
    const root = document.getElementById("eduGrid");
    root.innerHTML = EDUCATION.map((e) => `
      <article class="educard">
        <span class="educard__period">${pick(e.period)}</span>
        <h3 class="educard__school">${pick(e.school)}</h3>
        <p class="educard__detail">${pick(e.detail)}</p>
      </article>`).join("");
  }

  function renderAwards() {
    const root = document.getElementById("awardList");
    root.innerHTML = AWARDS.map((a) => `
      <li class="award">
        <span class="award__year">${a.year}</span>
        <span class="award__text">${a[lang]}</span>
      </li>`).join("");
  }

  function renderFooter() {
    const root = document.getElementById("footerLinks");
    root.innerHTML = CONTACTS.map((c) => {
      const val = typeof c.value === "object" ? pick(c.value) : c.value;
      const dl = c.download ? "download" : `target="_blank" rel="noopener noreferrer"`;
      return `<a class="flink" href="${c.url}" ${dl}>
        <span class="flink__label">${c.label}</span>
        <span class="flink__value">${val}</span>
      </a>`;
    }).join("");
  }

  function renderAll() {
    renderStatic();
    renderMetrics();
    renderPillars();
    renderFocus();
    renderTimeline();
    renderProjects();
    renderPubs();
    renderEdu();
    renderAwards();
    renderFooter();
    refreshReveals();
  }

  /* ---------- scroll reveal ---------- */
  let observer;
  function refreshReveals() {
    const els = document.querySelectorAll(
      ".section, .metric, .pillar, .focus__card, .tl, .pcard, .pub, .educard, .award, .reveal"
    );
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => { el.classList.add("reveal", "is-in"); });
      return;
    }
    els.forEach((el) => el.classList.add("reveal"));
    if (observer) observer.disconnect();
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => observer.observe(el));
  }

  /* ---------- language toggle ---------- */
  document.getElementById("langToggle").addEventListener("click", () => {
    lang = lang === "en" ? "zh" : "en";
    localStorage.setItem("lang", lang);
    renderAll();
  });

  /* ---------- nav state on scroll ---------- */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }, { passive: true });

  /* ---------- active nav link ---------- */
  const sections = ["about", "research", "experience", "projects", "publications", "awards"];
  const navLinks = Array.from(document.querySelectorAll(".nav__links a"));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { threshold: 0.4 });
  sections.forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

  /* ---------- pointer-reactive mesh ---------- */
  const mesh = document.querySelector(".mesh");
  if (mesh && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mesh.style.setProperty("--mx", (x * 14).toFixed(2) + "px");
      mesh.style.setProperty("--my", (y * 14).toFixed(2) + "px");
    }, { passive: true });
  }

  /* ---------- smooth anchor offset handled by CSS scroll-margin ---------- */
  renderAll();
})();
