echo 'Connect to Server...'

ssh -tt -i ~/.ssh/id_rsa root@45.141.78.161 << EOF

rm -rf Car-mkd-systems
git clone https://github.com/Sasha9a/Car-mkd-systems.git
pm2 restart 0

EOF

echo 'Finish!'