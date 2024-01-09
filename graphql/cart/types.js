const { 
    GraphQLUnionType, 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLList, 
    GraphQLInt
} = require("graphql");
const { userType } = require("../user/types");
const { productType } = require("../product/types");
const { messageResultType } = require("../types");
const db = require("../../models");


const cartType = new GraphQLObjectType({
    name: "CartType",
    fields: {
        id: { type: GraphQLID },
        UserId: { type: GraphQLInt }, 
        user: { 
            type: userType,
            resolve: async (source) => {
                return await source.getUser();
            }, 
        },
        cartItems: { 
            type: new GraphQLList(productType),
            resolve: async (source) => {
                const cartItems = await source.getCart_Items();
                const products = await Promise.all(cartItems.map(async cartItem => {
                    const product = await cartItem.getProduct();
                    product.dataValues.price = cartItem.price;
                    product.dataValues.quantity = cartItem.quantity;
                    return product;
                }));
                return products;
            }
        }
    }
});


const cartResultType = new GraphQLUnionType({
    name: "CartResult",
    types: [cartType, messageResultType],
    resolveType: (value) => value instanceof db.Cart ? "CartType" : "MessageResult"
});


module.exports = { cartType, cartResultType };