const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} = graphql;

const PlaylistType = new GraphQLObjectType({
    name: 'Playlist',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
});

module.exports = PlaylistType;
