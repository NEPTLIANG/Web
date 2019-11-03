<?php //第161场力扣周赛第3题——5249. 移除无效的括号——未AC

class Solution
{

    /**
     * @param String $s
     * @return String
     */
    function minRemoveToMakeValid($s)
    {
        $left = 0;
        $right = 0;
        for ($index = 0; $index < strlen($s); $index++) {
            if ($s[$index] == '(') {
                $left++;
            }
            if ($s[$index] == ')') {
                print($s[$index] . " " . $index . "\n");
                print($left . " " . $right . "\n");
                if ($left < $right) {
                    $s = substr($s, 0, $index) . substr($s, $index + 1, strlen($s));
                    print($s[$index] . " " . $index);
                    $index--;
                } else {
                    $right++;
                }
            }
        }
        for ($diff = $left - $right, $index = 0; ($diff > 0) && ($index < strlen($s)); $index++) {
            if ($left == '(') {
                $s = substr($s, 0, $index) . substr($s, $index + 1, strlen($s));
                $diff--;
            }
        }
        print($s);
        return 0;
    }
}

$var = new Solution();
$var->minRemoveToMakeValid("lee(t(c)o)de)");