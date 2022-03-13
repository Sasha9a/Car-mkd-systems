#!/bin/bash
echo 'Connect to Server...'

# sudo apt update
# curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
# sudo apt -y install nodejs
# node -v
# npm -v
# sudo apt install nginx
# sudo apt install git
# sudo apt install mongodb-server
# sudo apt install certbot python3-certbot-nginx
# sudo apt-get install build-essential

# SSL сертификат
# sudo certbot --nginx -d car-mkd-systems.ru -d www.car-mkd-systems.ru; sudo pm2 restart 0

umask 777
ssh -tt -i ~/.ssh/id_rsa root@45.141.78.161 << EOF
sudo npm install -g pm2
sudo npm install -g nx
sudo /bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
sudo /sbin/mkswap /var/swap.1
sudo /sbin/swapon /var/swap.1
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
sudo ufw enable
git clone https://github.com/Sasha9a/Car-mkd-systems.git -b v2.0
cd Car-mkd-systems
sudo npm install --unsafe
nx affected:build --all
sudo mkdir -p /var/www/car-mkd-systems.ru/html
sudo chown -R $USER:$USER /var/www/car-mkd-systems.ru/html
sudo chmod -R 755 /var/www/car-mkd-systems.ru
sudo cp deploy/nginx.conf /etc/nginx/sites-available/car-mkd-systems.ru
sudo ln -s /etc/nginx/sites-available/car-mkd-systems.ru /etc/nginx/sites-enabled/
sudo cp -r ~/Car-mkd-systems/dist/apps/web/* /var/www/car-mkd-systems.ru/html
sudo systemctl restart nginx
sudo systemctl enable mongodb
sudo pm2 start dist/apps/api/main.js
sudo pm2 save
sudo pm2 startup
exit
EOF

echo 'Finish!'
