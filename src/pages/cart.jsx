import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    const total = getCartTotal();

    if (cartItems.length === 0) {
        return (
            <div style={styles.emptyContainer}>
                <h2 style={styles.emptyTitle}>Your Cart is Empty</h2>
                <p style={styles.emptyText}>Looks like you haven't added anything yet.</p>
                <Link to="/" style={styles.shopBtn}>Start Shopping</Link>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Your Shopping Cart</h1>

            <div style={styles.content}>
                <div style={styles.itemsList}>
                    {cartItems.map(item => (
                        <div key={item.id} style={styles.itemCard}>
                            <div style={styles.itemImageWrapper}>
                                <img src={item.image} alt={item.name} style={styles.itemImage} />
                            </div>

                            <div style={styles.itemDetails}>
                                <h3 style={styles.itemName}>{item.name}</h3>
                                <p style={styles.itemCategory}>{item.category}</p>
                                <p style={styles.itemPrice}>${item.price}</p>
                            </div>

                            <div style={styles.quantityControls}>
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    style={styles.qtyBtn}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span style={styles.qtyValue}>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    style={styles.qtyBtn}
                                >
                                    +
                                </button>
                            </div>

                            <div style={styles.itemTotal}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                style={styles.removeBtn}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div style={styles.summary}>
                    <h2 style={styles.summaryTitle}>Order Summary</h2>
                    <div style={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div style={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div style={styles.divider}></div>
                    <div style={styles.totalRow}>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button style={styles.checkoutBtn}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem', minHeight: '80vh', color: 'white' },
    title: { fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' },
    content: { display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' },
    itemsList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    itemCard: { display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px', gap: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' },
    itemImageWrapper: { width: '100px', height: '100px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', background: '#333' },
    itemImage: { width: '100%', height: '100%', objectFit: 'cover' },
    itemDetails: { flex: 1 },
    itemName: { fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.3rem' },
    itemCategory: { fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.3rem' },
    itemPrice: { fontSize: '1.1rem', color: '#60a5fa', fontWeight: 'bold' },
    quantityControls: { display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '5px', padding: '0.2rem' },
    qtyBtn: { width: '30px', height: '30px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    qtyValue: { width: '30px', textAlign: 'center', fontSize: '1rem' },
    itemTotal: { fontSize: '1.2rem', fontWeight: 'bold', width: '100px', textAlign: 'right' },
    removeBtn: { background: 'transparent', border: 'none', color: '#ef4444', fontSize: '1.2rem', cursor: 'pointer', padding: '0.5rem', marginLeft: '0.5rem' },

    summary: { background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '15px', height: 'fit-content', border: '1px solid rgba(255,255,255,0.1)' },
    summaryTitle: { fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 'bold' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#cbd5e1' },
    divider: { height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem 0' },
    totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' },
    checkoutBtn: { width: '100%', padding: '1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s' },

    emptyContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'white' },
    emptyTitle: { fontSize: '2rem', marginBottom: '1rem' },
    emptyText: { fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' },
    shopBtn: { padding: '1rem 2rem', background: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold' }
};
