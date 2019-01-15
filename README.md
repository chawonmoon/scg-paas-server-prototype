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
