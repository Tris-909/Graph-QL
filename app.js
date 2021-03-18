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
const jobboard = require('./coding-on-myself/schema/jobboard');

const cors = require('cors');

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: jobboard
}));
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
});