const db = require("../models");


const createPayment = async (amount, provider) => {
    try {
        const newPayment = db.Payment.create({ amount, provider });
        return newPayment;
    } catch (err) {
        console.error("Error at handlers/createPayment:", err);
        return { message: err.message };
    }
};


const removePayment = async (PaymentId) => {
    try {
        const res = await db.Payment.destroy({ where: { id: PaymentId } });
        return res ? 
            { message: `Payment with id ${PaymentId} was removed successfully!` } :
            { message:  `There is no payment with id ${PaymentId}` }; 
    } catch (err) {
        console.error("Error at handlers/removePayment:", err);
        return { message: err.message };
    }
};


const getPayment = async (PaymentId) => { 
    try {
        const payment = await db.Payment.findOne({ 
            attributes: ["id", "amount", "provider"],
            where: { id: PaymentId } 
        });
        return payment == null ? { message: `Payment with id ${PaymentId} doesn't exist` } : payment;
    } catch (err) {
        console.log("Error at handlers/getPayment", err);
        return { message: err.message }
    }
};


const getPayments = async () => {
    try {
        const payments = await db.Payment.findAll({ attributes: ["id", "amount", "provider"] });
        return payments;
    } catch (err) {
        console.log("Error at handlers/getPayments", err);
        return { message: err.message }
    }
}



module.exports = {
    createPayment,
    removePayment,
    getPayment,
    getPayments
};