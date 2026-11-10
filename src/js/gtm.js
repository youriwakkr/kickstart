/**
 * Google Tag Manager loader: its own Vite entry, loaded with async in templates/_layouts/_layout.twig
 * only when GTM_ID is set. The container ID comes from the script tag's data-gtm-id attribute.
 * This is the standard GTM snippet, without inline JavaScript in the template.
 */
const gtmId = document.querySelector("script[data-gtm-id]")?.dataset.gtmId;

if (gtmId) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.append(script);
}
