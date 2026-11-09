<?php

declare(strict_types=1);

/**
 * Custom config values, available in Twig as craft.app.config.custom.<key>.
 *
 * @link https://craftcms.com/docs/5.x/configure.html#custom-settings
 */

use craft\helpers\App;

return [
    // Google Tag Manager container ID (e.g. GTM-XXXXXXX). Leave GTM_ID empty to disable GTM.
    'gtmId' => App::env('GTM_ID') ?: null,
];
