const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const { getUserReviewsWithId, getProductReviews, getProductReviewsWithId } = require("../../handlers/reviews");
const { reviewType } = require("./types");

const reviewQuery = new GraphQLObjectType({
	name: 'ReviewQuery',
	fields: {
		reviews: {
			type: new GraphQLList(reviewType),
			resolve: async (source, args, context) => {
				if(!context.user) return null;
				return getProductReviews();
			}
		},
		// current user
		userReviews: {
			type: new GraphQLList(reviewType),
			resolve: async (source, args, context) => {
				if(!context.user) return null;
				return getUserReviewsWithId(context.user.id);
			}
		},
		reviewsWithUserId: {
			type: new GraphQLList(reviewType),
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: async (source, { id }, context) => {
				if(!context.user) return null;
				return getUserReviewsWithId(id);
			}
		},
		reviewsWithProductId: {
			type: new GraphQLList(reviewType),
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: async (source, { id }, context) => {
				if(!context.user) return null;
				return getProductReviewsWithId(id);
			}
		}
	}
});

module.exports = reviewQuery;