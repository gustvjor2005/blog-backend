# blog-backend

# steps

#create project

npm init -y
npm install mysql
npm install express
npm install cors
npm install config

#install Node Js
sudo apt update
sudo apt install nodejs
node -v #v12.22.9
#install npm
sudo apt install npm


#install nginx
sudo apt update
sudo apt install ngnix


#install node version manager NVM
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc

para remover
     $ nvm use system
     $ npm uninstall -g a_module

nvm -v


curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"xyz","section":"x", "details":"ddddd"}' \
  http://localhost:8090/api/comment


