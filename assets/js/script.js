// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const header = document.getElementById("header");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Header background on scroll
const onScroll = () => {
  if (window.scrollY > 10) {
    header.style.background = "rgba(16, 28, 20, 0.96)";
  } else {
    header.style.background = "rgba(28, 46, 33, 0.85)";
  }
};
window.addEventListener("scroll", onScroll);
onScroll();

// Hero slider
const heroSlider = document.getElementById("heroSlider");
const heroSlides = Array.from(heroSlider.querySelectorAll(".hero-slide"));
const heroDots = Array.from(heroSlider.querySelectorAll(".hero-dot"));
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");
let heroIndex = 0;
let heroTimer = null;

function goToSlide(index) {
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === heroIndex));
  heroDots.forEach((dot, i) => dot.classList.toggle("is-active", i === heroIndex));
}

function startHeroAutoplay() {
  stopHeroAutoplay();
  heroTimer = setInterval(() => goToSlide(heroIndex + 1), 6000);
}
function stopHeroAutoplay() {
  if (heroTimer) clearInterval(heroTimer);
}

heroNext.addEventListener("click", () => { goToSlide(heroIndex + 1); startHeroAutoplay(); });
heroPrev.addEventListener("click", () => { goToSlide(heroIndex - 1); startHeroAutoplay(); });
heroDots.forEach((dot, i) => {
  dot.addEventListener("click", () => { goToSlide(i); startHeroAutoplay(); });
});
heroSlider.addEventListener("mouseenter", stopHeroAutoplay);
heroSlider.addEventListener("mouseleave", startHeroAutoplay);

startHeroAutoplay();

// Contact form (front-end only — no backend wired up yet)
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  formNote.style.color = "#1c2e21";
  formNote.textContent = `Merci ${name || ""} ! Pour une réponse rapide, écrivez-nous directement à ebb.ahala@gmail.com.`;
  contactForm.reset();
});
