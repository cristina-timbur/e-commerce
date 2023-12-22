const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const {
  getProduct,
  getProducts,
  getAvailableProducts,
} = require("../../handlers/products");
const { productType } = require("./types");

const productQuery = new GraphQLObjectType({
  name: "productQuery",
  fields: {
    products: {
      type: new GraphQLList(productType),
      resolve: async (source, args, context) => {
        return getProducts();
      },
    },
    availableProducts: {
      type: new GraphQLList(productType),
      resolve: async (source, args, context) => {
        if (!context.user) return null;
        return getAvailableProducts();
      },
    },
    product: {
      type: productType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (source, { id }, context) => {
        if (!context.user) return null;
        return getProduct(id);
      },
    },
  },
});

module.exports = productQuery;
