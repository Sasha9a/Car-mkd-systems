echo 'Connect to Server...'

# SSL сертификат
# sudo certbot --nginx -d car-mkd-systems.ru -d www.car-mkd-systems.ru; pm2 restart 0

umask 777
ssh -tt -i ~/.ssh/id_rsa root@45.141.78.161 << EOF
pm2 stop 0
cd Car-mkd-systems
git pull
npm install
nx affected:build --all
sudo cp deploy/nginx.conf /etc/nginx/sites-available/car-mkd-systems.ru
sudo ln -s /etc/nginx/sites-available/car-mkd-systems.ru /etc/nginx/sites-enabled/
sudo cp -r ~/Car-mkd-systems/dist/apps/web/* /var/www/car-mkd-systems.ru/html
sudo systemctl restart nginx
pm2 restart 0
exit
EOF

echo 'Finish!'