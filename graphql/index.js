const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { categoryMutation, categoryQuery } = require("./category");

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...categoryQuery.toConfig().fields,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...categoryMutation.toConfig().fields,
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
