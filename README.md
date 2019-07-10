# React Questions & Answers App Example


## Backend app

**Initialize node.js backend app**

```
$ cd backend
$ npm init -y
```

**Add the dependencies**

```
$ npm i body-parser cors express helmet morgan
# Authentication
$ npm i express-jwt jwks-rsa
```

**Running the server**

```
$ node src
```

**Issuing requests to the API**

```
$ curl localhost:8080

$ curl -X POST -H 'Content-Type: application/json' -d '{ "title": "How do I make a sandwitch?", "description": "I am trying very hard, but I do not know how to make a delicious sandwitch. Can someone help me?" }' localhost:8080

$ curl -X POST -H 'Content-Type: application/json' -d '{ "title": "What is React?", "description": "I have been hearing a lot about React. What is it?" }' localhost:8080

$ curl localhost:8080

$ curl -X POST -H 'Content-Type: application/json' -d '{ "answer": "Just spread butter on the bread, and that is it."}' localhost:8080/answer/1

$ curl localhost:8080/1
```

## Frontend App

**Scaffolding a new React Application**

```
$ npx create-react-app frontend
```

**Running the React App**

```
$ cd frontend
$ npm install
$ npm start
```

**Installing the dependencies**

```
$ npm i react-router react-router-dom axios
# Authentication
$ npm install auth0-js
```
