// Dynamic footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Active nav highlighting
const links = document.querySelectorAll("nav a");
const sections = [...links].map(a => document.querySelector(a.getAttribute("href")));

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l =>
        l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id)
      );
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(s => s && navObserver.observe(s));

// Scroll reveal animation
const revealEls = document.querySelectorAll(
  "section h2, section .lead, .hero-grid > div, .about-grid > div, .about-side, .card, .cert-group, .sub, .contact-list, #contact .btns"
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
}, { threshold: 0.15 });

revealEls.forEach((el, i) => {
  el.classList.add("reveal");

  // Piliin ang uri ng animation
  if (el.matches(".hero-grid > div:not(.photo)")) {
    el.classList.add("reveal-hero-left");
  } else if (el.matches(".hero-grid > .photo")) {
    el.classList.add("reveal-hero-right");
  } else if (el.matches(".about-grid > div")) {
    el.classList.add("reveal-left");
  } else if (el.matches(".about-side")) {
    el.classList.add("reveal-right");
  } else if (el.matches(".card, .cert-group")) {
    el.classList.add("reveal-zoom");
  }

  el.style.transitionDelay = (i % 3) * 100 + "ms";
  revealObserver.observe(el);
});
// Resume lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const resumeOpen = document.querySelector(".resume-open");

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

if (resumeOpen) {
  resumeOpen.addEventListener("click", () => {
        openLightbox("images/resume.jpe");
  });
}

// Close: click sa background o X button
lightbox.addEventListener("click", e => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
    closeLightbox();
  }
});

// Close: Esc key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});