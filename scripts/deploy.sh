#!/usr/bin/env bash

mvn clean package

echo 'Copy files...'

scp -i ~/.ssh/id_rsa \
      target/car-mkd-systems-0.0.1.jar \
      root@45.90.35.174:/root/

echo 'Restart server...'

ssh -i ~/.ssh/id_rsa root@45.90.35.174 << EOF
  pkill -f car-mkd-systems-0.0.1.jar
  nohup java -jar car-mkd-systems-0.0.1.jar > log.txt 2>&1 &
  exit
EOF

echo 'Bye.'