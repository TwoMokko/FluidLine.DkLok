<?php
$parent = $scriptProperties['parent'];
    global $modx;

        $sql = "SELECT id, pagetitle, uri, introtext FROM modx_site_content WHERE parent = :parent ORDER BY `menuindex`";
        $stmt = $modx->prepare($sql);

        $stmt->execute(['parent' => $parent]);
        $directoryArr = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($directoryArr as $directory) {
            echo $modx->getChunk('product_card', [
                'pagetitle' => $directory['pagetitle'],
                'uri' => $directory['uri'],
                'id' => $directory['id'],
                'introtext' => $directory['introtext'],
            ]);
        }