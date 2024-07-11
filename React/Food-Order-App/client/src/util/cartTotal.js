export const calculateTotal = (items) => {
    return items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);
};
