//! Set up a graphQL Server using NodeJS and Express for me ?
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');
dotenv.config();

//Connecting to mongoDB Databases using Mongoose
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_DB_PASSWORD}@graphql.oumb8.mongodb.net/test`,
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
mongoose.connection.once('open', () => {
    console.log('Connected to databases');
});


const schema = require('./schema/schema');
const newSchema = require('./schema/types-schema.js');

const cors = require('cors');

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));

app.listen(5000, () => {
    console.log('SERVER IS RUNNING ON PORT 5000');
});