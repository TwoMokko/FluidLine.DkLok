<?php
global $modx;
$parent = $scriptProperties['parent'];
$sql = "SELECT `id`, `pagetitle` FROM `modx_site_content`
        WHERE parent = :parent LIMIT 10";
$stmt = $modx->prepare($sql);
$stmt->bindValue("parent", $parent);
$stmt->execute();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $sql = "SELECT `tmplvarid`, `value` FROM `modx_site_tmplvar_contentvalues`
            WHERE contentid = :cid";
    $stmt1 = $modx->prepare($sql);
    $stmt1->bindValue("cid", $row['id']);
    $stmt1->execute();
    $tmplvarArr = $stmt1->fetchAll(PDO::FETCH_ASSOC);
    foreach ($tmplvarArr as $tmplvar) {
        switch ($tmplvar['tmplvarid']) {
            case 2:
                $output['price'] = $tmplvar['value'];
                break;
            case 3:
                $output['connection_1'] = $tmplvar['value'];
                break;
            case 4:
                $output['connection_2'] = $tmplvar['value'];
                break;
        }
    }
    echo $modx->getChunk("product_table", [
       "title" => $row['pagetitle'],
       "price" => $output['price'],
       "connection_1" => $output['connection_1'],
       "connection_2" => $output['connection_2']
    ]);
}