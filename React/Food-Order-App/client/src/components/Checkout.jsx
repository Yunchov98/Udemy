import { useContext } from 'react';

import { calculateTotal } from '../util/cartTotal';
import { currencyForamtter } from '../util/foramtting';
import CartContext from '../store/cartContext';
import UserProgressContext from '../store/userProgressContext';

import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';

export default function Checkout() {
    const { items } = useContext(CartContext);
    const { progress, hideCheckout } = useContext(UserProgressContext);

    const cartTotal = calculateTotal(items);

    function handleClose() {
        hideCheckout();
    }

    return (
        <Modal open={progress === 'checkout'} onClose={handleClose}>
            <form>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyForamtter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="full-name" />
                <Input label="Email Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose}>
                        Close
                    </Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
}
