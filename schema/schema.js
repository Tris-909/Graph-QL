const graphql = require('graphql');
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
            resolve(parent, args) {
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
            resolve(parent, args) {
                const user = User.findById(parent.userId);

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

            resolve(parent, args) {
                const user = User.findById(parent.userId);

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
            resolve(parent, args) {
                const users = User.find();

                return users;
            }
        },
       
        hobby: {
            type: HobbyTypes,
            args: {
                id: {type: graphql.GraphQLID}
            },
            async resolve(parent, args) {
                const hobby = await Hobby.findById(args.id);

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
                name: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
                age: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
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
        updateUser: {
            type: UserType,
            args: {
                userId: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
                newName: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
                newAge: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
                newJob: {type: graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            async resolve(parent, args) {
                return updatedUser = User.findByIdAndUpdate(args.userId, {
                    $set: {
                        name: args.newName,
                        age: args.newAge,
                        job: args.newJob 
                    }
                }, {new: true});
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: {type: graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            async resolve(parent, args) {
                const deletedUser = await User.findByIdAndDelete(args.id);
                
                return deletedUser;
            }
        },

        createPost: {
            type: PostType,
            args: {
                comment: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
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
        updatePost: {
            type: PostType,
            args: {
                id: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
                comment: {type: graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve(parent, args) {
                return updatedPost = Post.findByIdAndUpdate(args.id, {
                    $set: {
                        comment: args.comment 
                    }
                }, {new: true});
            }
        },
        deletePost: {
            type: PostType,
            args: {
                id: {type: graphql.GraphQLNonNull(graphql.GraphQLID)}
            },
            resolve(parent, args) {
                const deletedPost = Post.findByIdAndDelete(args.id);

                if (!deletedPost) {
                    throw new Error("Can't delete this post, Try Again");
                }

                return deletedPost;
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
        },
        updateHobby: {
            type: HobbyTypes,
            args: {
                id: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
                title: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
                description: {type: graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve(parent, args) {
                return updatedHobby = Hobby.findByIdAndUpdate(args.id, {
                    $set: {
                        title: args.title,
                        description: args.description  
                    }
                }, {new: true});
            }
        },
        deleteHobby: {
            type: HobbyTypes,
            args: {
                id: {type: graphql.GraphQLNonNull(graphql.GraphQLID)}
            },
            resolve(parent, args) {
                const deletedHobby = Hobby.findByIdAndDelete(args.id);

                if (!deletedPost) {
                    throw new Error("Can't delete this Hobby, Try Again");
                }

                return deletedHobby;
            }
        },
    })
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});