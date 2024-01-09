const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { categoryMutation, categoryQuery } = require("./category");
const { reviewMutation, reviewQuery } = require("./review");
const { productMutation, productQuery } = require("./product");
const { authQuery, authMutation } = require("./auth");
const { cartQuery, cartMutation } = require("./cart");
const { paymentQuery, paymentMutation } = require("./payment");
const { orderQuery, orderMutation } = require("./order");


const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...categoryQuery.toConfig().fields,
    ...reviewQuery.toConfig().fields,
    ...productQuery.toConfig().fields,
    ...authQuery.toConfig().fields,
    ...cartQuery.toConfig().fields,
    ...paymentQuery.toConfig().fields,
    ...orderQuery.toConfig().fields,
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
    ...paymentMutation.toConfig().fields,
    ...orderMutation.toConfig().fields,
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
