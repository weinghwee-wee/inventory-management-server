const { productDB, orderDB } = require('../db');

module.exports.checkAndUpdateProduct = async (products, orderId) => {
  let productIds = [];
  let oldAmount = 0;
  let orderDetails;

  products.forEach(product => {
    productIds.push(product._id);
  });

  const availableProducts = await productDB.retrieveProducts({ _id: { $in: productIds } });

  if (orderId) {
    orderDetails = await orderDB.retrieveOrders({ _id: orderId });
  }

  for (let i = 0; i < products.length; i++) {
    const { name, amount, _id } = products[i];
    const { availableStock } = availableProducts.filter((p) => p._id == _id)[0];

    if (orderId) {
      const { amount } = (orderDetails[0].items).filter((item) => item._id == _id)[0];

      oldAmount = amount;
    }

    const itemNetAmount = amount - oldAmount;

    if (typeof availableStock !== "undefined") {
      if (itemNetAmount > availableStock) {
        return `You ${orderId ? "added" : "ordered"} ${itemNetAmount} ${name} but there is only ${availableStock} left. Please change the amount!`;
      }

      const newAvailableStock = availableStock - itemNetAmount;

      await productDB.updateProduct(_id, { availableStock: newAvailableStock });
    }
  }

  return null;
};
