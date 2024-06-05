<?php

namespace App\Elastic;

use GuzzleHttp\Client;
use modX;
use PDO;
use Symfony\Component\Finder\Finder;

class ElasticProcess
{
    // public string $elasticsearchUrl;
    private string $documentsFolder;
    private string $sql;
    private Client $client;
    private array $products;
    private modX $modx;
    private Finder $finder;
    private object $files;

    public function __construct(modX $modx)
    {
        // $this->elasticsearchUrl = ;
        $this->documentsFolder = MODX_BASE_PATH . "assets/base/resources/documents";
        $this->sql = "SELECT * FROM
                modx_site_tmplvar_contentvalues AS mst
            LEFT JOIN
                modx_site_content AS msc ON mst.id = msc.id";
        $this->modx = $modx;
        $this->client = new Client(["base_uri" => $_ENV['ELASTIC_HOST']]);
        $this->products = [];
        $this->finder = new Finder();
    }

    public function elasticReloadFiles(): void
    {
        $this->importFiles();
    }

    private function importFiles(): void
    {
        $this->files = $this->finder->in($this->documentsFolder);
        $this->sendFilesToElastic();
    }

    public function elasticReloadProducts()
    {
        $client = new Client();
        $modx = new modX();
        $arr = [];
        $results = $modx->query($this->sql);
        foreach ($results as $result) {
            switch ($result['tmplvarid']) {
                case "1":
                    $arr[$result['contentid']]['price'] = [
                        $result['value'],
                    ];
                    break;
                case "2":
                    $arr[$result['contentid']]['category'] = [
                        $result['value'],
                    ];
                    break;
                case "3":
                    $arr[$result['contentid']]['link'] = [
                        $result['value'],
                    ];
                    break;
                case "4":
                    $arr[$result['contentid']]['image'] = [
                        $result['value'],
                    ];
                    break;
            }
            $this->products[$result['contentid']]['title'] = $result['pagetitle'];
        }
    }

    private function modxQueryProcess(array $result): void
    {
        foreach ($result as $row) {
            $this->products[$row['id']] = $row;
        }
    }

    private function sendProductsToElastic(): void
    {
        foreach ($this->products as $key => $val) {
            $index = 'wika_products';
            $type = 'product';
            $this->client->request(
                "PUT",
                "/$index/$type/{$key}",
                [
                    "body" => json_encode($this->setProductData($val)),
                    "headers" => [
                        "Content-type" => "application/json",
                    ],
                ]
            );
        }
    }

    private function sendFilesToElastic(): void
    {
        foreach ($this->files as $val) {
            if ($val->getExtension() === 'pdf') {
                continue;
            }

            $index = 'wika_files';
            $type = 'file';

            $this->client->request(
                "POST",
                "/$index/$type",
                [
                    "body" => json_encode($this->setFileData($val)),
                    "headers" => [
                        "Content-type" => "application/json",
                    ],
                ]
            );
        }
    }


    private function setProductData(array $query): array
    {
        $data = [
            'title' => strip_tags($query['pagetitle']),
            'image' => $query['image'] ?? "0",
            'link' => $query['link'] ?? "0",
            'alias' => $query['uri'] ?? "0",
            'description' => $this->clearKeywords($query['introtext']),
        ];
        return $data;
    }

    private function setFileData(object $query): array
    {

        $data = [
            'name' => str_replace(".txt", "", $query->getRelativePathname()),
            'link' => "/assets/base/resources/documents/" . str_replace(".txt", "", $query->getRelativePathname()),
            'content' => file_get_contents($query->getPathname()),

        ];
        return $data;
    }

    private function clearKeywords(string $description): string
    {
        $a = strip_tags($description);
        $wordsArr = explode("\n", $a);
        return $wordsArr[0];
    }
}
