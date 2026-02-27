import '../assets/styles/cart.css';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/usercontext';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const total = getCartTotal();

    const handleCheckout = async () => {
        if (!user) {
            toast.error("Please login to checkout");
            navigate('/login');
            return;
        }

        try {
            // Create a request for each item in the cart
            for (const item of cartItems) {
                await axios.post('/requests', {
                    serviceType: item.name,
                    description: `Order for ${item.name} - ${item.specs || 'No specs provided'}`,
                    customerId: user.id,
                    customerName: user.name
                });
            }

            toast.success("Requests created successfully!");
            clearCart();
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error("Failed to process checkout");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty-container">
                <h2 className="cart-empty-title">Your Cart is Empty</h2>
                <p className="cart-empty-text">Looks like you haven't added anything yet.</p>
                <Link to="/" className="cart-shop-btn">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Shopping Cart</h1>

            <div className="cart-content">
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item-card">
                            <div className="cart-item-image-wrapper">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                            </div>

                            <div className="cart-item-details">
                                <h3 className="cart-item-name">{item.name}</h3>
                                <p className="cart-item-category">{item.category}</p>
                                <p className="cart-item-price">${item.price}</p>
                            </div>

                            <div className="cart-quantity-controls">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="cart-qty-btn"
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="cart-qty-value">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="cart-qty-btn"
                                >
                                    +
                                </button>
                            </div>

                            <div className="cart-item-total">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="cart-remove-btn"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2 className="cart-summary-title">Order Summary</h2>
                    <div className="cart-summary-row">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="cart-summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="cart-divider"></div>
                    <div className="cart-total-row">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button
                        className="cart-checkout-btn"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}


