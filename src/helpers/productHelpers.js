const { productDB, orderDB } = require('../db');
const _ = require('lodash')

module.exports.checkProductAvailability = async (products, orderId) => {
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
    }
  }

  return null;
};

module.exports.updateProductStock = async (items, orderId, flag) => {
  const onCreate = async () => {
    console.log('oncreate')
    for (let i = 0; i < items.length; i++) {
      const { _id, amount } = items[i]
  
      await productDB.updateProduct(_id,  { $inc: { availableStock: -amount } }) 
    }
  }
  
  const onDelete = async () => {
    console.log('ondelete')
    const { items } = await orderDB.getOrderById(orderId)
  
    for (let i = 0; i < items.length; i++) {
      const { _id, amount } = items[i]
  
      await productDB.updateProduct(_id,  { $inc: { availableStock: amount } }) 
    }
  }
  
  const onEdit = async () => {
    console.log('onedit')
    await onDelete();
    await onCreate();
  }

  switch (flag) {
    case 'create':
      await onCreate()

      break
    case 'delete':
      await onDelete()

      break
    case 'edit': 
      await onEdit()

      break
  }
}
