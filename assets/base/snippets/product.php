<?php
global $modx;

    $sql = "SELECT id, pagetitle, uri FROM modx_site_content WHERE parent = 1";
    $stmt = $modx->prepare($sql);

    $stmt->execute();
    $directoryArr = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $i = 1;
    foreach ($directoryArr as $directory) {
        echo $modx->getChunk('product_card', [
            'pagetitle' => $directory['pagetitle'],
            'uri' => $directory['uri'],
            'id' => $directory['id'],
            'counter' => $i,
        ]);
        $i++;
    }