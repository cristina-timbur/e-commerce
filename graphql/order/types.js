const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLUnionType
} = require("graphql");
const { paymentType } = require("../payment/types");
const { productType } = require("../product/types");
const { userType } = require("../user/types");
const { messageResultType } = require("../types");
const { getPayment } = require("../../handlers/payments")
const db = require("../../models");


const orderType = new GraphQLObjectType({
    name: "OrderType",
    fields: {
        id: { type: GraphQLID },
        UserId: { type: GraphQLID },
        user: {
            type: userType,
            resolve: async (source) => {
                return await source.getUser();
            }
        },
        PaymentId: { type: GraphQLID },
        payment: { 
            type: paymentType,
            resolve: async (source) => {
                return getPayment(source.PaymentId);
            }
        },
        orderItems: {
            type: new GraphQLList(productType),
            resolve: async (source) => {
                const orderItems = await source.getOrder_Items();
                const products = await Promise.all(orderItems.map(async orderItem => {
                    const product = await orderItem.getProduct();
                    product.dataValues.price = orderItem.price;
                    product.dataValues.quantity = orderItem.quantity;
                    return product;
                }));
                return products;
            }
        }
    }
});


const orderResultType = new GraphQLUnionType({
    name: "OrderResult",
    types: [orderType, messageResultType],
    resolveType: (value) => value instanceof db.Order ? "OrderType" : "MessageResult"
});


module.exports = { orderType, orderResultType };