const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLString,
} = require("graphql");
const { paymentResultType } = require("./types");
const {
    createPayment,
    removePayment
} = require("../../handlers/payments");


const paymentMutation = new GraphQLObjectType({
    name: "PaymentMutation",
    fields: {
        createPayment: {
            type: paymentResultType,
            args: {
                amount: { type: GraphQLFloat },
                provider: { type: GraphQLString }
            },
            resolve: async (source, { amount, provider }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const result = await createPayment(amount, provider);
                return result;
            }
        },
        removePayment: {
            type: paymentResultType,
            args: {
                PaymentId: { type: GraphQLID }
            },
            resolve: async (source, { PaymentId }, context) => {
                if (!context.user){
                    return { message: "You have to be authenticated to access this resource!" };
                }
                const result = await removePayment(PaymentId);
                return result;
            }
        },
        
    }
});


module.exports = paymentMutation;