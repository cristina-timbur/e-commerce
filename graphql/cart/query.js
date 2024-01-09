const { 
    GraphQLObjectType, 
    GraphQLList, 
    GraphQLID
} = require("graphql");
const { cartResultType } = require("./types");
const { 
    getCart,
    getCarts
} = require("../../handlers/carts");


const cartQuery = new GraphQLObjectType({
    name: "CartQuery",
    fields: {
        cart: {
            type: cartResultType,
            args: {
                CartId: { type: GraphQLID }
            },
            resolve: async (source, { CartId }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const UserId = context.user.id;
                const result = await getCart(UserId, CartId);
                console.log(result);
                return result;
            }
        },
        carts: {
            type: new GraphQLList(cartResultType),
            resolve: async (source, args, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const UserId = context.user.id;
                const result = await getCarts(UserId);
                return result;
            }
        }
    }
});


module.exports = cartQuery;