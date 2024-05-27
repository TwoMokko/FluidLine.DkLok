<?php
global $modx;
$parent = $scriptProperties['parent'];
$sql = "SELECT id, template FROM modx_site_content WHERE id = :parent LIMIT 1";
$stmt = $modx->prepare($sql);
$stmt->execute(['parent' => $parent]);
$directoryArr = $stmt->fetch(PDO::FETCH_ASSOC);
$template = $directoryArr['template'];



    while ($template !== 2) {
        $sql = "SELECT id, template FROM modx_site_content WHERE parent = :parent LIMIT 1";
        $stmt = $modx->prepare($sql);

        $stmt->execute(['parent' => $parent]);
        $directoryArr = $stmt->fetch(PDO::FETCH_ASSOC);
        $template = $directoryArr['template'];
        $parent = $directoryArr['id'];
    }
    $sql = "SELECT `value` FROM modx_site_tmplvar_contentvalues WHERE contentid = :id AND tmplvarid = 5 LIMIT 1";
    $stmt = $modx->prepare($sql);

    $stmt->execute(['id' => $parent]);
    $directoryArr = $stmt->fetch(PDO::FETCH_ASSOC);
    echo '<img alt="" src="' . $directoryArr['value'] .'">';
//    echo $modx->getChunk('subsection_setimage', [
//        'value' => $directoryArr['value'],
//        'alttext' => $alt,
//    ]);