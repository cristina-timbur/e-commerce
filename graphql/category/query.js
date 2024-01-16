const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const { getCategories, getCategory } = require("../../handlers/categories");
const { categoryType, categoryResultType } = require("./types");

const categoryQuery = new GraphQLObjectType({
  name: "CategoryQuery",
  fields: {
    categories: {
      type: new GraphQLList(categoryResultType),
      resolve: async (source, args, context) => {
        if (!context.user){
          return [{ message: "You have to be authenticated to access this resource!" }];
        }
        return getCategories();
      },
    },
    category: {
      type: categoryResultType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, { id }, context) => {
        if (!context.user){
          return { message: "You have to be authenticated to access this resource!" };
        }
        return getCategory(id);
      },
    },
  },
});

module.exports = categoryQuery;
