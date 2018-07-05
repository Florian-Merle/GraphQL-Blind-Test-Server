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

            return new PlaylistModel(
                args
            ).save();
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

            let id = args.id;
            delete args.id;

            return PlaylistModel
                .findByIdAndUpdate(
                    id,
                    { $set: args },
                    { new: true },
                ).exec();
        },
    },
    deletePlaylist: {
        type: PlaylistType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            url: { type: GraphQLString },
        },
        resolve: (parent, args) => {
            if (!args.id) return;

            let id = args.id;

            return PlaylistModel
                .findByIdAndDelete(
                    id,
                ).exec();
        },
    },
    addMusicToPlaylist: {
        type: PlaylistType,
        args: {
            idPlaylist: { type: GraphQLID },
            idMusic: { type: GraphQLID },
        },
        resolve: (parent, args) => {
            if (!args.idPlaylist || !args.idMusic) return;

            return PlaylistModel.findById(args.idPlaylist)
                .then(playlist => {
                    if (!playlist) return;

                    return playlist.addMusic(
                        args.idMusic
                    ).save();
                });
           },
    },
    removeMusicFromPlaylist: {
        type: PlaylistType,
        args: {
            idPlaylist: { type: GraphQLID },
            idMusic: { type: GraphQLID },
        },
        resolve: (parent, args) => {
            if (!args.idPlaylist || !args.idMusic) return;

            return PlaylistModel.findById(args.idPlaylist)
                .then(playlist => {
                    if (!playlist) return;

                    return playlist.removeMusic(
                        args.idMusic
                    ).save();
                });
           },
    },
};
