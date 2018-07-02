const graphql = require('graphql');
const {
    GraphQLList,
    GraphQLID,
} = graphql;

const mongoose = require('mongoose');
const PlaylistModel = mongoose.model('playlist');
const PlaylistType = require('../types/playlistType');

module.exports = {
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
    }
};
