const countdownTarget = new Date("2026-10-31T17:30:00+07:00").getTime();

function updateCountdown() {
  const now = Date.now();
  let diff = Math.max(0, countdownTarget - now);

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.querySelector('[data-unit="days"]').textContent = String(days).padStart(2, "0");
  document.querySelector('[data-unit="hours"]').textContent = String(hours).padStart(2, "0");
  document.querySelector('[data-unit="minutes"]').textContent = String(minutes).padStart(2, "0");
  document.querySelector('[data-unit="seconds"]').textContent = String(seconds).padStart(2, "0");

  if (countdownTarget <= now) {
    document.querySelector("#countdown").innerHTML =
      '<p style="grid-column:1/-1;font:italic 1.6rem/1.3 var(--serif);padding:1.5rem">Hôm nay là ngày chúng mình về chung một nhà ❤️</p>';
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
};

document.querySelectorAll(".photo img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
  });
});

document.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
