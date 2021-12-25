echo 'Connect to Server...'

umask 777
ssh -tt -i ~/.ssh/id_rsa root@45.141.78.161 << EOF

# pm2 stop 0
cp -r Car-mkd-systems/public images
rm -rf Car-mkd-systems
git clone https://github.com/Sasha9a/Car-mkd-systems.git -b v2.0
cp -r images Car-mkd-systems/public
rm -rf images
cd Car-mkd-systems
npm install
npm run build
# pm2 restart 0

pm2 start Car-mkd-systems/dist/apps/api/main.js

exit

EOF

echo 'Finish!'
