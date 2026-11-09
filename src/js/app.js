import "../css/app.css";
import "./web-vitals.js";

// pbVideo: swap the poster for the player only after a click, so YouTube/Vimeo load on demand
document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-video-play]");
  if (!button) return;

  const template = button.parentElement.querySelector("template");
  if (!template) return;

  button.replaceWith(template.content.cloneNode(true));
});
