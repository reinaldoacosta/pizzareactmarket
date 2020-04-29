## Deployment
In order to deploy the application the server run the following commands
1. git clone https://github.com/reinaldoacosta/reinaldoacosta.git
2. cd reinaldoacosta
3. cp .env.example .env
4. composer install
5. npm install
6. php artisan migrate:fresh --seed
7. php artisan key:generate
8. npm run prod

Once all of this is done, open the .env file in your favorite editor and modify these lines:
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

And add your DB username (In case it's not root) and add your DB password

That should be all in order to run the application locally.

An explanation of what each command does.
1. Clones the repository to our local machine
2. Enters the current directory of the repo
3. Copies the .env.example file to .env
4 & 5. installs required dependencies, if npm install fails, do not worry, this is not necessary since I've packed the compiled file assets with this repository already
