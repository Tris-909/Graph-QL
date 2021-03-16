# GraphQL

## How to set-up a graphqlServer

```javascript
const express = require('express');
const { graphqlHTTP } = require('graphql-express');
const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));

app.listen(5000);
```

## How to create a GraphQLObjectType : 

```javascript 
const graphql = require('graphql');

// UserType
const UserType = new graphql.GraphQLObjectType({
    name: 'UserType',
    description: 'Description for UserType',
    fields: {
        id: {type: graphql.GraphQLID},
        name: {type:  graphql.GraphQLString},
        age: {type: graphql.GraphQLInt},
        job: {type: graphql.GraphQLString}
    }
});

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {type: graphql.GraphQLID}
            },
            resolve(parent, args) {
                return DummyData.find((id) => id === args.id);
            }
        }
    }
});

// Export schema to app.js file and put it in graphQLHTTP
module.exports = new graphql.GraphQLSchema({
    query: RootQuery
});
```