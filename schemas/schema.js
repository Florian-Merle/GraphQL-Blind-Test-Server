const graphql = require('graphql');
const mongoose = require('mongoose');
const {
    GraphQLSchema,
    GraphQLObjectType,
} = graphql;

/**
 * QUERY
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
 * MUTIATION
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
