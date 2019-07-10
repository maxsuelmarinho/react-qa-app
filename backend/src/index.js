const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// define the Express app
const app = express();

// the database
const questions = [];

const APP_PORT = process.env.APP_PORT || 8080;
const checkJwtMock = function(req, res, next) {
    console.log('Check JWT Mock');
    req.user = {
        name: 'User Mock',
    };
    next();
};

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const checkJwt = AUTH0_DOMAIN && AUTH0_CLIENT_ID ? jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    // validate the audience and the issuer.
    audience: `${AUTH0_CLIENT_ID}`,
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
}) : checkJwtMock;

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// retrieve all questions
app.get('/', (req, res) => {
    const qs = questions.map(q => ({
        id: q.id,
        title: q.title,
        description: q.description,
        answers: q.answers.length,
    }));

    res.send(qs);
});

// get a specific question
app.get('/:id', (req, res) => {
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.lenght === 0) return res.status(404).send();
    res.send(question[0]);
});

// insert a new question
app.post('/', checkJwt, (req, res) => {
    const {title, description} = req.body;
    const newQuestion = {
        id: questions.length + 1,
        title,
        description,
        answers: [],
    };

    questions.push(newQuestion);
    res.status(201).send();
})

// insert a new answer to a question
app.post('/answer/:id', checkJwt, (req, res) => {
    const {answer} = req.body;

    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();

    question[0].answers.push({
        answer,
        author: req.user.name,
    });

    res.status(201).send();
});

// start the server
app.listen(APP_PORT, () => {
    console.log(`listening on port ${APP_PORT}`);
});