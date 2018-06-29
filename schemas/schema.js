const graphql = require('graphql');
const models = require('../models/index');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
} = graphql;

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
                return models.Playlist.findById(args.id);
            }
        },
        playlists: {
            type: new GraphQLList(PlaylistType),
            resolve: (parent, args) => {
                return models.Playlist.findAll();
            }
        },
    }),
});

/**
 * TODO:
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

                return models.Playlist
                    .build({
                        name: args.name,
                        name: args.genre,
                    })
                    .save();
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

                models.Playlist
                    .update(
                        data,
                        {
                            returning: true,
                            plain: true,
                            where: { id: args.id },
                        }
                    );

                return models.Playlist.findById(args.id);
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
