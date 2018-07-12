require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');

require('./models/db');
const schema = require('./schemas/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Graphql server listening on port 4000');
});
