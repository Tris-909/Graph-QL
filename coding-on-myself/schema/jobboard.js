const graphql = require('graphql');
const  _ = require('lodash');

const JobItemType = new graphql.GraphQLObjectType({
    name: 'JobItemType',
    description: "JobItem Model",
    fields: {
        id: {
            type: graphql.GraphQLID
        },
        userId: {
            type: graphql.GraphQLID
        },
        currentNumber: {
            type: graphql.GraphQLInt
        },
        title: {
            type: graphql.GraphQLString
        },
        companyName: {
            type: graphql.GraphQLString
        },
        interview: {
            type: graphql.GraphQLBoolean
        },
        offer: {
            type: graphql.GraphQLBoolean
        },
        offerDetails: {
            type: graphql.GraphQLString
        },
        jobLink: {
            type: graphql.GraphQLString
        }
    }
});

const UserType = new graphql.GraphQLObjectType({
    name: 'UserType',
    description: 'Model for UserType',
    fields: {
        id: {type: graphql.GraphQLID},
        username: {type: graphql.GraphQLString},
        email: {type: graphql.GraphQLString},
        jobList: {
            type: graphql.GraphQLList(JobItemType),
            args: {
                id: {type: graphql.GraphQLID}
            },
            resolve(parent, args) {
                return _.find(dataFromDataBase, {
                    userId: parent.id
                });
            }
        }
    }
})

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        User: {
            type: UserType,
            args: {
                id: { type: graphql.GraphQLID }
            },
            resolve(parent, args) {
                return _.find(dataFromDatabaseThatIdontHaveItYet, {
                    id: parent.id
                });
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
});