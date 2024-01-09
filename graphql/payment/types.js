const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLFloat,
    GraphQLString,
    GraphQLUnionType
} = require("graphql");
const { messageResultType } = require("../types");
const db = require("../../models");


const paymentType = new GraphQLObjectType({
    name: "PaymentType",
    fields: {
        id: { type: GraphQLID },
        amount: { type: GraphQLFloat },
        provider: { type: GraphQLString },
    }
});


const paymentResultType = new GraphQLUnionType({
    name: "PaymentResult",
    types: [paymentType, messageResultType],
    resolveType: (value) => value instanceof db.Payment ? "PaymentType" : "MessageResult"
})


module.exports = { paymentType, paymentResultType };
