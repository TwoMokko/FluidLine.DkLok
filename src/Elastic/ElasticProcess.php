<?php

namespace App\Elastic;

use GuzzleHttp\Client;
use MODX\Revolution\modX;
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
    private array $data;

    public function __construct(modX $modx)
    {
        // $this->elasticsearchUrl = ;
        $this->documentsFolder = MODX_BASE_PATH . "assets/base/resources/documents";
        $this->sql = "SELECT mst.contentid, mst.tmplvarid, mst.value, msc.pagetitle, msc.parent FROM
                modx_site_tmplvar_contentvalues AS mst
            LEFT JOIN
                modx_site_content AS msc ON msc.id = mst.contentid
            WHERE msc.isfolder = 0 AND mst.tmplvarid = 2";
        $this->modx = $modx;
        $this->client = new Client(["base_uri" => $_ENV['ELASTIC_HOST']]);
        $this->products = [];
        $this->finder = new Finder();
        $this->data = [];
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
        $stmt = $this->modx->query($this->sql);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // dd($results);
        $arr = [];
        foreach ($results as $result) {
            // dd($result);
            $this->products['price'] = [
                $result['value'],
            ];
            $this->products['link'] = [
                $this->getParentLink((int) $result['parent']),
            ];
            $this->products['image'] = [
                $this->getParentImage((int) $result['parent']),
            ];
            $this->products['title'] = $result['pagetitle'];
            $this->setProductData($this->products, (int) $result['contentid']);
        }

        // dd(implode("\n", $this->data));
        $this->sendProductsToElastic();

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
            $index = 'dklok_products';
            $type = 'product';
            $id = (int) $key;
            $this->client->request(
                "POST",
                "/_bulk",
                [
                    "body" => implode("\n", $this->data) . "\n",
                    "headers" => [
                        "Content-Type" => "application/json",
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

            $index = 'dklok_files';
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


    private function setProductData(array $query, int $id): void
    {
        $index = [
            'index' => [
            '_index' => 'dklok_products',
            '_type' => 'product',
            '_id' => (int) $id,
        ]];
        $data = [
            'title' => strip_tags($query['title']),
            'price' => $query['price'][0] ?? "0",
            'alias' => $query['link'][0] ?? "0",
            'image' => $query['image'][0] ?? "0",
        ];
        // 'description' => $this->clearKeywords($query['introtext']),

        $this->data[] = json_encode($index);
        $this->data[] = json_encode($data);
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

    private function getParentLink(int $id): string
    {
        $sql = "SELECT uri FROM modx_site_content
            WHERE id = $id";
        $stmt = $this->modx->query($sql);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // dd($result);
        return $result['uri'];
    }

    private function getParentImage(int $id): string
    {
        $sql = "SELECT `value` FROM modx_site_tmplvar_contentvalues
            WHERE contentid = $id
            AND tmplvarid = 5";
        $stmt = $this->modx->query($sql);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // dump($result);
        return $result['value'] ?? 0;
    }

    private function clearKeywords(string $description): string
    {
        $a = strip_tags($description);
        $wordsArr = explode("\n", $a);
        return $wordsArr[0];
    }
}
