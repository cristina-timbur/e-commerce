const db = require("../models");


const createCart = async (userId) => {
    try {
        const newCart = await db.Cart.create({ UserId: userId });
        return newCart;
    } catch (err) {
        console.error("Error at handlers/createCart:", err);
        return { message: err.message }
    }
}


const getCartItems = async (cartId) => {
    try {
        const cartItems = await db.Cart_Items.findAll({
            where: {
                CartId: cartId
            },
            include: [{
                model: db.Product
            }]
        })
        return cartItems.map(cartItems => {
            return {
                ...cartItems.Product.dataValues,
                price: cartItems.price,
                quantity: cartItems.quantity
            }
        });
    } catch (err) {
        console.error("Error at handlers/getCartItems:", err);
        return { message: err.message }
    }
}


const addProductToCart = async (UserId, CartId, ProductId, quantity) => {
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
        const product = await db.Product.findOne({ where: { id: ProductId }});
        if (!product) {
            return { message: `Product with id ${ProductId} doesn't exist`};
        }
        const productInCart = (await db.Cart_Items.findOne({ where: { CartId: CartId, ProductId: ProductId } })) !== null;
        if(productInCart){
            return { message: `Product with id ${ProductId} is already in cart with id ${CartId}. Consider removing it, or updating its quantity` };
        }
        const price = product.price * quantity * (1 - product.discount / 100);
        await db.Cart_Items.create({ CartId: CartId, ProductId, quantity: quantity, price: price });
        const updatedCart = await db.Cart.findOne({ where: { id: CartId } });
        return updatedCart;
    } catch (err) {
        console.log("Error at handlers/addProductToCart ", err);
        return { message: err }
    }
}


const removeProductFromCart = async (UserId, CartId, ProductId) => {
    const cart = await db.Cart.findOne({
        where: {
            UserId: UserId,
            id: CartId 
        }
    });
    if (!cart) {
        return { message: `Invalid cart or user` };
    }
    const res = await db.Cart_Items.destroy({ where: { CartId: CartId, ProductId: ProductId } });
    return !res ? 
        { message: `Cart with id ${CartId} doesn't have product with id ${ProductId}.` } :
        await db.Cart.findOne({ where: { id: CartId } });
}


const updateProductQuantityInCart = async (UserId, CartId, ProductId, quantity) => {
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
        const res = quantity == 0 ? 
            await db.Cart_Items.destroy({ where: { CartId: CartId, ProductId: ProductId } }) :
            await db.Cart_Items.update({ quantity: quantity }, { where: { CartId: CartId, ProductId: ProductId } });
        return !res ? 
            { message: `Cart with id ${CartId} doesn't have product with id ${ProductId}.` } :
            await db.Cart.findOne({ where: { id: CartId } });
    } catch (err) {
        console.log("Error at handlers/addProductToCart", err);
        return { message: err }
    }
}


const removeCart = async (UserId, CartId) => {
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
        await db.Cart.destroy({ where: { id: CartId } });
        return { message: "The cart was removed successfully!" }; 
    } catch (err) {
        console.log("Error at handlers/removeCart", err);
        return { message: err }
    }
}


const getCart = async (UserId, CartId) => {
    try {
        const cart = await db.Cart.findOne({ where: { UserId: UserId, id: CartId } });
        return cart == null ? { message: `Cart with id ${CartId} doesn't exist` } : cart;
    } catch (err) {
        console.log("Error at handlers/getCart", err);
        return { message: err }
    }
}


const getCarts = async (UserId) => {
    try {
        const carts = await db.Cart.findAll({where: { UserId: UserId } });
        return carts;
    } catch (err) {
        console.log("Error at handlers/getCarts", err);
        return { message: err }
    }
}


module.exports = {
    createCart,
    getCartItems,
    addProductToCart,
    removeCart,
    removeProductFromCart,
    updateProductQuantityInCart,
    getCart,
    getCarts
};

