const graphql = require('graphql');

const Person = new graphql.GraphQLObjectType({
    name: 'Person',
    description: 'Description',
    fields: () => ({
        id: {type: graphql.GraphQLID},
        name: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        age: {type: graphql.GraphQLInt},
        isMarried: {type: graphql.GraphQLBoolean},
        gpa: {type: graphql.GraphQLFloat},
        JustAType: {
            type: Person,
            resolve(parent, args) {
                return parent;
            }
        }
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        person: {
            type: Person,
            resolve(parent, args) {
                let person = {
                    id: 'abc',
                    name: null,
                    age: 21,
                    isMarried: false,
                    gpa: 0.0
                }

                return person;
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
});