# Blog Backend Setup

Este es un tutorial paso a paso para configurar el backend de tu blog utilizando Node.js y MySQL.

### Paso 1: Crear el Proyecto

Para crear el proyecto, sigue estos comandos:

```bash
npm init -y
npm install mysql
npm install express
npm install cors
npm install config
```

### install Node Js
```bash
sudo apt update
sudo apt install nodejs
node -v #v12.22.9
```

### install npm
```bash
sudo apt install npm
```

### install nginx
```bash
sudo apt update
sudo apt install ngnix
```
### install node version manager NVM
```bash
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
```
### para remover
```bash
nvm use system
npm uninstall -g a_module
```
### versión 
```bash
nvm -v
```
### call apis
```bash
curl --header "Content-Type: application/json" \
          --request POST \
          --data '{"username":"xyz","section":"x", "details":"ddddd"}' \
          http://localhost:8090/api/comment

curl  -H "ind: fa"  "http://localhost:8091/api/comment"
```