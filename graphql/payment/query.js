const { 
    GraphQLObjectType,
    GraphQLID, 
    GraphQLList
} = require("graphql");
const { paymentResultType } = require("./types");
const {
    getPayment,
    getPayments
} = require("../../handlers/payments");


const paymentQuery = new GraphQLObjectType({
    name: "PaymentQuery",
    fields: {
        payment: {
            type: paymentResultType,
            args: {
                PaymentId: { type: GraphQLID }
            },
            resolve: async (source, { PaymentId }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const result = await getPayment(PaymentId); 
                return result;
            }
        },
        payments: {
            type: new GraphQLList(paymentResultType),
            resolve: async (source, args, context) => {
                if (!context.user){
                    return [{ message: "You have to be authenticated to access this resource!" }];
                }
                const result = await getPayments(); 
                return result;
            }
        },
    }
});


module.exports = paymentQuery;