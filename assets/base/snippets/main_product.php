<?php
$query = $modx->newQuery('modResource');
$query->where(array(
    'id' => 2,

));



$properties = $modx->getCollection('modResource', $query);


foreach ($properties as $propertie) {
    echo $modx->getChunk('main_product',
        [
            'prod_uri' => $propertie->get('uri'),
            'prod_longtitle' => $propertie->get('longtitle'),
        ]
    );



}