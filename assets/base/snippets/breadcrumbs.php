<?php
//$currentId = $scriptProperties['id'];
//$pathArray = [];
//// var_dump($currentId);
//// die;
//while ($currentId !== 0) {
//    $sql = "SELECT parent, pagetitle, uri FROM modx_site_content WHERE id = :id";
//    $stmt = $modx->prepare($sql);
//
//    $stmt->execute(["id" => $currentId]);
//    $resultArr = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
//    // var_dump($pathArray);
//    // die;
//    $currentId = $resultArr["parent"];
//    array_unshift($pathArray, [$resultArr["pagetitle"], $resultArr["uri"]]);
//}
//foreach ($pathArray as $path) {
//
//    if ($path === end($pathArray)) {
//        echo $modx->getChunk('breadcrumbs', ['crumb' => $path[0], 'link' => $path[1]]);
//        break;
//    }
//    echo $modx->getChunk('breadcrumbs', ['crumb' => $path[0], 'link' => $path[1]]);
//    echo '<span class="breadcrumbs-arrow"><img src="/assets/resources/img/case_arr.svg" alt=""></span>';
//}