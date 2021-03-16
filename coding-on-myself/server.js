const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/jobboard.js');
const app = express();

app.use('/jobboard', graphqlHTTP({
    graphiql: true,
    schema: schema
}));

app.listen(9000, ()  => {
    console.log('Server is running on PORT 9000');
});