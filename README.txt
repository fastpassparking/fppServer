# Install dependencies
cd fppServer
npm install

# Run the app on local server:
** WINDOWS
set DEBUG=fppServer
node ./bin/www

** UNIX
DEBUG=fppServer ./bin/www
Navigate browser to localhost:3000 (default)

#### Project structure
app.js - Main application entrance
routes - url addresses
models - database model definitions
views - visual pages, not necessary for our needs
mongoose - MongoDb ORM framework