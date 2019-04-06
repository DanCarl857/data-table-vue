// Assuming you have already done "npm install fernet"
let Fernet = require('fernet')
let secret = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
let message = 'gAAAAABcpeo5HYQ5EdqOl7S56Sjr5Z60Ov84ykG9MeuWM9byz8Q4JJdF91nE4F_zhgr1ej_2lynguMaKL87j3Db8-kVHQQgTUuRa2JRQOXoy7ID1FjSr0f-Z2qdo8LmoFh7MumWEKeOBwJMRqQPrH8yp-AxKpp1Jn2_DHv64fExra8NJmdeIkMymNTqgfVlG6eULXha5Q9vM'
let token = new Fernet.Token({secret: secret, token: message, ttl:0})
console.log(token.decode())