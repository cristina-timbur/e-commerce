const {
  GraphQLObjectType,
  GraphQLInt,
} = require("graphql");
const { productInputType, productResultType, editProductInputType } = require("./types");
const {
  createProduct,
  destroyProduct,
  editProduct,
} = require("../../handlers/products");

const productMutation = new GraphQLObjectType({
  name: "productMutation",
  fields: {
    addProduct: {
      type: productResultType,
      args: {
        productInput: { type: productInputType },
      },
      resolve: async (source, args, context) => {
        const data = args.productInput;
        const result = await createProduct(data);

        return result;
      },
    },

    destroyProduct: {
      type: productResultType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (source, args, context) => {
        const result = await destroyProduct(args.id);

        return result;
      },
    },
    editProduct: {
      type: productResultType,
      args: {
        data: {
          type: editProductInputType,
        },
      },
      resolve: async (source, args, context) => {
        const id = args.data.id;
        const data = args.data.newProductData;
        const result = await editProduct(id, data);

        return result;
      },
    },
  },
});

module.exports = productMutation;
