#### Usage Instructions ####

# Start mongodb server (if running locally)
# In seperate command line window
mongod

# Install dependencies
cd fppServer
npm install

# Run the app on local server (development mode):
node app.js
Navigate browser to localhost:3000 (default)

# To run in production mode
set NODE_ENV=production
# To switch back to development mode
set NODE_ENV=development
# To run in server mode (linux)
exec sudo NODE_ENV=dev_server nodejs app.js

#### Project structure ####
app.js - Main application entrance
config.json - Configuration for development / production environments
package.json - Project dependencies
routes - url addresses
models - database model definitions
mongoose - MongoDb ORM framework