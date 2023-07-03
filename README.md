## nginx 配置

```
    server {
        listen       80;
        server_name  jp.sesechat.com;
        root /usr/share/nginx/html;
        index index.php index.html index.htm;

        # 后端访问接口
        location /user/user-login {  
            default_type application/json;
            add_header Content-Type 'text/html; charset=utf-8';
            return 200 '{"result":null,"code":511,"message":"[511]The user is not exists"}';

         }  
    }

```