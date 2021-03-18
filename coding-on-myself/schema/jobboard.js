const graphql = require('graphql');
const JobItem = require('../models/JobItem');
const User = require('../models/User');

const JobItemType = new graphql.GraphQLObjectType({
    name: 'JobItemType',
    description: "JobItem Model",
    fields: {
        id: { type: graphql.GraphQLID },
        userId: { type: graphql.GraphQLID },
        currentNumber: { type: graphql.GraphQLInt },
        title: { type: graphql.GraphQLString },
        companyName: { type: graphql.GraphQLString },
        interview: { type: graphql.GraphQLBoolean },
        offer: { type: graphql.GraphQLBoolean },
        details: { type: graphql.GraphQLString },
        jobLink: { type: graphql.GraphQLString }
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
            async resolve(parent, args) {
                const JobItems = await JobItem.find({
                    userId: parent.id 
                });
                return JobItems
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
            async resolve(parent, args) {
                const user = await User.findById(args.id);
                return user;
            }
        },
        Users: {
            type: graphql.GraphQLList(UserType),
            async resolve(parent, args) {
                const users = await User.find();
                return users;
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
                userId: {type: graphql.GraphQLID},
                currentNumber: {type: graphql.GraphQLInt},
                title: {type: graphql.GraphQLString},
                companyName: {type: graphql.GraphQLString},
                interview: {type: graphql.GraphQLBoolean},
                offer: {type: graphql.GraphQLBoolean},
                details: {type: graphql.GraphQLString},
                jobLink: {type: graphql.GraphQLString}
            },
            async resolve(parent, args) {
                let newJobItem = await new JobItem({
                    userId: args.userId,
                    currentNumber: args.currentNumber,
                    title: args.title,
                    companyName: args.companyName,
                    interview: args.interview,
                    offer: args.offer,
                    details: args.details,
                    jobLink: args.jobLink
                });

                await newJobItem.save();
                return newJobItem;
            }
        },

        updateAJobItem: {
            type: JobItemType,
            args: {
                id: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
                currentNumber: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
                title: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
                companyName: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
                interview: {type: graphql.GraphQLNonNull(graphql.GraphQLBoolean)},
                offer: {type: graphql.GraphQLNonNull(graphql.GraphQLBoolean)},
                details: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
                jobLink: {type: graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve(parent, args) {
                const updatedJobItem = JobItem.findByIdAndUpdate(args.id, {
                    currentNumber: args.currentNumber,
                    title: args.title,
                    companyName: args.companyName,
                    interview: args.interview,
                    offer: args.offer,
                    details: args.details,
                    jobLink: args.jobLink
                }, {new: true});

                return updatedJobItem;
            }
        },

        deleteAJobItem: {
            type: JobItemType,
            args: {
                id: {type: graphql.GraphQLNonNull(graphql.GraphQLID)}
            },
            resolve(parent, args) {
                const deletedJobItem =  JobItem.findByIdAndDelete(args.id);
                return deletedJobItem;
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});