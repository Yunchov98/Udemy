import { useContext } from 'react';

import { currencyForamtter } from '../util/foramtting';
import { calculateTotal } from '../util/cartTotal';
import CartContext from '../store/cartContext';

import Modal from './UI/Modal';
import Button from './UI/Button';
import UserProgressContext from '../store/userProgressContext';
import CartItem from './CartItem';

export default function Cart() {
    const { items, addItem, removeItem } = useContext(CartContext);
    const { progress, hideCart, showCheckout } =
        useContext(UserProgressContext);

    const cartTotal = calculateTotal(items);

    function handleCloseCart() {
        hideCart();
    }

    function handleGoToCheckout() {
        showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={progress === 'cart'}
            onClose={progress === 'cart' ? handleCloseCart : null}
        >
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
                {items.length > 0 && (
                    <Button onClick={handleGoToCheckout}>Go Checkout</Button>
                )}
            </p>
        </Modal>
    );
}
