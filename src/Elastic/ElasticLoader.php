<?php

namespace App\Elastic;

require_once $_SERVER['DOCUMENT_ROOT'] . '/config.core.php';
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';

use GuzzleHttp\Client;
use App\Elastic\ElasticProcess;
use modX;

class ElasticLoader
{
    protected Client $client;
    protected array $headers;
    protected string $search;
    protected int $page;
    protected array $files;
    protected array $products;
    protected array $result;
    protected modX $modx;
    protected ElasticProcess $process;
    protected object $indiciesList;
    protected string $return;

    public function __construct(modX $modx)
    {
        $this->client = new Client(["base_uri" => $_ENV['ELASTIC_HOST']]);
        $this->headers = [
            'Content-Type' => 'application/json',
        ];
        $this->search = $_GET['search'] ?? "*";
        $this->page = ($_GET['page'] - 1) * 8;
        $this->modx = $modx;
        $this->process = new ElasticProcess($this->modx);
        $this->indiciesList = json_decode(
            $this
                ->client
                ->request(
                    "GET",
                    "/_aliases"
                )
                ->getBody()
                ->getContents()
        );
        $this->return = '';
        $this->result = [
            "catalogs" => [],
            "products" => [
                "limit" => 0,
                "content" => [],
            ],
        ];
    }
    public function elasticSearchProcess(): string
    {
        $this->elasticIndiciesValidation();
        return $this->getSearch();
    }

    protected function elasticIndiciesValidation(): void
    {
        if (!isset($this->indiciesList->dklok_products)) {
            $this
                ->client
                ->request(
                    "PUT",
                    "/dklok_products"
                );

            $this->process->elasticReloadProducts();
        }
        if (!isset($this->indiciesList->dklok_files)) {
            $this
                ->client
                ->request(
                    "PUT",
                    "/dklok_files"
                );
            // $this->process->elasticReloadFiles();
        }
    }

    protected function indexEmptyValidation(): bool
    {
        $response = $this
            ->client
            ->request(
                "GET",
                "/dklok_products/_search",
                [
                    'headers' => $this->headers,
                ]
            )
            ->getBody()
            ->getContents();
        if (empty(json_decode($response, true)['hits']['hits'])) {
            return false;
        }
        return true;
    }

    protected function getSearch(): string
    {
        $this->searchForProducts();
        // $this->searchForFiles();
        $this->jsonFormatter();

        return $this->return;
    }

    protected function searchForProducts(): void
    {
        $json = json_encode(
            [
                'from' => $this->page ?? 0,
                'size' => 8,
                'sort' => [
                    '_index' => [
                        'unmapped_type' => 'long'
                    ],
                    '_id' => ["order" => "asc"],

                ],
                'query' => [
                    "simple_query_string" => [
                        "query" => "*$this->search*",
                        "analyze_wildcard" => true,
                        "default_operator" => "AND"
                    ],
                ],
            ]
        );
        $response = $this
            ->client
            ->request(
                "GET",
                '/dklok_products/_search',
                [
                    'headers' => $this->headers,
                    'body' => $json,
                ]
            )
            ->getBody()
            ->getContents();
        $this->products = json_decode($response, true);
    }

    protected function searchForFIles(): void
    {
        $json = json_encode(
            [
                'size' => 80,
                'sort' => [
                    '_index' => 'desc',
                ],
                'query' => [
                    "simple_query_string" => [
                        "query" => "*$this->search*",
                        "analyze_wildcard" => true,
                        "default_operator" => "AND"
                    ],
                ],
            ]
        );
        $response = $this
            ->client
            ->request(
                "GET",
                '/dklok_files/_search',
                [
                    'headers' => $this->headers,
                    'body' => $json,
                ]
            )
            ->getBody()
            ->getContents();
        $this->files = json_decode($response, true);
    }

    protected function jsonFormatter(): void
    {

        foreach ($this->products['hits']['hits'] as $product) {
            $this->result['products']['content'][] = $product["_source"];
        }
        // foreach ($this->files['hits']['hits'] as $file) {
        //     $this->result['catalogs'][] = [
        //         "name" => $file["_source"]["name"],
        //         "link" => $file["_source"]["link"],
        //     ];
        // }
        $this->result['products']['limit'] = ceil(
            $this->products['hits']['total'] / 8
        );
        $this->return = json_encode($this->result);
    }
}
