<?php

namespace App\Elastic;

require_once $_SERVER['DOCUMENT_ROOT'] . '/config.core.php';
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';

use modX;
use App\Elastic\FilterProcess;
use GuzzleHttp\Client;

class ElasticFilter
{
    protected array $filters;
    protected array $sections;
    protected modX $modx;
    protected Client $client;
    protected array $headers;

    /**
     * Initial method
     *
     * @param modX  $modx    modx class for DB access
     * @param array $filters filter array from front-end request
     */
    public function __construct(array $filters)
    {
        $this->sections = [
            "bool" => [
                "filter" => [],
            ],
        ];
        $this->modx = new modX();
        $this->filters = $filters;
        $this->headers = [
            'Content-Type' => 'application/json',
        ];
        $this->client = new Client(["base_uri" => $_ENV['ELASTIC_HOST']]);
    }

    private function searchForProducts(): void
    {
        $json = json_encode([
                'from' => $this->page ?? 0,
                'size' => 10,
                'sort' => [
                    '_id' => 'asc',
                ],
                "query" => $this->sections,
            ]);
        $response = $this
            ->client
            ->request(
                "GET",
                '/camozzi_products/_search',
                [
                'headers' => $this->headers,
                'body' => $json,
                ]
            )
            ->getBody()
            ->getContents();
        $this->products = json_decode($response, true);
    }



    private function elasticQueryConstruct(): void
    {
        $this->sections["bool"]['filter'] = FilterProcess::filterDetect($this->filters, $this->modx);
    }
}
