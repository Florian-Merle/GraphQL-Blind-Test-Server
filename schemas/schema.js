const graphql = require('graphql');
const mongoose = require('mongoose');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
} = graphql;

const PlaylistModel = mongoose.model('playlist');

/**
 * TYPES
 */
const PlaylistType = new GraphQLObjectType({
    name: 'Playlist',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
});

/**
 * QUERY
 */
const Query = new GraphQLObjectType({
    name: 'QueryType',
    fields: () => ({
        playlist: {
            type: PlaylistType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return PlaylistModel.findById(args.id).exec();
            }
        },
        playlists: {
            type: new GraphQLList(PlaylistType),
            resolve: (parent, args) => {
                return PlaylistModel.find().exec();
            }
        },
    }),
});

/**
 * MUTIATION
 */
const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: () => ({
        addPlaylist: {
            type: PlaylistType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                if (!args.name) return;

                return new PlaylistModel({
                    name: args.name,
                    genre: args.genre,
                }).save();
            },
        },
        updatePlaylist: {
            type: PlaylistType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                if (!args.id) return;

                let data = {};
                if (args.name) {
                    data.name = args.name;
                }
                if (args.genre) {
                    data.genre = args.genre;
                }

                return PlaylistModel
                    .findByIdAndUpdate(
                        args.id,
                        { $set: { data } },
                        { new: true },
                    ).exec()
            },
        },
    }),
});

 /**
  * EXPORTS
  */
module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
