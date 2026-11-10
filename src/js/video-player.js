/**
 * Click-to-play video (templates/_components/pbVideo.twig).
 * Swaps the [data-video-play] poster button for the player in the sibling <template>,
 * so YouTube/Vimeo only load after a click. Focus then moves to the player, because
 * the focused button is gone and keyboard users would otherwise land back at the top.
 */
document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-video-play]");
  if (!button) return;

  const container = button.parentElement;
  const template = container.querySelector("template");
  if (!template) return;

  button.replaceWith(template.content.cloneNode(true));
  container.querySelector("iframe")?.focus();
});
