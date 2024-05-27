<?php
//$query = $modx->newQuery('modResource');
//$query->where(array(
//    'id' => 2,
//
//));
//
//
//
//$properties = $modx->getCollection('modResource', $query);
//
//
//foreach ($properties as $propertie) {
//    echo $modx->getChunk('main_product_card',
//        [
//            'prod_uri' => $propertie->get('uri'),
//            'prod_longtitle' => $propertie->get('longtitle'),
//        ]
//    );
//
//
//
//}


$parent = 2;
global $modx;

$sql = "SELECT id, pagetitle, uri FROM modx_site_content WHERE parent = :parent LIMIT 4";
$stmt = $modx->prepare($sql);

$stmt->execute(['parent' => $parent]);
$directoryArr = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($directoryArr as $directory) {
    echo $modx->getChunk('main_product_card', [
        'pagetitle' => $directory['pagetitle'],
        'uri' => $directory['uri'],
        'id' => $directory['id'],
    ]);
}