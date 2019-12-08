for i in *; do
	if [[ $i =~ ((.aspx)$|(.aspx.cs)$) ]]; then
		echo "" 
		echo $i 
		echo ""
		cat $i
	fi
done
