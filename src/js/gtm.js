/**
 * Google Tag Manager loader: its own Vite entry, loaded with async in templates/_layouts/_layout.twig
 * only when GTM_ID is set. The container ID comes from the script tag's data-gtm-id attribute.
 * This is the standard GTM snippet, without inline JavaScript in the template.
 *
 * Google Consent Mode v2: before GTM loads, every consent type except security_storage defaults to
 * "denied", so nothing is tracked until the visitor agrees (GDPR / AVG). The project's cookie banner
 * (CMP) then sends gtag("consent", "update", { … }) with the visitor's choices.
 * wait_for_update gives the banner up to 500 ms to load and send a stored choice before tags fire.
 */
const gtmId = document.querySelector("script[data-gtm-id]")?.dataset.gtmId;

if (gtmId) {
  window.dataLayer = window.dataLayer || [];

  // gtag() must push the Arguments object (not an array): that's the format GTM reads consent commands from.
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  });
  // Without ad consent, strip ad click identifiers from requests to Google
  window.gtag("set", "ads_data_redaction", true);

  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.append(script);
}
