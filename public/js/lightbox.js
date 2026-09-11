const ICONS = {
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.58 7.1 5.7a1 1 0 1 0-1.4 1.42L10.58 12l-4.88 4.9a1 1 0 1 0 1.42 1.4L12 13.42l4.9 4.88a1 1 0 0 0 1.4-1.42L13.42 12l4.88-4.9a1 1 0 0 0 0-1.4z"/></svg>',
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.7 5.3a1 1 0 0 1 0 1.4L10.42 12l5.28 5.3a1 1 0 1 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.42 0z"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.3 5.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4L13.58 12 8.3 6.7a1 1 0 0 1 0-1.4z"/></svg>'
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isLocalVideo(url) {
  return typeof url === "string" && /\.mp4($|\?)/i.test(url);
}

function renderMedia(link) {
  const caption = escapeHtml(link.text || "");
  if (link.type === "video" && isLocalVideo(link.url)) {
    return `
      <figure class="lightbox-media">
        <video controls preload="metadata">
          <source src="${escapeHtml(link.url)}" type="video/mp4">
        </video>
        <figcaption>${caption}</figcaption>
      </figure>`;
  }

  if (["image", "paper", "document"].includes(link.type) && link.image) {
    const inner = `
      <img src="${escapeHtml(link.image)}" alt="${caption}" loading="lazy">
      <span class="lightbox-media__caption">${caption}</span>`;
    if (link.url) {
      return `<a class="lightbox-media" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
    }
    return `<div class="lightbox-media">${inner}</div>`;
  }

  return "";
}

function renderTextLinks(links) {
  return (links || [])
    .filter((link) => ["external", "github", "devpost", "linkedin", "video"].includes(link.type) && link.url && !isLocalVideo(link.url))
    .map((link) => `<a class="lightbox-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.text || "Open link")}</a>`)
    .join("");
}

export function renderSlide(item) {
  const image = item.logo || item.image || item.thumbnail || "";
  const description = Array.isArray(item.description)
    ? item.description
    : [item.description, item.role].filter(Boolean);
  const media = (item.links || []).map(renderMedia).filter(Boolean).join("");
  const textLinks = renderTextLinks(item.links);

  return `
    <article class="lightbox-slide">
      ${image ? `<div class="lightbox-slide__media"><img src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}"></div>` : ""}
      <h2 id="lightbox-title">${escapeHtml(item.title)}</h2>
      ${item.subtitle ? `<p class="lightbox-slide__subtitle">${escapeHtml(item.subtitle)}</p>` : ""}
      ${description.length ? `<ul>${description.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>` : ""}
      ${media ? `<div class="lightbox-slide__gallery">${media}</div>` : ""}
      ${textLinks ? `<div class="lightbox-slide__links">${textLinks}</div>` : ""}
    </article>`;
}

export class LightboxManager {
  constructor(root) {
    this.root = typeof root === "string" ? document.querySelector(root) : root;
    this.items = [];
    this.index = 0;
    this.lastFocus = null;
    this.onKeydown = this.onKeydown.bind(this);
    this.build();
  }

  build() {
    this.root.classList.add("lightbox");
    this.root.setAttribute("hidden", "");
    this.root.setAttribute("role", "dialog");
    this.root.setAttribute("aria-modal", "true");
    this.root.setAttribute("aria-labelledby", "lightbox-title");
    this.root.innerHTML = `
      <div class="lightbox__backdrop" data-lightbox-close></div>
      <div class="lightbox__dialog" role="document">
        <div class="lightbox__toolbar">
          <span class="lightbox__count" data-lightbox-count></span>
          <div class="lightbox__controls">
            <button type="button" class="lightbox__icon-btn" data-lightbox-prev aria-label="Previous item">${ICONS.prev}</button>
            <button type="button" class="lightbox__icon-btn" data-lightbox-next aria-label="Next item">${ICONS.next}</button>
            <button type="button" class="lightbox__icon-btn" data-lightbox-close aria-label="Close details">${ICONS.close}</button>
          </div>
        </div>
        <div class="lightbox__body" data-lightbox-body></div>
        <div class="lightbox__thumbs" data-lightbox-thumbs></div>
      </div>`;

    this.body = this.root.querySelector("[data-lightbox-body]");
    this.thumbs = this.root.querySelector("[data-lightbox-thumbs]");
    this.count = this.root.querySelector("[data-lightbox-count]");
    this.prevBtn = this.root.querySelector("[data-lightbox-prev]");
    this.nextBtn = this.root.querySelector("[data-lightbox-next]");

    this.root.addEventListener("click", (event) => {
      if (event.target.closest("[data-lightbox-close]")) this.close();
      if (event.target.closest("[data-lightbox-prev]")) this.show(this.index - 1);
      if (event.target.closest("[data-lightbox-next]")) this.show(this.index + 1);
      const thumb = event.target.closest("[data-lightbox-thumb]");
      if (thumb) this.show(Number(thumb.dataset.lightboxThumb));
    });
  }

  open(items, index = 0) {
    this.items = items;
    this.lastFocus = document.activeElement;
    this.root.removeAttribute("hidden");
    this.root.classList.add("is-open");
    document.body.classList.add("is-locked");
    document.addEventListener("keydown", this.onKeydown);
    this.renderThumbs();
    this.show(index);
    this.root.querySelector(".lightbox__icon-btn[data-lightbox-close]").focus();
  }

  close() {
    this.root.classList.remove("is-open");
    this.root.setAttribute("hidden", "");
    document.body.classList.remove("is-locked");
    document.removeEventListener("keydown", this.onKeydown);
    if (this.lastFocus && typeof this.lastFocus.focus === "function") {
      this.lastFocus.focus();
    }
  }

  show(index) {
    if (!this.items.length) return;
    this.index = (index + this.items.length) % this.items.length;
    const item = this.items[this.index];
    this.body.innerHTML = renderSlide(item);
    this.count.textContent = `${this.index + 1} / ${this.items.length}`;
    this.thumbs.querySelectorAll("[data-lightbox-thumb]").forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("is-active", thumbIndex === this.index);
    });
    const many = this.items.length > 1;
    this.prevBtn.hidden = !many;
    this.nextBtn.hidden = !many;
    this.thumbs.hidden = !many;
  }

  renderThumbs() {
    this.thumbs.innerHTML = this.items.map((item, index) => {
      const src = item.thumbnail || item.image || item.logo || "";
      return `
        <button type="button" class="lightbox__thumb" data-lightbox-thumb="${index}" aria-label="Show ${escapeHtml(item.title)}">
          ${src ? `<img src="${escapeHtml(src)}" alt="">` : ""}
        </button>`;
    }).join("");
  }

  onKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      this.close();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.show(this.index + 1);
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.show(this.index - 1);
      return;
    }
    if (event.key === "Tab") {
      this.trapFocus(event);
    }
  }

  trapFocus(event) {
    const focusable = [...this.root.querySelectorAll('button, [href], input, select, textarea, video, [tabindex]:not([tabindex="-1"])')]
      .filter((el) => !el.hasAttribute("disabled") && !el.hidden && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
