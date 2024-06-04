<?php

namespace App\Visitor;

use modX;
use PDO;

class VisitorController
{
    private string $clientId;
    private modX $modx;
    private array $alphabet;
    private string $vid;

    public function __construct(modX $modx)
    {
        $this->clientId = $_COOKIE['client_id'] ?
        $_COOKIE['client_id'] : $this->getHashString(32);
        $this->modx = $modx;
        $this->alphabet = [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z"
        ];
    }

    public function initVisitorData(): void
    {
        $this->vid = $this->visitorIdByIp();

        if (!$this->vid) {
            $this->vid = ($this->setUserVid($this->newUser()));
        }
        $this->setClientId($this->vid);
    }

    private function visitorIdByIp(): bool | string
    {
        $cid = $_COOKIE['_ym_uid'];

        $query = $this->modx->query(
            "SELECT `vid`
             FROM `visitors_info`
             WHERE `_ym_uid` = '" . $cid . "'
             ORDER BY `id`
             DESC LIMIT 1"
        );

        $row = $query->fetch(PDO::FETCH_ASSOC);
        if (!$query) {
            return false;
        }
        if (!empty($row['vid'])) {
            if (!$_COOKIE['visitor_id']) {
                setcookie('visitor_id', $row['vid'], time() + 62000000, '/');
            }
            return $row['vid'];
        }

        return false;
    }

    private function newUser(): int
    {

        $sql = 'INSERT INTO `visitors_info` (`ip`,`_ym_uid`, `created_on`, `visited_on`, `user_agent`)
                VALUES ("' . $_SERVER['REMOTE_ADDR'] . '", "' . $_COOKIE['_ym_uid'] . '", "' . date("Y-m-d H:i:s") . '", "' . date("Y-m-d H:i:s") . '", "' . $_SERVER['HTTP_USER_AGENT'] . '")';
        $insert = $this->modx->query($sql);
        // if (!$insert) {
        //     $this->modx->logEvent(
        //         0,
        //         3,
        //         'Не удалось добавить нового юзера в таблицу: ' .
        //         $this->modx->db->error.'<br>' . $sql,
        //         'счетчик: не удалось добавить нового юзера в таблицу'
        //     );
        //     die();
        // }

        return $this->modx->lastInsertId();
        //добавляем в базу его VID

    }

    private function setUserVid(int $dbId): string
    {
        $vid = $this->generateUniqueNumber($dbId);
        $this->modx->query(
            'UPDATE `visitors_info`
             SET `vid` = "' . $vid . '" WHERE `id` = ' . $dbId
        );
        setcookie('visitor_id', $vid, time() + 62000000, '/');
        return $vid;
    }

    private function setClientId(string $vid): void
    {
        $this->modx->query(
            'UPDATE `visitors_info`
             SET `client_id` = "' . $this->clientId . '" WHERE `vid` = "' . $vid . '"'
        );
        setcookie("client_id", $this->clientId, time() + 62000000, '/');
    }

    private function generateUniqueNumber(int $id): string
    {
        $ns = 26;
        $r[] = 0;
        $edge = $id;
        while ($edge > 0) {
            $n = log($edge, $ns);
            $s = floor($n);
            if ($edge === $id) {
                $n_keys = $s + 1;
                $r = array_pad($r, $n_keys, 0);
            }
            $r[$s]++;
            $edge = $edge - pow($ns, $s);
        }
        $string = '';
        foreach (array_reverse($r) as $value) {
            $string .= $this->alphabet[$value];
        }
        return $string;
    }

    private function getHashString(int $lenght): string
    {
        $permittedChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return substr(str_shuffle($permittedChars), 0, $lenght);
    }

}
