const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { categoryMutation, categoryQuery } = require("./category");
const { reviewMutation, reviewQuery } = require("./review");
const { productMutation, productQuery } = require("./product");
const { authQuery, authMutation } = require("./auth");
const { cartQuery, cartMutation } = require('./cart');


const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...categoryQuery.toConfig().fields,
    ...reviewQuery.toConfig().fields,
    ...productQuery.toConfig().fields,
    ...authQuery.toConfig().fields,
    ...cartQuery.toConfig().fields,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...categoryMutation.toConfig().fields,
    ...reviewMutation.toConfig().fields,
    ...productMutation.toConfig().fields,
    ...authMutation.toConfig().fields,
    ...cartMutation.toConfig().fields,
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
