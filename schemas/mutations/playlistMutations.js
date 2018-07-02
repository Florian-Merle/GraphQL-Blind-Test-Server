const graphql = require('graphql');
const {
    GraphQLID,
    GraphQLString,
} = graphql;

const mongoose = require('mongoose');
const PlaylistModel = mongoose.model('playlist');
const PlaylistType = require('../types/playlistType');

module.exports = {
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
};
