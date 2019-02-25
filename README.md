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