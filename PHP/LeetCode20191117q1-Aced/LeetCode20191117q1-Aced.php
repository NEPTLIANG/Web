<?php //记得加<?，否则phpstorm不认
//第163场力扣周赛第1题——二维网格迁移
class Solution
{

    /**
     * @param Integer[][] $grid
     * @param Integer $k
     * @return Integer[][]
     */
    function shiftGrid($grid, $k)
    {
        for ($round = 0; $round < $k; $round++) {
            $this->move($grid);
        }
        var_dump($grid);
        return $grid;
    }

    function move(&$grid)  //数组地址传参要在形参前加&
    {
        $endOfGrid = $grid[count($grid) - 1][count($grid[0]) - 1];
        for ($row = count($grid) - 1; $row >= 0; $row--) {
            $endOfRow = $grid[$row][count($grid[$row]) - 1];  //搞清楚是count(数组)还是count(行)
            for ($col = count($grid[0]) - 2; $col >= 0; $col--) {
                $grid[$row][$col + 1] = $grid[$row][$col];
            }
            if (isset($grid[$row + 1])) {
                $grid[$row + 1][0] = $endOfRow;
            }
        }
        $grid[0][0] = $endOfGrid;
    }
}

$grid = [[1], [2], [3], [4], [7], [6], [5]];
$k = 23;
$var = new Solution();
$var->shiftGrid($grid, $k);