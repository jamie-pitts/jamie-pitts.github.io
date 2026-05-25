/*
 * Jamie Pitts — Personal Website
 * ---
 * Three small features:
 *   1. Scroll-reveal for sections / roles / projects
 *   2. Theme toggle (light/dark, with localStorage + system-preference fallback)
 *   3. Image lightbox (with prev/next navigation per gallery, keyboard support)
 * Honours `prefers-reduced-motion`.
 */

// --- 1. Scroll reveal --------------------------
(function () {
  const targets = document.querySelectorAll(".section, .role, .project");
  targets.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();

// --- 2. Theme toggle ---------------------------
(function () {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  // Toggle on click — persist choice in localStorage.
  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // If the user hasn't picked a preference, follow the OS as it changes.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
    }
  });
})();

// --- 3. Image lightbox -------------------------
(function () {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  const triggers = Array.from(document.querySelectorAll(".lightbox-trigger"));

  if (triggers.length === 0) return;

  let currentGroup = [];
  let currentIndex = 0;

  // Group triggers by their containing gallery so prev/next stays within a project.
  function groupFor(trigger) {
    const gallery = trigger.closest(".project-gallery, .archive-gallery");
    if (!gallery) return [trigger];
    return Array.from(gallery.querySelectorAll(".lightbox-trigger"));
  }

  function show(index) {
    if (index < 0 || index >= currentGroup.length) return;
    currentIndex = index;
    const trigger = currentGroup[currentIndex];
    lightboxImg.src = trigger.getAttribute("href");
    lightboxImg.alt = trigger.querySelector("img")?.alt || "";
    lightboxCaption.textContent = trigger.dataset.caption || "";
    prevBtn.hidden = currentGroup.length <= 1;
    nextBtn.hidden = currentGroup.length <= 1;
  }

  function open(trigger) {
    currentGroup = groupFor(trigger);
    const index = currentGroup.indexOf(trigger);
    show(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  function next() {
    show((currentIndex + 1) % currentGroup.length);
  }
  function prev() {
    show((currentIndex - 1 + currentGroup.length) % currentGroup.length);
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      open(trigger);
    });
  });

  // Click outside the image figure closes (the figure itself has cursor:default).
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  });
})();
