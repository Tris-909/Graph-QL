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
        passWord: {type: graphql.GraphQLString},
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
        },
        Users: {
            type: graphql.GraphQLList(UserType),
            resolve(parent, args) {
                return UserDataFromDatabaseThatIDontHaveItRightNow;
            }
        },
        JobListOfAUser: {
            type: graphql.GraphQLList(JobItemType),
            args: {
                userId: {type: graphql.GraphQLID}
            },
            resolve(parent, args) {
                const jobList = _.find(JobListItemData, {
                    userId: args.userId
                });

                return jobList;
            }
        }
    }
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: {type: graphql.GraphQLID},
                username: {type: graphql.GraphQLString},
                email: {type: graphql.GraphQLString},
                password: {type: graphql.GraphQLString}
            },
            resolve(parent, args) {
                let user = {
                    username: args.username,
                    email: args.email,
                    password: args.password
                };

                return user;
            }
        },

        createAJobItem: {
            type: JobItemType,
            args: {
                // id: {type: graphql.GraphQLID},
                userId: {type: graphql.GraphQLID},
                currentNumber: {type: graphql.GraphQLInt},
                title: {type: graphql.GraphQLString},
                companyName: {type: graphql.GraphQLString},
                interview: {type: graphql.GraphQLBoolean},
                offer: {type: graphql.GraphQLBoolean},
                offerDetails: {type: graphql.GraphQLString},
                jobLink: {type: graphql.GraphQLString}
            },
            resolve(parent, args) {
                let newJobItem = {
                    userId: args.userId,
                    currentNumber: args.currentNumber,
                    title: args.title,
                    companyName: args.companyName,
                    interview: args.interview,
                    offer: args.offer,
                    offerDetails: args.offerDetails,
                    jobLink: args.jobLink,
                };

                return newJobItem;
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});