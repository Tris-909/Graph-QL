//! Set up a graphQL Server using NodeJS and Express for me ?
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));

app.listen(5000, () => {
    console.log('SERVER IS RUNNING ON PORT 5000');
});