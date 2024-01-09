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
const { getCartItems } = require("../../handlers/carts");


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
                return await getCartItems(source.id);
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