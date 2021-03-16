const graphql = require('graphql');
const _ = require('lodash');

//Dummy Data
let userData = [
    {id: '1', name: 'Tri', age: 21, job: "Software Engineer"},
    {id: '2', name: 'Fisher', age: 24, job: "Fishing Man"},
    {id: '3', name: 'Jack', age: 34, job: "Lead Developer"},
    {id: '4', name: 'Mona', age: 16, job: "Magician"},
    {id: '5', name: 'Kila', age: 25, job: "Unemployed"}
];
let hobbyData = [
    {id: '1', title: 'Playing VideoGame', description: "Playing on video games", userId: '1'},
    {id: '2', title: 'Watching NetFlix', description: "See TV Movies", userId: '5'},
    {id: '3', title: 'Playing Cards', description: "Playing Cards with friends", userId: '4'},
    {id: '4', title: 'Go out to eat', description: "Eating with friends", userId: '2'},
    {id: '5', title: 'Listen to music', description: "Listening for free music on youtube", userId: '3'}
];
let postData = [
    {id: '1', comment: 'Comment 1', userId: '1'},
    {id: '2', comment: 'Comment 2', userId: '2'},
    {id: '3', comment: 'Comment 3', userId: '3'},
    {id: '4', comment: 'Comment 4', userId: '4'},
    {id: '5', comment: 'Comment 5', userId: '5'}
];

const UserType = new graphql.GraphQLObjectType({
    name: "UserType",
    description: "Model for User Schema",
    fields: {
        id: {type: graphql.GraphQLID},
        name: {type: graphql.GraphQLString},
        age: {type: graphql.GraphQLInt},
        job: {type: graphql.GraphQLString}
    }    
});

const HobbyTypes = new graphql.GraphQLObjectType({
    name: 'HobbyType',
    description: "Model for HobbyType",
    fields: {
        id: {type: graphql.GraphQLID},
        title: {type: graphql.GraphQLString},
        description: {type: graphql.GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {
                    id: parent.userId
                });
            }
        }
    }
});

const PostType = new graphql.GraphQLObjectType({
    name: "PostType",
    description: "Model for PostType",
    fields: {
        id: {type: graphql.GraphQLID},
        comment: {type: graphql.GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, { id: parent.userId })
            }
        }
    }
});

const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        user: {
            type: UserType,
            args: {
                id: {type: graphql.GraphQLID}
            },
            resolve(parent, args) {
                return _.find(userData, {
                    id: args.id
                });
            }
        },
        hobby: {
            type: HobbyTypes,
            args: {
                id: {type: graphql.GraphQLID}
            },
            resolve(parent, args) {
                 return _.find(hobbyData, {
                     id: args.id
                 });
            }
        },
        post: {
            type: PostType,
            args: {
                id: {type: graphql.GraphQLID}
            },
            resolve(parent, args) {
                return _.find(postData, {
                    id: args.id
                });
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
});