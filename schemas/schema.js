const graphql = require('graphql');
const mongoose = require('mongoose');
const {
    GraphQLSchema,
    GraphQLObjectType,
} = graphql;

/**
 * QUERIES
 */
const Query = new GraphQLObjectType({
    name: 'QueryType',
    fields: () => (
        Object.assign(
            require('./queries/playlistQueries'),
            require('./queries/musicQueries'),
        )
    ),
});

/**
 * MUTATIONS
 */
const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: () => (
        Object.assign(
            require('./mutations/playlistMutations'),
            require('./mutations/musicMutations'),
        )
    ),
});

 /**
  * EXPORTS
  */
module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
