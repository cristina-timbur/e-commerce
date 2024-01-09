const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLInt
} = require("graphql");
const { cartResultType } = require("./types");
const { 
    createCart, 
    addProductToCart,
    removeCart,
    removeProductFromCart,
    updateProductQuantityInCart
} = require("../../handlers/carts");


const cartMutation = new GraphQLObjectType({
    name: "CartMutation",
    fields: {
        createCart: {
            type: cartResultType,
            args: {
                UserId: { type: GraphQLID }
            },
            resolve: async (source, { UserId }, context) => {
                if (!context.user){
                    return {
                        message: "You have to be authenticated to access this resource!",
                    };
                }
                if (!UserId) {
                    UserId = context.user.id;
                }
                const result = await createCart(UserId);
                return result;
            }
        },
        addProductToCart: {
            type: cartResultType,
            args: {
                CartId: { type: GraphQLID },
                ProductId: { type: GraphQLID},
                quantity: { type: GraphQLInt }
            },
            resolve: async (source, { CartId, ProductId, quantity }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const UserId = context.user.id;
                const result = await addProductToCart(UserId, CartId, ProductId, quantity);
                return result;
            }
        },
        removeProductFromCart: {
            type: cartResultType,
            args: {
                CartId: { type: GraphQLID },
                ProductId: { type: GraphQLID},
            },
            resolve: async (source, { CartId, ProductId }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const UserId = context.user.id;
                const result = await removeProductFromCart(UserId, CartId, ProductId);
                return result;
            }
        },
        updateProductQuantityInCart: {
            type: cartResultType,
            args: {
                CartId: { type: GraphQLID },
                ProductId: { type: GraphQLID},
                quantity: { type: GraphQLInt }
            },
            resolve: async (source, { CartId, ProductId, quantity }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const UserId = context.user.id;
                const result = await updateProductQuantityInCart(UserId, CartId, ProductId, quantity);
                return result;
            }
        },
        removeCart: {
            type: cartResultType,
            args: {
                CartId: { type: GraphQLID }
            },
            resolve: async (source, { CartId }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const UserId = context.user.id;
                const result = await removeCart(UserId, CartId);
                return result;
            }
        },
    }
});


module.exports = cartMutation;