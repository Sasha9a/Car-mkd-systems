#!/bin/bash
echo 'Connect to Server...'

# SSL сертификат
# sudo certbot --nginx -d car-mkd-systems.ru -d www.car-mkd-systems.ru; sudo pm2 restart 0

# Если npm install завершается Killed
# sudo fallocate -l 1G /swapfile
# sudo chmod 600 /swapfile
# sudo mkswap /swapfile
# sudo swapon /swapfile
# sudo swapon --show
# sudo cp /etc/fstab /etc/fstab.bak
# echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
# sudo sysctl vm.swappiness=10
# echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
# sudo sysctl vm.vfs_cache_pressure=50
# echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf

umask 777
ssh -tt -i ~/.ssh/id_rsa root@45.141.78.161 << EOF
cd Car-mkd-systems
sudo git pull
sudo npm install --unsafe
nx affected:build --all
sudo cp deploy/nginx.conf /etc/nginx/sites-available/car-mkd-systems.ru
sudo ln -s /etc/nginx/sites-available/car-mkd-systems.ru /etc/nginx/sites-enabled/
sudo cp -r ~/Car-mkd-systems/dist/apps/web/* /var/www/car-mkd-systems.ru/html
sudo systemctl restart nginx
sudo pm2 restart 0
exit
EOF

echo 'Finish!'
