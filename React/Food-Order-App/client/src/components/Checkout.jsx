import { useContext } from 'react';

import useHttp from '../hooks/useHttp';
import { calculateTotal } from '../util/cartTotal';
import { currencyForamtter } from '../util/foramtting';
import CartContext from '../store/cartContext';
import UserProgressContext from '../store/userProgressContext';

import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';
import Error from '../components/Error';

const requestConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData,
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = calculateTotal(cartCtx.items);

    function handleClose() {
        userCtx.hideCheckout();
    }

    function handleFinish() {
        userCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            })
        );
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal
                open={userCtx.progress === 'checkout'}
                onClose={handleFinish}
            >
                <h2>Success!</h2>
                <p>Your order was submitted successfully</p>
                <p>
                    We will get back to you with more details via email within
                    the next few minutes.
                </p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Ok</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={userCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyForamtter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="Email Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && (
                    <Error title="Failed to submit order" message={error} />
                )}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}
