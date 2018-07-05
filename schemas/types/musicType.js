const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} = graphql;

const MusicType = new GraphQLObjectType({
    name: 'Music',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        url: { type: GraphQLString },
        wrongAnswers: { type: new GraphQLList(GraphQLString) },
    })
});

module.exports = MusicType;
