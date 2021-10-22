# Student application

### Install all dependencies

`npm install`

#### Make sure that your database config DB_NAME, DB_HOST, DB_USER, DB_PASS in .env is correct

#### This application work with MySQL

#### Run migrations and seeders for creating data in DB
`npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`

#### Api documentation you can see at http://your-domain/api/documentation
