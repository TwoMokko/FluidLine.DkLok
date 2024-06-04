<?php

namespace App\Elastic;

use modX;
use PDO;

class FilterProcess
{
    public static function filterDetect(array $filters, modX $modx): array
    {
        $selectedFilter = [];
        foreach ($filters as $filter) {
            // var_dump($filters);
            // die;
            $name = self::getCategoryTitles($filter->category, $modx);
            if ($filter->checked) {
                $selectedFilter[] = [
                    "terms" => [
                        $name => $filter
                    ]
                ];
            }
        }
        return $selectedFilter;
    }

    protected function getCategoryTitles(string $caption, modX $modx): string
    {
        $sql = "SELECT `name` FROM modx_site_tmplvars
        WHERE caption = :caption";
        $stmt = $modx->prepare($sql);
        $stmt->bindValue("caption", $caption);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
