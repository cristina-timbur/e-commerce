const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLList
} = require("graphql");
const { orderResultType } = require("./types");
const { 
    getOrder,
    getOrders
} = require("../../handlers/orders");



const orderQuery = new GraphQLObjectType({
    name: "OrderQuery",
    fields: {
        order: {
            type: orderResultType,
            args: {
                OrderId: { type: GraphQLID }
            },
            resolve: async (source, { OrderId }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const UserId = context.user.id;
                const result = await getOrder(UserId, OrderId);
                return result;
            }
        },
        orders: {
            type: new GraphQLList(orderResultType),
            resolve: async (source, args, context) => {
                if (!context.user){
                    return [{ message: "You have to be authenticated to access this resource!" }];
                }
                const UserId = context.user.id;
                const result = await getOrders(UserId);
                return result;
            }
        }
    }
});


module.exports = orderQuery;