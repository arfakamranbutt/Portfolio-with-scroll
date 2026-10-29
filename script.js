// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal sections as they scroll into view
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Highlight the navbar link of the section currently in view
const navLinks = document.querySelectorAll(".nav__links a");
const sections = [...navLinks].map((a) => document.querySelector(a.getAttribute("href")));
function updateActiveLink() {
  const y = window.scrollY + 120;
  let current = 0;
  sections.forEach((sec, i) => { if (sec && sec.offsetTop <= y) current = i; });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections.length - 1;
  navLinks.forEach((a, i) => a.classList.toggle("is-active", i === current));
}
window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// Copy email to clipboard on click
const emailLink = document.getElementById("emailLink");
const copyNote = document.getElementById("copyNote");
if (emailLink && copyNote) {
  emailLink.addEventListener("click", (e) => {
    if (!navigator.clipboard) return;
    e.preventDefault();
    navigator.clipboard.writeText(emailLink.textContent.trim())
      .then(() => {
        copyNote.textContent = "Email copied to clipboard";
        setTimeout(() => (copyNote.textContent = ""), 2500);
      })
      .catch(() => (window.location.href = emailLink.href));
  });
}

// ---------- AURA EMBEDDED BANNER INTERACTION ----------
const auraBanner = document.getElementById("auraBanner");
const auraCompanion = document.getElementById("auraCompanion");
const auraText = document.getElementById("auraText");

const auraQuotes = [
  "...and currently crafting more exciting AI & software projects behind the scenes! ✧",
  "Fun fact: Arfa builds algorithms & routing engines in Python & C++! 💻",
  "Click any project card above to view the full source code on GitHub! 🚀",
  "Aura approved! ✨ Feel free to collaborate with Arfa anytime!"
];

let quoteIndex = 0;

if (auraBanner && auraText && auraCompanion) {
  auraBanner.addEventListener("click", () => {
    // Spin Aura
    auraCompanion.classList.add("is-excited");
    setTimeout(() => auraCompanion.classList.remove("is-excited"), 600);

    // Cycle quote
    quoteIndex = (quoteIndex + 1) % auraQuotes.length;
    auraText.textContent = auraQuotes[quoteIndex];
  });
}