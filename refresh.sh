#!/bin/sh

cd /home/ec2-user/Project/scg-paas-server-prototype
echo $1
sleep 3

var1=$(git pull | wc -l)
echo "var1 : $var1"
var2=$(($var1+0))

echo "var2 : $var2"
if [ $var2 -gt 2 ]
      then
	echo "1scg-paas-server-prototype start"
	pkill -9 -f scgserver
	echo "scgserver kill complete"
	/home/ec2-user/.nvm/versions/node/v10.15.0/bin/node src/index.js --scgserver
	echo "success start"
	sleep 1
fi
echo "scg-shell exit"
exit 0

