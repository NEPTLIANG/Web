function calc()
{
    var input = document.getElementById("input") ;
    var birthYear = input.value ;  //别忘了.value
    var now = new Date() ;  //new Date()获取当前时间
    var nowYear = now.getFullYear() ;  //.getFullYear()获取Date对象的年份
    var age = nowYear-birthYear ;
    alert(age) ;
}
