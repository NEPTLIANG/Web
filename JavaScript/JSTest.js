//公共函数：计算字符串的实际长度
function strlen(str){
		var len;  //声明临时变量，存储字符串的实际长度
		var i;  //声明循环变量
		len = 0;  //初始化临时变量len为0
		for (i = 0; i < str.length; i ++){  //循环检测字符串中每个字符
				if (str.charCodeAt(i) > 255) len += 2;  //如果当前字符为双字节字符，则递增2次
				else len ++ ;  //如果当前字符为单字节字符，则递增一次
		}
		return len;  //返回字符串的实际长度值
}
