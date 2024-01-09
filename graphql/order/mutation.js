const { 
    GraphQLObjectType,
    GraphQLID, 
    GraphQLString
} = require("graphql");
const { orderResultType } = require("./types");
const {
    createOrder,
    removeOrder
} = require("../../handlers/orders");


const orderMutation = new GraphQLObjectType({
    name: "OrderMutation",
    fields: {
        createOrder: {
            type: orderResultType,
            args: {
                PaymentId: { type: GraphQLID },
                CartId: { type: GraphQLID },
                status: { type: GraphQLString }
            },
            resolve: async (source, { PaymentId, CartId, status }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const UserId = context.user.id;
                const result = await createOrder(UserId, PaymentId, CartId, status);
                return result;
            }
        },
        removeOrder: {
            type: orderResultType,
            args: {
                OrderId: { type: GraphQLID }
            },
            resolve: async (source, { OrderId }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const UserId = context.user.id;
                const result = await removeOrder(UserId, OrderId);
                return result;
            }
        }
    }
});


module.exports = orderMutation;