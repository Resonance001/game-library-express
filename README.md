# Game Library Exam APIs

### Setup Instructions

Install dependencies:

```
$ npm install
```

Start the server:

```
$ npm start
```

### JWT Secret Usage and .env Format

Create .env file in root directory and populate with variables from .env.example

Generate RSA Key pair using the following link [RSA Key Generator](https://cryptotools.net/rsagen) with key length of 2048

Replace each line break with \n on the keys as shown in .env.example and keep the entire key in one line

### List of Requests

For game-related apis, replace your-token-here with given token from login api response.

For update and delete game apis, replace insert-game-id-here with the value of the \_id field from get all games api response.

#### Register User

```
curl --location 'http://localhost:8000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
"username": "Username",
"email": "user@email.com",
"password": "P@ssw0rd"
}'
```

#### Login User

```
curl --location 'http://localhost:8000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"username": "Username",
"email": "user@email.com",
"password": "P@ssw0rd"
}'
```

#### Add Game

```
curl --location 'http://localhost:8000/game' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer your-token-here' \
--data '{
"title": "Valorant",
"genre": "FPS",
"platform": "PC",
"releaseYear": 2020,
"description": "a first-person shooter game developed by Riot Games"
}'
```

#### Update Game

```
curl --location --request PATCH 'http://localhost:8000/game/insert-game-id-here' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer your-token-here' \
--data '{
"title": "Valorant",
"genre": "FPS",
"platform": "PC",
"releaseYear": 2020,
"description": "a first-person shooter game developed by Riot Games"
}'
```

#### Delete Game

```
curl --location --request DELETE 'http://localhost:8000/game/insert-game-id-here' \
--header 'Authorization: Bearer your-token-here' \
--data ''
```

#### Get All Games

```
curl --location 'http://localhost:8000/game?title=Valo&releaseYear=2020' \
--header 'Authorization: Bearer your-token-here' \
--data ''
```

### Third-Party Packages

- bcrypt
- dotenv
- express-rate-limit
- express-validator
- json-web-token
- mongoose
- passport
- passport-local
- passport-jwt
