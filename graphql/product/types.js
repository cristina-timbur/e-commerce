const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLUnionType,
} = require("graphql");
const { messageResultType } = require("../types");
const db = require("../../models");
const { categoryType } = require("../category/types");

const productType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    isAvailable: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    discount: { type: GraphQLFloat },
    CategoryId: { type: GraphQLInt },
    category: {
      type: categoryType,
      resolve: async (source) => {
        return await source.getCategory();
      },
    },
    quantity: { 
      type: GraphQLInt,
    }
  },
});

const productInputType = new GraphQLInputObjectType({
  name: "ProductInputType",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    discount: { type: GraphQLFloat },
    CategoryId: { type: GraphQLInt },
  },
});

const productResultType = new GraphQLUnionType({
  name: "ProductResult",
  types: [productType, messageResultType],
  resolveType: (value) => {
    if (value instanceof db.Product) {
      return "ProductType";
    }

    return "MessageResult";
  },
});

const editProductInputType = new GraphQLInputObjectType({
  name: "EditProductInputType",
  fields: {
    id: { type: GraphQLInt },
    newProductData: { type: productInputType },
  },
});


module.exports = { productType, productInputType, productResultType, editProductInputType };
