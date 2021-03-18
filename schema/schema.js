const graphql = require('graphql');
const _ = require('lodash');
const User = require('../models/User');
const Post = require('../models/Post');
const Hobby = require('../models/Hobby');

const UserType = new graphql.GraphQLObjectType({
    name: "UserType",
    description: "Model for User Schema",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        name: {type: graphql.GraphQLString},
        age: {type: graphql.GraphQLInt},
        job: {type: graphql.GraphQLString},
        posts: {
            type: graphql.GraphQLList(PostType),
            async resolve(parent, args) {
                const postArrays = Post.find({
                    userId: parent.id
                });

                return postArrays;
            }
        },
        hobbies: {
            type: graphql.GraphQLList(HobbyTypes),
            resolve(parent, args) {
                const hobbiesArray = Hobby.find({
                    userId: parent.id 
                });

                return hobbiesArray;
            }
        }
    })
});

const HobbyTypes = new graphql.GraphQLObjectType({
    name: 'HobbyType',
    description: "Model for HobbyType",
    fields:() => ({
        id: {type: graphql.GraphQLID},
        title: {type: graphql.GraphQLString},
        description: {type: graphql.GraphQLString},
        user: {
            type: UserType,
            args: {
                userId: {type: graphql.GraphQLID}
            },
            resolve(parent, args) {
                const user = User.findById(args.userId);

                return user;
            }
        }
    })
});

const PostType = new graphql.GraphQLObjectType({
    name: "PostType",
    description: "Model for PostType",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        comment: {type: graphql.GraphQLString},
        user: {
            type: UserType,
            args: {
                userId: {type: graphql.GraphQLID}
            },
            resolve(parent, args) {
                const user = User.findById(args.userId);

                return user;
            }
        }
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQuery",
    fields: {

        user: {
            type: UserType,
            args: {
                id: {type: graphql.GraphQLID}
            },
            async resolve(parent, args) {
                const user = await User.findById(args.id);

                return user;
            }
        },
        users: {
            type: graphql.GraphQLList(UserType),
            async resolve(parent, args) {
                const users = await User.find();

                return users;
            }
        },
       
        hobby: {
            type: HobbyTypes,
            args: {
                id: {type: graphql.GraphQLID}
            },
            async resolve(parent, args) {
                const hobby = await User.find({
                    id: args.id
                });

                return hobby;
            }
        },
        hobbies: {
            type: graphql.GraphQLList(HobbyTypes),
            async resolve(parent, args) {
                const hobbies = await Hobby.find();

                return hobbies;
            }
        },


        post: {
            type: PostType,
            args: {
                id: {type: graphql.GraphQLID}
            },
            async resolve(parent, args) {
                const post = await Post.findById({
                    id: args.id
                });

                return post;
            }
        },
        posts: {
            type: graphql.GraphQLList(PostType),
            async resolve(parent, args) {
                const posts = await Post.find();

                return posts;
            }
        }
    }
});

//! Mutations
const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createUser: {
            type: UserType,
            args: {
                name: {type: graphql.GraphQLString},
                age: {type: graphql.GraphQLInt},
                job: {type: graphql.GraphQLString}
            },
            async resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    age: args.age,
                    job: args.job
                });
                const newUser = await user.save();
                return newUser;
            }
        },

        createPost: {
            type: PostType,
            args: {
                comment: {type: graphql.GraphQLString},
                userId: {type: graphql.GraphQLID}
            },
            async resolve(parent, args) {
                let post = new Post({
                    comment: args.comment,
                    userId: args.userId
                });

                const newPost = await post.save();
                return newPost;
            }
        },

        createHobby: {
            type: HobbyTypes,
            args: {
                title: {type: graphql.GraphQLString},
                description: {type: graphql.GraphQLString},
                userId: {type: graphql.GraphQLID}
            },
            async resolve(parent, args) {
                let hobby = new Hobby ({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                });
                const newHobby = await hobby.save();
                return newHobby;
            }
        }
    })
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});