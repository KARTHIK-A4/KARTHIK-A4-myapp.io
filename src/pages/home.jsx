import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { addToCart } = useCart();
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const categories = ["All", "Laptops", "Desktops", "Accessories", "Services"];

  const products = [
    {
      id: 1,
      name: "ProBook Ultra 15",
      category: "Laptops",
      price: 1299,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&q=80",
      specs: "Intel i7 13th Gen, 16GB RAM, 512GB SSD",
      description: "Professional laptop with powerful performance for work and creativity",
      features: ["13th Gen Intel Core i7", "16GB DDR5 RAM", "512GB NVMe SSD", "15.6 inch FHD Display"]
    },
    {
      id: 2,
      name: "Gaming Desktop Pro",
      category: "Desktops",
      price: 1899,
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=400&fit=crop&q=80",
      specs: "AMD Ryzen 9, 32GB RAM, RTX 4080",
      description: "Ultimate gaming desktop with cutting-edge graphics and performance",
      features: ["AMD Ryzen 9 7900X", "32GB DDR5 RAM", "NVIDIA RTX 4080", "2TB NVMe SSD"]
    },
    {
      id: 3,
      name: "Wireless Mouse X1",
      category: "Accessories",
      price: 49,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop&q=80",
      specs: "Ergonomic, 6 Buttons, RGB Lighting",
      description: "Premium wireless mouse with ergonomic design and customizable RGB",
      features: ["2.4GHz Wireless", "6 Programmable Buttons", "RGB Lighting", "1000 DPI"]
    },
    {
      id: 4,
      name: "ThinkStation X15",
      category: "Laptops",
      price: 1599,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=400&fit=crop&q=80",
      specs: "Intel i9 14th Gen, 32GB RAM, 1TB SSD",
      description: "High-performance business laptop for demanding professionals",
      features: ["14th Gen Intel Core i9", "32GB DDR5 RAM", "1TB NVMe SSD", "16 inch 4K Display"]
    },
    {
      id: 5,
      name: "UltraSlim 13",
      category: "Laptops",
      price: 999,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop&q=80",
      specs: "Intel i5 12th Gen, 8GB RAM, 256GB SSD",
      description: "Lightweight and portable laptop perfect for students and travelers",
      features: ["12th Gen Intel Core i5", "8GB RAM", "256GB SSD", "13.3 inch FHD Display"]
    },
    {
      id: 6,
      name: "Creator Pro 17",
      category: "Laptops",
      price: 2299,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=400&fit=crop&q=80",
      specs: "Intel i9, 64GB RAM, RTX 4070, 2TB SSD",
      description: "Professional workstation laptop for content creators and designers",
      features: ["Intel Core i9", "64GB DDR5 RAM", "NVIDIA RTX 4070", "17.3 inch 4K OLED"]
    },
    {
      id: 7,
      name: "Workstation Elite",
      category: "Desktops",
      price: 2499,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=400&fit=crop&q=80",
      specs: "Intel Xeon, 64GB RAM, RTX A4000",
      description: "Professional workstation for 3D rendering and video editing",
      features: ["Intel Xeon W-2245", "64GB ECC RAM", "NVIDIA RTX A4000", "4TB NVMe Storage"]
    },
    {
      id: 8,
      name: "Compact Office PC",
      category: "Desktops",
      price: 699,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&h=400&fit=crop&q=80",
      specs: "Intel i5, 16GB RAM, 512GB SSD",
      description: "Space-saving desktop perfect for office work and everyday computing",
      features: ["Intel Core i5", "16GB RAM", "512GB SSD", "WiFi 6 & Bluetooth"]
    },
    {
      id: 9,
      name: "Mechanical Keyboard Pro",
      category: "Accessories",
      price: 129,
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=400&fit=crop&q=80",
      specs: "Cherry MX Switches, RGB Backlit, Aluminum Frame",
      description: "Premium mechanical keyboard with customizable RGB lighting",
      features: ["Cherry MX Red Switches", "Full RGB Backlight", "Aluminum Build", "Programmable Macros"]
    },
    {
      id: 10,
      name: "27-inch Monitor 4K",
      category: "Accessories",
      price: 449,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop&q=80",
      specs: "4K UHD, 144Hz, HDR400, IPS Panel",
      description: "Professional 4K monitor with vibrant colors and smooth performance",
      features: ["3840x2160 Resolution", "144Hz Refresh Rate", "HDR400", "99% sRGB Coverage"]
    },
    {
      id: 11,
      name: "Webcam HD Pro",
      category: "Accessories",
      price: 89,
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop&q=80",
      specs: "1080p 60fps, Auto-focus, Stereo Mic",
      description: "Crystal clear webcam for professional video conferencing",
      features: ["1080p at 60fps", "Auto-focus", "Dual Stereo Microphones", "Wide-angle Lens"]
    },
    {
      id: 12,
      name: "Tech Support Plus",
      category: "Services",
      price: 199,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&q=80",
      specs: "1 Year Premium Support, 24/7 Help",
      description: "Comprehensive technical support service for all your devices",
      features: ["24/7 Phone Support", "Remote Assistance", "On-site Service", "Priority Response"]
    },
    {
      id: 13,
      name: "Data Backup Service",
      category: "Services",
      price: 149,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop&q=80",
      specs: "1TB Cloud Storage, Auto-backup",
      description: "Secure cloud backup service to protect your important data",
      features: ["1TB Cloud Storage", "Automatic Backups", "256-bit Encryption", "Easy Recovery"]
    },
    {
      id: 14,
      name: "Installation Service",
      category: "Services",
      price: 99,
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop&q=80",
      specs: "Software & Hardware Setup",
      description: "Professional installation and setup service for your new equipment",
      features: ["Hardware Installation", "Software Configuration", "Network Setup", "Training Session"]
    },
    {
      id: 15,
      name: "Extended Warranty",
      category: "Services",
      price: 249,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80",
      specs: "3 Years Coverage, Parts & Labor",
      description: "Extended warranty protection for peace of mind",
      features: ["3 Years Coverage", "Parts & Labor Included", "Accidental Damage", "Free Shipping"]
    }
  ];

  const backgroundImage = "https://images.unsplash.com/photo-1531297484001-80022131f5a1";

  const filteredProducts = category === "All" ? products : products.filter(p => p.category === category);

  return (
    <main style={styles.main}>
      <img src={backgroundImage} alt="Service Home" style={styles.fullImage} />
      <div style={styles.darkOverlay}></div>

      <div style={styles.overlay}>
        <h1 style={styles.title}>Welcome to Service Request System</h1>
        <p style={styles.subtitle}>This is the home page. Please register or login to continue.</p>

        <div style={styles.productsSection}>
          <h2 style={styles.productsTitle}>Our Products</h2>
          <p style={styles.productsDesc}>Discover our wide range of electronics and services</p>

          <div style={styles.categories}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                style={{ ...styles.categoryBtn, ...(category === cat ? styles.activeBtn : {}) }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={styles.productGrid}>
            {filteredProducts.map(product => (
              <div key={product.id} style={styles.productCard} onClick={() => setSelectedProduct(product)}>
                <div style={styles.imgWrapper}>
                  <img src={product.image} alt={product.name} style={styles.productImg} />
                </div>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productSpecs}>{product.specs}</p>
                <p style={styles.productPrice}>${product.price}</p>
                <button style={styles.viewBtn}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div style={styles.modal} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedProduct(null)}>✕</button>

            <div style={styles.modalBody}>
              <div style={styles.modalImageSection}>
                <img src={selectedProduct.image} alt={selectedProduct.name} style={styles.modalImage} />
              </div>

              <div style={styles.modalInfo}>
                <h2 style={styles.modalTitle}>{selectedProduct.name}</h2>
                <p style={styles.modalCategory}>{selectedProduct.category}</p>
                <p style={styles.modalPrice}>${selectedProduct.price}</p>

                <p style={styles.modalDesc}>{selectedProduct.description}</p>

                <div style={styles.featuresSection}>
                  <h3 style={styles.featuresTitle}>Key Features:</h3>
                  <ul style={styles.featuresList}>
                    {selectedProduct.features.map((feature, idx) => (
                      <li key={idx} style={styles.featureItem}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div style={styles.modalActions}>
                  <button
                    style={styles.addCartBtn}
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button style={styles.buyNowBtn}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const styles = {
  main: { position: "relative", width: "100vw", height: "100vh", overflow: "hidden" },
  fullImage: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 },
  darkOverlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.65)", zIndex: 1 },
  overlay: { position: "absolute", zIndex: 2, color: "white", textAlign: "center", width: "100%", height: "100%", overflowY: "auto", padding: "3% 20px" },
  title: { fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "bold", textShadow: "4px 4px 8px rgba(0,0,0,0.9)", marginBottom: "1.5rem", color: "#ffffff" },
  subtitle: { fontSize: "clamp(1.2rem, 3vw, 1.8rem)", textShadow: "3px 3px 6px rgba(0,0,0,0.9)", marginBottom: "3rem", color: "#f1f5f9" },
  productsSection: { maxWidth: "1200px", margin: "0 auto", padding: "2rem 0" },
  productsTitle: { fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: "bold", marginBottom: "0.5rem" },
  productsDesc: { fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "#cbd5e1", marginBottom: "2rem" },
  categories: { display: "flex", justifyContent: "center", gap: "0.8rem", marginBottom: "2rem", flexWrap: "wrap" },
  categoryBtn: { padding: "0", height: "50px", width: "120px", background: "rgba(255,255,255,0.2)", color: "white", border: "2px solid rgba(255,255,255,0.4)", borderRadius: "25px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "600", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" },
  activeBtn: { background: "#3b82f6", border: "2px solid #3b82f6", boxShadow: "0 6px 20px rgba(59,130,246,0.5)", transform: "scale(1.05)" },
  productGrid: { display: "flex", gap: "2rem", padding: "0 1rem", overflowX: "auto", justifyContent: "center", flexWrap: "wrap" },
  productCard: { minWidth: "320px", maxWidth: "320px", background: "rgba(255,255,255,0.15)", borderRadius: "15px", padding: "1.2rem", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "transform 0.3s" },
  imgWrapper: { width: "100%", height: "200px", overflow: "hidden", borderRadius: "10px", marginBottom: "1rem", background: "#1e293b" },
  productImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  productName: { fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem", color: "white" },
  productSpecs: { fontSize: "0.9rem", color: "#cbd5e1", marginBottom: "0.8rem" },
  productPrice: { fontSize: "1.5rem", color: "#60a5fa", fontWeight: "bold", marginBottom: "1rem" },
  viewBtn: { width: "100%", padding: "0.8rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "1rem" },
  modal: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  modalContent: { background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "20px", maxWidth: "900px", width: "100%", maxHeight: "90vh", overflow: "auto", position: "relative", border: "1px solid rgba(255,255,255,0.1)" },
  closeBtn: { position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.1)", color: "white", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "1.5rem", cursor: "pointer", zIndex: 10 },
  modalBody: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", padding: "3rem" },
  modalImageSection: { display: "flex", alignItems: "center", justifyContent: "center" },
  modalImage: { width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "15px" },
  modalInfo: { color: "white" },
  modalTitle: { fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" },
  modalCategory: { fontSize: "1rem", color: "#60a5fa", marginBottom: "1rem", textTransform: "uppercase" },
  modalPrice: { fontSize: "2.5rem", color: "#3b82f6", fontWeight: "bold", marginBottom: "1.5rem" },
  modalDesc: { fontSize: "1.1rem", color: "#cbd5e1", lineHeight: "1.6", marginBottom: "2rem" },
  featuresSection: { marginBottom: "2rem" },
  featuresTitle: { fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem" },
  featuresList: { listStyle: "none", padding: 0, margin: 0 },
  featureItem: { padding: "0.8rem", background: "rgba(59,130,246,0.1)", borderLeft: "3px solid #3b82f6", marginBottom: "0.5rem", borderRadius: "5px", fontSize: "1rem" },
  modalActions: { display: "flex", gap: "1rem" },
  addCartBtn: { flex: 1, padding: "1rem", background: "rgba(255,255,255,0.1)", color: "white", border: "2px solid white", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "1rem" },
  buyNowBtn: { flex: 1, padding: "1rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "1rem" }
};