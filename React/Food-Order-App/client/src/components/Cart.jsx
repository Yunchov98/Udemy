import { useContext } from 'react';

import { currencyForamtter } from '../util/foramtting';
import CartContext from '../store/cartContext';

import Modal from './UI/Modal';
import Button from './UI/Button';
import UserProgressContext from '../store/userProgressContext';
import CartItem from './CartItem';

export default function Cart() {
    const { items, addItem, removeItem } = useContext(CartContext);
    const { progress, hideCart } = useContext(UserProgressContext);

    const cartTotal = items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function handleCloseCart() {
        hideCart();
    }

    return (
        <Modal className="cart" open={progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onIncrease={() => addItem(item)}
                        onDecrease={() => removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyForamtter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>
                    Close
                </Button>
                {items.length > 0 && <Button>Go Checkout</Button>}
            </p>
        </Modal>
    );
}
