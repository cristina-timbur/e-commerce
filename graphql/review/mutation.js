const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
  GraphQLString,
} = require("graphql");
const {
  createProductReview,
  removeReviewHandler,
  editProductReview,
} = require("../../handlers/reviews");
const { reviewResultType } = require("./types");

const reviewMutation = new GraphQLObjectType({
  name: "ReviewMutation",
  fields: {
    // logged user
    review: {
      type: reviewResultType,
      args: {
        UserId: { type: GraphQLID },
        ProductId: { type: new GraphQLNonNull(GraphQLID) },
        rating: { type: GraphQLFloat },
        comment: { type: GraphQLString },
      },
      resolve: async (source, { UserId, ProductId, rating, comment }, context) => {
        if (!context.user)
          return {
            message: "You have to be authenticated to access this resource!",
          };

        if (!UserId) {
          UserId = context.user.id;
        }
        const result = await createProductReview(UserId, ProductId, rating, comment);
        return result;
      },
    },

    editReview: {
      type: reviewResultType,
      args: {
        UserId: { type: GraphQLID },
        ProductId: { type: new GraphQLNonNull(GraphQLID) },
        comment: { type: GraphQLString },
        rating: { type: GraphQLFloat },
      },
      resolve: async (source, { UserId, ProductId, comment, rating }, context) => {
        if (!context.user)
          return {
            message: "You have to be authenticated to access this resource!",
          };

        if (!UserId) {
          UserId = context.user.id;
        }
        const result = await editProductReview(UserId, ProductId, comment, rating);

        return result;
      },
    },

    removeReview: {
      type: reviewResultType,
      args: {
        UserId: { type: GraphQLID },
        ProductId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, { UserId, ProductId }, context) => {
        if (!context.user)
          return {
            message: "You have to be authenticated to access this resource!",
          };

        if (!UserId) {
          UserId = context.user.id;
        }
        const result = await removeReviewHandler(UserId, ProductId);
        return result;
      },
    },
  },
});

module.exports = reviewMutation;
