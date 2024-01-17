const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");
const {
  createCategory,
  editCategory,
  destroyCategory,
} = require("../../handlers/categories");
const {
  categoryInputType,
  categoryResultType,
} = require("./types");

const categoryMutation = new GraphQLObjectType({
  name: "CategoryMutation",
  fields: {
    addCategory: {
      type: categoryResultType,
      args: {
        categoryInput: { type: categoryInputType },
      },
      resolve: async (source, args, context) => {
        if (!context.user){
          return { message: "You have to be authenticated to access this resource!" };
        }
        const data = args.categoryInput;
        const result = await createCategory(data);

        return result;
      },
    },
    editCategory: {
      type: categoryResultType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: categoryInputType },
      },
      resolve: async (source, args, context) => {
        if (!context.user){
          return { message: "You have to be authenticated to access this resource!" };
        }
        const id = args.id;
        const data = args.data;
        const result = await editCategory(id, data);

        return result;
      },
    },
    removeCategory: {
      type: categoryResultType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, args, context) => {
        if (!context.user){
          return { message: "You have to be authenticated to access this resource!" };
        }
        const result = await destroyCategory(args.id);
        return result;
      },
    },
  },
});

module.exports = categoryMutation;
