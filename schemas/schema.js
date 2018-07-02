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
