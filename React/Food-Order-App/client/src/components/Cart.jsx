import { useContext } from 'react';

import { currencyForamtter } from '../util/foramtting';
import { calculateTotal } from '../util/cartTotal';
import CartContext from '../store/cartContext';

import Modal from './UI/Modal';
import Button from './UI/Button';
import UserProgressContext from '../store/userProgressContext';
import CartItem from './CartItem';

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);

    const cartTotal = calculateTotal(cartCtx.items);

    function handleCloseCart() {
        userCtx.hideCart();
    }

    function handleGoToCheckout() {
        userCtx.showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={userCtx.progress === 'cart'}
            onClose={userCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyForamtter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>
                    Close
                </Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handleGoToCheckout}>Go Checkout</Button>
                )}
            </p>
        </Modal>
    );
}
