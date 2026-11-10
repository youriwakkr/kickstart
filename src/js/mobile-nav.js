/**
 * Mobile nav (templates/_partials/header.twig).
 * - The [data-nav-toggle] button opens and closes #mobile-nav and keeps aria-expanded in sync.
 * - Escape closes the menu and moves focus back to the toggle.
 * - The menu closes when the viewport grows to the desktop nav (Tailwind md = 48rem).
 */
const btn = document.querySelector("[data-nav-toggle]");
const menu = document.getElementById("mobile-nav");

if (btn && menu) {
  const isOpen = () => btn.getAttribute("aria-expanded") === "true";
  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("hidden", !open);
  };

  btn.addEventListener("click", () => setOpen(!isOpen()));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      btn.focus();
    }
  });

  matchMedia("(min-width: 48rem)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
