const graphql = require('graphql');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
} = graphql;

const mongoose = require('mongoose');
const PlaylistModel = mongoose.model('playlist');
const MusicModel = mongoose.model('music');
const MusicType = require('../types/musicType');

module.exports = {
    addMusic: {
        type: MusicType,
        args: {
            name: { type: GraphQLString },
            url: { type: GraphQLString },
            wrongAnswers: { type: new GraphQLList(GraphQLString) },
        },
        resolve: (parent, args) => {
            if (!args.name) return;

            return new MusicModel(
                args
            ).save();
        },
    },
    updateMusic: {
        type: MusicType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            url: { type: GraphQLString },
            wrongAnswers: { type: new GraphQLList(GraphQLString) },
        },
        resolve: (parent, args) => {
            if (!args.id) return;

            let id = args.id;
            delete args.id;

            return MusicModel
                .findByIdAndUpdate(
                    id,
                    { $set: args },
                    { new: true },
                ).exec();
        },
    },
    deleteMusic: {
        type: MusicType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            url: { type: GraphQLString },
        },
        resolve: (parent, args) => {
            if (!args.id) return;

            let id = args.id;

            return MusicModel
                .findByIdAndDelete(
                    id,
                ).exec();
        },
    },
};
