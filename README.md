# 서울도시가스 pass 프로토타입 node 서버

# yarn add body-parser compression cookie-parser cors express jsonwebtoken lodash moment mysql password-hash multer serve-favicon axios

# yarn add --dev cross-env eslint

# openssl 설정
 1. openssl genrsa 1024 > localhttps.pem

 2. cat localhttps.pem

 3. openssl req -x509 -new -key localhttps.pem > cert.pem

 4. cat cert.pem

 #.aws ec2 설정
 1. NODE_PATH=$(which node)
 2. sudo setcap 'cap_net_bind_service=+ep' $NODE_PATH

 #.mariadb 맥에서 서비스로 등록시키기
 1. brew services start mariadb

 #.서버 DB 작업
mysql -u root
use mysql;
update user set authentication_string=password('1234') where user='root';
flush privileges;
grant all privileges on *.* to root@'%' identified by '1234' with grant option;
flush privileges;

mysql.server start --skip-grant-tables

grant all privileges on *.* to yamdeng@'%' identified by '1234' with grant option;
flush privileges;

grant all privileges on *.* to yamdeng@localhost identified by '1234' with grant option;
flush privileges;

#.user table 생성
CREATE TABLE `scgpaas`.`scg_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login_id` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `company` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `user_type` VARCHAR(55),
  PRIMARY KEY (`id`));



{
  "name": "안용성",
  "login_id": "yamdeng",
  "company" : "scglab",
  "password": "12345",
  "user_type" : "super"
}

{
  "name": "서울1",
  "login_id": "seoul1",
  "company" : "seoul",
  "password": "seoul1"
}

{
  "name": "인천1",
  "login_id": "inchon1",
  "company" : "inchon",
  "password": "inchon1"
}

# aws 작업
 1. 인스턴스 생성
 2. 키생성 및 다운로드
  -다운로드한 키의 권한을 chmod 400 scgpaas.pem 로 수정
  -ssh 접속 확인 : ssh -i "scgpaas.pem" ec2-user@ec2-3-0-184-167.ap-southeast-1.compute.amazonaws.com
 3. git 설치
  -sudo yum install git
 4. git clone https://github.com/yamdeng/scg-paas-server-prototype.git
 5. git config --global credential.helper cache
 6. node 설치
  -curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
  -. ~/.nvm/nvm.sh
  -nvm install 10.15.3
  -npm i -g yarn
  -yarn
 7.yum 최신화
  -sudo yum update -y
 8.mariadb 설치
  -sudo yum install -y httpd mariadb-server
 9.mariadb 실행
  -sudo systemctl start mariadb
  -sudo mysql_secure_installation ---> root password 설정
  -root / 1234
10. sudo yum install telnet
11. 데이터베이스 생성
 -CREATE DATABASE scgpaas;
12. 사용자 권한 부여
 -grant all privileges on *.* to root@'%' identified by '1234' with grant option;
 -flush privileges;
13. 사용자 생성(UI에서) : yamdeng
14. 데이터베이스 권한 부여
 -grant all privileges on *.* to yamdeng@'%' identified by '1234' with grant option;
 -flush privileges;
 -grant all privileges on *.* to yamdeng@localhost identified by '1234' with grant option;
 -flush privileges;
 -grant all privileges on *.* to yamdeng@127.0.0.1 identified by '1234' with grant option;
 -flush privileges;
15. 툴에서 접속 확인
16. init.sql 데이터베이스 초기화
17. https 설정
 -NODE_PATH=$(which node)
 -sudo setcap 'cap_net_bind_service=+ep' $NODE_PATH

 /home/ec2-user/.nvm/versions/node/v10.15.3/bin
