const graphql = require('graphql');
const {
    GraphQLList,
    GraphQLID,
} = graphql;

const mongoose = require('mongoose');
const MusicModel = mongoose.model('music');
const PlaylistModel = mongoose.model('playlist');
const MusicType = require('../types/musicType');

module.exports = {
    music: {
        type: MusicType,
        args: { id: { type: GraphQLID } },
        resolve: (parent, args) => {
            return MusicModel.findById(args.id).exec();
        }
    },
    // musics: {
    //     type: new GraphQLList(MusicType),
    //     resolve: (parent, args) => {
    //         if (parent) {
    //             //TODO:
    //         }

    //         return PlaylistModel.find().exec();
    //     }
    // }
};
