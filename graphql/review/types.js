const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLUnionType,
} = require("graphql");
const { productType } = require("../product/types");
const { userType } = require("../user/types");
const { messageResultType } = require("../types");
const db = require("../../models");

const reviewType = new GraphQLObjectType({
  name: "ReviewType",
  fields: {
    comment: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    user: {
      type: userType,
      resolve: async (source) => {
        return await source.getUser();
      },
    },
    product: {
      type: productType,
      resolve: async (source) => {
        return await source.getProduct();
      },
    },
  },
});

const reviewResultType = new GraphQLUnionType({
  name: "ReviewResult",
  types: [reviewType, messageResultType],
  resolveType: (value) => {
    if (value instanceof db.Review) {
      return "ReviewType";
    }

    return "MessageResult";
  },
});

module.exports = { reviewType, reviewResultType };
