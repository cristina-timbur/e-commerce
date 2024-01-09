const db = require("../models");


const createOrder =  async (UserId, PaymentId, CartId, status) => {
    try {
        const cart = await db.Cart.findOne({
            where: {
                UserId: UserId,
                id: CartId 
            }
        });
        if (!cart) {
            return { message: `Invalid cart or user` };
        }
        const newOrder = await db.Order.create({ UserId: UserId, PaymentId: PaymentId, status: status });
        const cartItems = await db.Cart_Items.findAll({ where: { CartId: CartId } });
        await Promise.all(cartItems.map(async (cartItem) => {
            const newOrderItem = {
                OrderId: newOrder.id,
                ProductId: cartItem.ProductId,
                quantity: cartItem.quantity, 
                price: cartItem.price
            };
            await db.Order_Items.create(newOrderItem);
        }));
        return newOrder;
    } catch (err) {
        console.error("Error at handlers/createOrder", err);
        return { message: err.message };
    }
};


const removeOrder = async (UserId, OrderId) => {
    try {
        const order = await db.Order.findOne({
            where: {
                UserId: UserId,
                id: OrderId 
            }
        });
        if (!order) {
            return { message: `Invalid order or user` };
        }
        await db.Order.destroy({ where: { id: OrderId } });
        return { message: "The order was removed successfully!" };
    } catch (err) {
        console.error("Error at handlers/removeOrder", err);
        return { message: err.message };
    }
}


const getOrder = async (UserId, OrderId) => {
    try {
        const order = await db.Order.findOne({ where: { UserId: UserId, id: OrderId } });
        return order == null ? { message: `Order with id ${OrderId} doesn't exist` } : order;
    } catch (err) {
        console.log("Error at handlers/getOrder", err);
        return { message: err.message }
    }
}


const getOrders = async (UserId) => {
    try {
        const orders = await db.Order.findAll({where: { UserId: UserId } });
        return orders;
    } catch (err) {
        console.log("Error at handlers/getOrders", err);
        return { message: err.message }
    }
}


module.exports = {
    createOrder,
    removeOrder,
    getOrder,
    getOrders
}
