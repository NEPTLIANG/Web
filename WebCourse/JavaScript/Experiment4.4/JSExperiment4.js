function respond()
{
    var grade = document.getElementById("input").value ;
    var respond = document.getElementById("respond") ;

    if ( grade=="" )
    {
        respond.innerHTML = "语文成绩不能为空" ;
        respond.style.color = "#F00" ;
        respond.style.backgroundColor = "#F003" ;
        respond.style.borderColor = "#F00" ;
    }
    else if ( grade<0 || grade>100 )
    {
        respond.innerHTML = "语文成绩输入不合法" ;
        respond.style.color = "#F00" ;
        respond.style.backgroundColor = "#F003" ;
        respond.style.borderColor = "#F00" ;
    }
    else if ( grade>=0 && grade<=100 )
    {
        respond.innerHTML = "恭喜：输入正确" ;
        respond.style.color = "#0F0" ;
        respond.style.backgroundColor = "#0F03" ;
        respond.style.borderColor = "#0F0" ;
    }
}
