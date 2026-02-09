import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../assets/styles/Sales.css";

export default function Sales() {
    const { addToCart } = useCart();
    const [category, setCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Categories tailored to User Request: Normal, Gaming, Office
    const categories = ["All", "Normal Laptops", "Gaming Laptops", "Office Laptops"];

    const products = [
        // Gaming Laptops
        {
            id: 1,
            name: "Predator Helios Neo",
            category: "Gaming Laptops",
            price: 2199,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
            specs: "RTX 4080 · i9-13900HX · 64GB RAM · 2TB SSD",
            description: "Dominate the competition with raw power. Featuring advanced cooling and the latest RTX graphics.",
            features: ["NVIDIA RTX 4080 16GB", "240Hz QHD+ Display", "RGB Mechanical Keypad", "Liquid Metal Cooling"]
        },
        {
            id: 2,
            name: "Razer Blade 14",
            category: "Gaming Laptops",
            price: 2399,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
            specs: "Ryzen 9 7940HS · RTX 4070 · 1TB SSD",
            description: "The world's most portable gaming laptop. Incredible performance in a 14-inch form factor.",
            features: ["AMD Ryzen 9", "RTX 4070", "QHD 240Hz", "Vapor Chamber Cooling"]
        },
        {
            id: 3,
            name: "Alienware X16",
            category: "Gaming Laptops",
            price: 2899,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80",
            specs: "i9-13900HK · RTX 4090 · 64GB RAM",
            description: "A masterclass in gaming engineering. The most powerful 16-inch gaming laptop we've ever built.",
            features: ["Cherry MX Keyboard", "Element 31 Cooling", "Dolby Atmos", "Lunar Light Chassis"]
        },

        // Office Laptops (Business/Pro)
        {
            id: 4,
            name: "Zenith X1 Carbon",
            category: "Office Laptops",
            price: 1499,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
            specs: "i7-1360P · 32GB RAM · 1TB SSD · 4K OLED",
            description: "The ultimate business companion. Ultra-lightweight carbon fiber chassis meets desktop-class performance.",
            features: ["Carbon Fiber Build", "14-inch 4K OLED Touch", "Thunderbolt 4", "All-day Battery"]
        },
        {
            id: 5,
            name: "MacBook Air 15",
            category: "Office Laptops",
            price: 1299,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
            specs: "M3 Chip · 16GB Unified · 512GB SSD",
            description: "Impressively big. Impossibly thin. The 15-inch MacBook Air makes room for more of what you love.",
            features: ["M3 Chip", "Liquid Retina Display", "18 Hours Battery", "Silent Fanless Design"]
        },
        {
            id: 6,
            name: "Laptop Product",
            category: "Office Laptops",
            price: 999,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
            specs: "i5-1235U · 8GB RAM · 256GB SSD",
            description: "Sleek and stylish. Multitasking speed powered by 12th Gen Intel Core processors.",
            features: ["PixelSense Touchscreen", "Alcantara Keyboard", "Windows Hello", "Dolby Vision"]
        },

        // Normal Laptops (Student/Everyday)
        {
            id: 7,
            name: "Aspire 5 Slim",
            category: "Normal Laptops",
            price: 549,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
            specs: "i5-1135G7 · 8GB RAM · 512GB SSD",
            description: "Powerful and portable. The Aspire 5 delivers on every aspect of everyday computing.",
            features: ["15.6\" Full HD IPS", "Narrow Bezels", "Wi-Fi 6", "Fingerprint Reader"]
        },
        {
            id: 8,
            name: "IdeaPad Flex 5",
            category: "Normal Laptops",
            price: 649,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
            specs: "Ryzen 5 5500U · 16GB RAM · 512GB SSD",
            description: "Adaptable to what you do. Features a 360-degree hinge that lets you use it as a laptop or tablet.",
            features: ["2-in-1 Design", "Touchscreen", "Backlit Keyboard", "Rapid Charge"]
        },
        {
            id: 9,
            name: "Pavilion 15",
            category: "Normal Laptops",
            price: 599,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
            specs: "i5-1235U · 12GB RAM · 512GB SSD",
            description: "Compact PC that fits seamlessly into your life. Bang & Olufsen audio for immersive sound.",
            features: ["Micro-edge Display", "B&O Audio", "HP Fast Charge", "Compact Design"]
        }
    ];

    const filteredProducts = category === "All"
        ? products
        : products.filter(p => p.category === category);

    return (
        <main className="sales-page">
            {/* Background elements */}
            <div className="bg-gradient"></div>
            <div className="bg-grid"></div>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <span className="badge">Premium Collection</span>
                    <h1 className="hero-title">Find Your Perfect <span className="gradient-text">Laptop</span></h1>
                    <p className="hero-subtitle">From high-performance gaming rigs to sleek office ultrabooks and reliable everyday laptops.</p>
                    <button className="hero-btn" onClick={() => document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' })}>
                        View All Laptops
                    </button>
                </div>
                {/* Hero Image Removed as per User Request */}
            </section>

            {/* Filter Section */}
            <section className="filter-section">
                <div className="categories-wrapper">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`category-btn ${category === cat ? "active" : ""}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Product Grid */}
            <section id="products-grid" className="grid-section">
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => setSelectedProduct(product)}
                        >
                            <div className="card-image-wrapper">
                                <img src={product.image} alt={product.name} className="card-image" />
                                <div className="card-overlay">
                                    <button className="quick-view-btn">Quick View</button>
                                </div>
                            </div>
                            <div className="card-content">
                                <div className="card-header">
                                    <span className="card-category">{product.category}</span>
                                    <div className="rating">★ {product.rating}</div>
                                </div>
                                <h3 className="card-title">{product.name}</h3>
                                <p className="card-specs">{product.specs}</p>
                                <div className="card-footer">
                                    <span className="price">${product.price}</span>
                                    <button
                                        className="add-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Product Modal */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setSelectedProduct(null)}>✕</button>

                        <div className="modal-grid">
                            <div className="modal-img-col">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-img" />
                            </div>
                            <div className="modal-info-col">
                                <span className="modal-category-badge">{selectedProduct.category}</span>
                                <h2 className="modalTitle">{selectedProduct.name}</h2>
                                <p className="modal-specs">{selectedProduct.specs}</p>
                                <div className="modal-price-row">
                                    <span className="modal-price">${selectedProduct.price}</span>
                                    <div className="modal-rating">★★★★★ {selectedProduct.rating}</div>
                                </div>
                                <p className="modal-desc">{selectedProduct.description}</p>

                                <div className="features-list">
                                    {selectedProduct.features.map((feat, i) => (
                                        <div key={i} className="feature-item">✓ {feat}</div>
                                    ))}
                                </div>

                                <div className="modal-actions">
                                    <button
                                        className="modal-add-btn"
                                        onClick={() => {
                                            addToCart(selectedProduct);
                                            setSelectedProduct(null);
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                    <button className="modal-buy-btn">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
