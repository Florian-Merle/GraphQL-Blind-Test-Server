const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
} = graphql;

const MusicType = new GraphQLObjectType({
    name: 'Music',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        url: { type: GraphQLString },
    })
});

module.exports = MusicType;
