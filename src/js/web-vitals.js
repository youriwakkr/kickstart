/**
 * Core Web Vitals (real-user measurement) via the web-vitals package.
 *
 * - Dev (Vite dev server): logs each metric to the console.
 * - Production build: pushes each metric to the GTM dataLayer when GTM is loaded
 *   (GTM_ID set in .env). In GTM, use a Custom Event trigger on "web_vitals" to
 *   forward the metrics to GA4. Without GTM, nothing is sent.
 */
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

function report(metric) {
  if (import.meta.env.DEV) {
    console.log(`[web-vitals] ${metric.name}`, Math.round(metric.value * 1000) / 1000, metric.rating);
    return;
  }

  if (!Array.isArray(window.dataLayer)) {
    return;
  }

  window.dataLayer.push({
    event: "web_vitals",
    metric_name: metric.name,
    // CLS is a unitless score; the others are milliseconds
    metric_value: metric.name === "CLS" ? metric.value * 1000 : metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
    metric_id: metric.id,
    metric_navigation_type: metric.navigationType,
  });
}

onCLS(report);
onINP(report);
onLCP(report);
onFCP(report);
onTTFB(report);
