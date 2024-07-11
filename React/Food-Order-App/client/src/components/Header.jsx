import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/cartContext';
import UserProgressContext from '../store/userProgressContext';

export default function Header() {
    const { items } = useContext(CartContext);
    const { showCart } = useContext(UserProgressContext);

    const totalCartItems = items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Logo image" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    );
}
