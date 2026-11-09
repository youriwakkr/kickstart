<?php

use craft\helpers\App;

$host = Craft::$app->getRequest()->getIsConsoleRequest()
    ? App::env('PRIMARY_SITE_URL')
    : Craft::$app->getRequest()->getHostInfo();

return [
    'checkDevServer' => true,
    'devServerInternal' => 'http://127.0.0.1:3000',
    'devServerPublic' => "$host:3001",
    'serverPublic' => '/dist/',
    'useDevServer' => App::env('CRAFT_ENVIRONMENT') === 'dev',
    'manifestPath' => '@webroot/dist/.vite/manifest.json',
];
