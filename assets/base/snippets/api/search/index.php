<?php
ini_set('MAX_EXECUTION_TIME', 0);
require_once MODX_BASE_PATH . 'vendor/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/config.core.php';
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';

$dotenv = Dotenv\Dotenv::createImmutable("./");
$dotenv->load();
global $modx;


// use App\Elastic\ElasticLoader;
use App\Elastic\ElasticProcess;
use App\Elastic\ElasticLoader;

$elasticLoader = new ElasticLoader($modx);
file_put_contents('php://output', $elasticLoader->elasticSearchProcess());


// $elasticProcess = new ElasticProcess();
// $elasticProcess->elasticReloadProducts();