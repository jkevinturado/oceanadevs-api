# oceanadevs-api
#### by: Kevin Turado

##### Description: A work template built in typescript node and express, configured to use MySQL database and sequelize library and JWT for authentication.
---
#### Instruction:
1. See `tsconfig.json` config file for typescript for code reference. <br>
2. create a `.env` file using this template: <br>
    ```
    ENV=  
    PORT=  
    FRONTEND_URL=
    
    JWT_SECRET=
    JWT_EXPIRATION= # in seconds for example: 3600seconds = 60minutes
    
    DB_NAME=
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_PASSWORD=
    DB_DIALECT=
    ```

3. Install the libraries by running the command:<br>
`npm install`
4. Run available scripts
---
#### Available Scripts:
- Production: 
`npm start `<br>
run this script for production<br>

- Development/local: 
`npm run serve`<br>
Run development or local, watching code changes using nodemon <br>
---
#### API's available: 
- authentication: 
    - login
    - logout
    - user session
- users:
    - create
    - get user by id
    - update user
    - get all user
---
#### Current Features:
  - Custom Error Handler
