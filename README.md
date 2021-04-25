# Simple Angular - NestJs app
# IN_PROGRESS...
# instructions to run the project 
## 1. Add an environment file to the project
Add a .env file in the api folder (at the top of your api folder, so nest can find it)  
 - add your own DATABASE_URL in the .env file
 - add your own JWT_SECRETE in the .env file
 - Use /scripts/seeder.sh to add the initial admin user in mongodb

Example of file: 

    DATABASE_URL=<your url>  
    JWT_SECRETE=alkshdlkahsdklhaslh35923553jkl24lj234
	JWT_EXPIRES_IN=100000s
	JWT_EXPIRATION=false
    

## Start the Backend in dev Mode after you added the .env file
`cd api`  
`npm install`  
`npm run start:dev`  
  
