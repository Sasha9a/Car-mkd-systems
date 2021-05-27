echo 'Connect to Server...'

ssh -tt -i ~/.ssh/id_rsa root@45.141.78.161 << EOF

pm2 stop 0
cp -r Car-mkd-systems/public/images images
rm -rf Car-mkd-systems
git clone https://github.com/Sasha9a/Car-mkd-systems.git -b v1.0
cp -r images Car-mkd-systems/public/images
rm -rf images
cd Car-mkd-systems
npm install
pm2 restart 0
exit

EOF

echo 'Finish!'