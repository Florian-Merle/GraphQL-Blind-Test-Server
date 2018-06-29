const graphql = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
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
                return { id: 0, name: '80\'s Disco', genre: 'disco' };
            }
        }
    }),
});

/**
 * TODO:
 * MUTIATION
 */

 /**
  * EXPORTS
  */
module.exports = new GraphQLSchema({
    query: Query
});
