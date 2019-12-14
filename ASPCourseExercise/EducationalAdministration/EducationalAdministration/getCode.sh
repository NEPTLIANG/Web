function getCode() {
	for fileName in *; do  #遍历当前目录下所有文件名
		if [ -d $fileName ]; then  #如果是目录文件，获取其中的代码
			cd $fileName
			getCode;  #递归调用本函数，获取该目录下的代码
			cd ..;
		fi
		if [[ $fileName =~ ((.aspx)$|(.aspx.cs)$) ]]; then  #如果文件后缀名为.aspx或.aspx.cs，回显其内容；“|”两侧不能有空格否则出错
			echo "";
			echo ""; 
			echo $fileName;  #打印文件名
			echo ""; 
			cat $fileName;  #获取文件内容
		fi
	done
}

getCode
