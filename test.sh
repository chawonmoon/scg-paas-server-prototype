#!/bin/sh

var1=$(git pull | wc -l)
echo "var1 : $var1"
var2=$(($var1+0))

echo "var2 : $var2"
if [ $var2 -gt 2 ]
      then
	echo "test"
fi
sleep 1
exit 0

