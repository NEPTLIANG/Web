<?php

class Solution
{

    /**
     * @param String[] $folder
     * @return String[]
     */
    function removeSubfolders($folder)
    {
        eval($folder);
    }
}

$folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"];
$a = new Solution();
//$a->removeSubfolders("folder = [\"/a\",\"/a/b\",\"/c/d\",\"/c/d/e\",\"/c/f\"]");