<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 * @link https://craftcms.com/docs/5.x/reference/config/general.html
 */

use craft\config\GeneralConfig;
use craft\helpers\App;

return GeneralConfig::create()
    // Set the default week start day for date pickers (0 = Sunday, 1 = Monday, etc.)
    ->defaultWeekStartDay(1)
    // Prevent generated URLs from including "index.php"
    ->omitScriptNameInUrls()
    // Preload Single entries as Twig variables
    ->preloadSingles()
    // Prevent user enumeration attacks
    ->preventUserEnumeration()
    // Prevent the front-end Login page
    ->loginPath(false)
    // Enable the Twig sandbox for system messages, etc.
    ->enableTwigSandbox()
    // Don't send the "X-Powered-By: Craft CMS" header (makes the CMS a little harder to fingerprint)
    ->sendPoweredByHeader(false)
    // Turn off the GraphQL API. Set to true in projects that need it.
    ->enableGql(false)
    // Keep at most 25 revisions per entry, so the database doesn't keep growing
    ->maxRevisions(25)
    // Convert uploaded filenames to ASCII (e.g. "café.jpg" → "cafe.jpg") for clean, predictable URLs
    ->convertFilenamesToAscii()
    // Never make image transforms larger than the original image
    ->upscaleImages(false)
    // Add a version query string (?v=…) to asset URLs, so replaced files bypass browser/CDN caches
    ->revAssetUrls()
    // Allow admin changes in development
    ->allowAdminChanges(App::env('CRAFT_ALLOW_ADMIN_CHANGES') ?? false)
    // Enable dev mode in development
    ->devMode(App::env('CRAFT_DEV_MODE') ?? false)
    // Block crawlers (robots.txt + X-Robots-Tag header) unless CRAFT_DISALLOW_ROBOTS=false is set explicitly (production)
    ->disallowRobots(App::env('CRAFT_DISALLOW_ROBOTS') ?? true)
    // Set the @webroot alias so the clear-caches command knows where to find CP resources
    ->aliases([
        '@webroot' => dirname(__DIR__) . '/web',
    ])
;
