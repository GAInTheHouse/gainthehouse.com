import { LightboxManager } from "./lightbox.js";

const lightbox = new LightboxManager("#lightbox");
const state = {
  research: [],
  projects: [],
  experience: [],
  organizations: []
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function truncate(text, max = 140) {
  const value = String(text || "").trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trim()}…`;
}

function firstLine(item) {
  if (item.summary) return item.summary;
  const lines = Array.isArray(item.description) ? item.description : [item.description, item.role];
  const line = lines.filter(Boolean).find((value) => !/^position:/i.test(value)) || "";
  return String(line).replace(/^(about|my role):\s*/i, "");
}

function parseSubtitle(subtitle) {
  const parts = String(subtitle || "").split("|").map((part) => part.trim()).filter(Boolean);
  if (!parts.length) return { company: "", dates: "" };
  if (parts.length === 1) {
    return looksLikeDate(parts[0]) ? { company: "", dates: parts[0] } : { company: parts[0], dates: "" };
  }
  return {
    company: parts.slice(0, -1).join(" · "),
    dates: parts[parts.length - 1]
  };
}

function looksLikeDate(value) {
  return /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4}|present)/i.test(value);
}

function parseStartYear(subtitle) {
  const match = String(subtitle || "").match(/(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})/i);
  return match ? Number(match[1]) : null;
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}

function renderCards(container, items, { tag, onOpen }) {
  container.innerHTML = items.map((item, index) => {
    const title = item.title || item.name || "Untitled";
    const image = item.thumbnail || item.image || item.logo || "";
    const meta = item.period || item.position || "";
    return `
      <button type="button" class="card" data-index="${index}">
        <div class="card__media">
          ${image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : ""}
        </div>
        <div class="card__body">
          ${tag ? `<span class="tag">${escapeHtml(tag)}</span>` : ""}
          <h3 class="card__title">${escapeHtml(title)}</h3>
          <p class="card__summary">${escapeHtml(truncate(firstLine(item)))}</p>
          ${meta ? `<p class="card__meta">${escapeHtml(meta)}</p>` : ""}
        </div>
      </button>`;
  }).join("");

  container.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => onOpen(Number(card.dataset.index)));
  });
}

function normalizeResearch(project) {
  return {
    ...project,
    title: project.title,
    subtitle: project.period || "",
    image: project.image || project.thumbnail
  };
}

function normalizeProject(project) {
  return {
    ...project,
    subtitle: project.period || ""
  };
}

function normalizeOrg(org) {
  return {
    ...org,
    title: org.name,
    subtitle: org.position || "",
    summary: org.description,
    description: [org.position && `Position: ${org.position}`, org.description && `About: ${org.description}`, org.role && `My role: ${org.role}`].filter(Boolean)
  };
}

function normalizeExperience(exp) {
  const parsed = parseSubtitle(exp.subtitle);
  return {
    ...exp,
    company: parsed.company,
    dates: parsed.dates,
    subtitle: exp.subtitle
  };
}

function renderExperience(container, items) {
  container.innerHTML = items.map((item, index) => `
    <button type="button" class="timeline__item" data-index="${index}">
      <span class="timeline__logo">
        ${item.thumbnail || item.image ? `<img src="${escapeHtml(item.thumbnail || item.image)}" alt="" loading="lazy">` : ""}
      </span>
      <span>
        <h3 class="timeline__title">${escapeHtml(item.title)}</h3>
        ${item.company ? `<p class="timeline__company">${escapeHtml(item.company)}</p>` : ""}
      </span>
      ${item.dates ? `<span class="timeline__dates">${escapeHtml(item.dates)}</span>` : ""}
    </button>
  `).join("");

  container.querySelectorAll(".timeline__item").forEach((row) => {
    row.addEventListener("click", () => lightbox.open(state.experience, Number(row.dataset.index)));
  });
}

function renderEducation(container, schools) {
  container.innerHTML = schools.map((school) => {
    const headline = [school.degree, school.major].filter(Boolean).join(" — ");
    const extras = [school.track, school.gpa && `GPA ${school.gpa}`].filter(Boolean).join(" · ");
    return `
      <article class="education-card">
        ${school.logo ? `<div class="education-card__logo"><img src="${escapeHtml(school.logo)}" alt="${escapeHtml(school.institution)} logo" loading="lazy"></div>` : ""}
        <div>
          <h3>${escapeHtml(school.institution)}</h3>
          <p class="education-card__meta">${escapeHtml([school.location, school.date].filter(Boolean).join(" · "))}</p>
          <p><strong>${escapeHtml(headline)}</strong>${extras ? ` · ${escapeHtml(extras)}` : ""}</p>
          ${school.courses?.length ? `
            <div class="education-card__group">
              <p class="education-card__group-label">Courses</p>
              <div class="education-card__chips">${school.courses.map((course) => `<span class="chip">${escapeHtml(course)}</span>`).join("")}</div>
            </div>` : ""}
          ${school.certificates?.length ? `
            <div class="education-card__group">
              <p class="education-card__group-label">Certificates</p>
              <div class="education-card__chips">${school.certificates.map((certificate) => `<span class="chip">${escapeHtml(certificate)}</span>`).join("")}</div>
            </div>` : ""}
          ${school.awards?.length ? `
            <div class="education-card__group">
              <p class="education-card__group-label">Awards</p>
              <div class="education-card__chips">${school.awards.map((award) => `<span class="chip">${escapeHtml(award)}</span>`).join("")}</div>
            </div>` : ""}
        </div>
      </article>`;
  }).join("");
}

function renderArticles(container, articles) {
  container.innerHTML = articles.map((article) => `
    <a class="article-card" href="${escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">
      <div class="article-card__media">
        ${article.image ? `<img src="${escapeHtml(article.image)}" alt="" loading="lazy">` : ""}
      </div>
      <h3 class="article-card__title">${escapeHtml(article.title)}</h3>
    </a>
  `).join("");
}

function renderSkills(container, categories) {
  container.innerHTML = categories.map((category) => `
    <div class="skills-group">
      <h3>${escapeHtml(category.name)}</h3>
      <div class="skills-group__chips">
        ${(category.skills || []).map((skill) => `
          <span class="chip">
            ${skill.icon ? `<img src="${escapeHtml(skill.icon)}" alt="" loading="lazy">` : ""}
            ${escapeHtml(skill.label)}
          </span>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function renderStats({ research, projects, experience }) {
  const fullTime = experience.filter((item) => !/intern|teaching assistant/i.test(item.title));
  const years = fullTime
    .map((item) => parseStartYear(item.subtitle))
    .filter(Boolean)
    .sort((a, b) => a - b)[0];
  const yearCount = years ? Math.max(1, new Date().getFullYear() - years) : experience.length;
  const studentCount = experience
    .flatMap((item) => item.description || [])
    .map((line) => String(line).match(/(\d+)\+?\s+students/i))
    .filter(Boolean)
    .map((match) => Number(match[1]))
    .sort((a, b) => b - a)[0];

  const stats = [
    { value: `${yearCount}+`, label: "Years in industry" },
    { value: String(research.length), label: "Research projects" },
    { value: String(experience.length), label: "Roles" },
    { value: studentCount ? `${studentCount}+` : String(projects.length), label: studentCount ? "Students mentored" : "Software projects" }
  ];

  document.getElementById("stats-grid").innerHTML = stats.map((stat) => `
    <div class="stat">
      <span class="stat__value">${escapeHtml(stat.value)}</span>
      <span class="stat__label">${escapeHtml(stat.label)}</span>
    </div>
  `).join("");
}

function initNav() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const links = [...document.querySelectorAll("[data-nav-link]")];

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      toggle.focus();
    }
  });

  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  }, { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] });

  sections.forEach((section) => spy.observe(section));
}

async function init() {
  initNav();

  const [research, projects, work, orgs, education, articles, skills] = await Promise.all([
    loadJson("data/research.json"),
    loadJson("data/projects.json"),
    loadJson("data/work-experience.json"),
    loadJson("data/organizations.json"),
    loadJson("data/education.json"),
    loadJson("data/articles.json"),
    loadJson("data/skills.json")
  ]);

  state.research = (research.projects || []).map(normalizeResearch);
  state.projects = (projects.projects || []).map(normalizeProject);
  state.experience = (work.experiences || []).map(normalizeExperience);
  state.organizations = (orgs.organizations || []).map(normalizeOrg);

  renderStats({
    research: state.research,
    projects: state.projects,
    experience: state.experience
  });

  renderCards(document.getElementById("research-grid"), state.research, {
    tag: "Research",
    onOpen: (index) => lightbox.open(state.research, index)
  });
  renderCards(document.getElementById("projects-grid"), state.projects, {
    tag: "Project",
    onOpen: (index) => lightbox.open(state.projects, index)
  });
  renderCards(document.getElementById("orgs-grid"), state.organizations, {
    tag: "Organization",
    onOpen: (index) => lightbox.open(state.organizations, index)
  });
  renderExperience(document.getElementById("experience-list"), state.experience);
  renderEducation(document.getElementById("education-list"), education.education || []);
  renderArticles(document.getElementById("articles-grid"), articles.articles || []);
  renderSkills(document.getElementById("skills-groups"), skills.categories || []);
}

init().catch((error) => {
  console.error(error);
});
