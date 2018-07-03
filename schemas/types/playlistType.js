const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} = graphql;
const MusicType = require('./musicType');
const MusicModel = mongoose.model('music');

const PlaylistType = new GraphQLObjectType({
    name: 'Playlist',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        musics: {
            type: new GraphQLList(MusicType),
            resolve(parent, args) {
                return MusicModel.find({
                    '_id': {
                        $in: parent.musics
                    }
                }).exec();
            }
        }
    })
});

module.exports = PlaylistType;
