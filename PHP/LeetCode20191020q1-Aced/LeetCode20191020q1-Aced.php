<?php

class Solution
{

    /**
     * @param Integer[][] $coordinates
     * @return Boolean
     */
    function checkStraightLine($coordinates)  //第159场力扣周赛第1题——1232. 缀点成线——Accepted
    {
        $k1 = ($coordinates[0][1] - $coordinates[1][1]) / ($coordinates[0][0] - $coordinates[1][0]);
        $b1 = $coordinates[0][1] - $k1 * $coordinates[0][0];
        for ($indexOfItem = 1; $indexOfItem < sizeof($coordinates); $indexOfItem++) {
            $k = ($coordinates[$indexOfItem][1] - $coordinates[$indexOfItem - 1][1])
                / ($coordinates[$indexOfItem][0] - $coordinates[$indexOfItem - 1][0]);
            $b = ($coordinates[$indexOfItem][1] - $k * $coordinates[$indexOfItem][0]);
            if (($k != $k1) || ($b != $b1)) {
                return false;
            }
        }
        return true;
    }
}

$coordinates = [[1, 1], [2, 2], [3, 4], [4, 5], [5, 6], [7, 7]];
$a = new Solution();
var_dump($a->checkStraightLine($coordinates));
