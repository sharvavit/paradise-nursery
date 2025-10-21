import React, { createContext, useContext, useReducer, useState } from 'react';
import { ShoppingCart, Leaf, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .header {
    background-color: #15803d;
    color: white;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
  }
  
  .header-logo:hover {
    opacity: 0.8;
  }
  
  .header-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .header-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .nav-button {
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 500;
  }
  
  .nav-button:hover {
    opacity: 0.8;
  }
  
  .cart-icon-wrapper {
    position: relative;
    cursor: pointer;
  }
  
  .cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #ef4444;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
  }
  
  .landing-hero {
    position: relative;
    min-height: 100vh;
    background-image: url('https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1600');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .landing-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0,0,0,0.5);
  }
  
  .landing-content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 800px;
  }
  
  .landing-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .landing-title {
    font-size: 4rem;
    font-weight: bold;
  }
  
  .landing-description {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    line-height: 1.8;
  }
  
  .btn-primary {
    background-color: #16a34a;
    color: white;
    font-weight: bold;
    padding: 1rem 2rem;
    font-size: 1.25rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .btn-primary:hover {
    background-color: #15803d;
  }
  
  .page-container {
    min-height: 100vh;
    background-color: #f9fafb;
  }
  
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .page-title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .category-section {
    margin-bottom: 3rem;
  }
  
  .category-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #15803d;
    margin-bottom: 1.5rem;
    border-bottom: 3px solid #86efac;
    padding-bottom: 0.5rem;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .product-card {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
  
  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .product-info {
    padding: 1.25rem;
  }
  
  .product-name {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .product-price {
    font-size: 1.75rem;
    font-weight: bold;
    color: #16a34a;
    margin-bottom: 1rem;
  }
  
  .btn-add-cart {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  
  .btn-add-cart-active {
    background-color: #16a34a;
    color: white;
  }
  
  .btn-add-cart-active:hover {
    background-color: #15803d;
  }
  
  .btn-add-cart-disabled {
    background-color: #d1d5db;
    color: #6b7280;
    cursor: not-allowed;
  }
  
  .empty-cart {
    text-align: center;
    padding: 4rem;
  }
  
  .empty-cart-icon {
    margin: 0 auto 1rem;
    color: #d1d5db;
  }
  
  .empty-cart-text {
    font-size: 1.5rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
  }
  
  .cart-layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .cart-layout {
      grid-template-columns: 1fr;
    }
  }
  
  .cart-items-container {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .cart-item:last-child {
    border-bottom: none;
  }
  
  .cart-item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 0.5rem;
  }
  
  .cart-item-info {
    flex: 1;
  }
  
  .cart-item-name {
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }
  
  .cart-item-price {
    color: #6b7280;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .quantity-btn {
    padding: 0.5rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  
  .quantity-btn-minus {
    background-color: #e5e7eb;
  }
  
  .quantity-btn-plus {
    background-color: #16a34a;
    color: white;
  }
  
  .quantity-display {
    width: 3rem;
    text-align: center;
    font-weight: bold;
  }
  
  .cart-item-total {
    width: 5rem;
    text-align: right;
  }
  
  .cart-item-total-price {
    font-size: 1.125rem;
    font-weight: bold;
  }
  
  .btn-remove {
    padding: 0.5rem;
    color: #ef4444;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .btn-remove:hover {
    opacity: 0.7;
  }
  
  .order-summary {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .summary-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .summary-details {
    margin-bottom: 1.5rem;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 1.125rem;
  }
  
  .summary-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: bold;
    border-top: 2px solid #e5e7eb;
    padding-top: 0.75rem;
  }
  
  .summary-total-amount {
    color: #16a34a;
  }
  
  .btn-checkout {
    width: 100%;
    background-color: #16a34a;
    color: white;
    font-weight: bold;
    padding: 0.75rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin-bottom: 0.75rem;
  }
  
  .btn-checkout:hover {
    background-color: #15803d;
  }
  
  .btn-continue {
    width: 100%;
    background-color: #e5e7eb;
    color: #1f2937;
    font-weight: bold;
    padding: 0.75rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .btn-continue:hover {
    background-color: #d1d5db;
  }
`;

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
            item.id === action.payload
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
            item.id === action.payload && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
      <CartContext.Provider value={{ state, dispatch }}>
        {children}
      </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

const plants = [
  { id: 1, name: 'Aloe Vera', price: 12.99, category: 'Succulents', image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400' },
  { id: 2, name: 'Jade Plant', price: 15.99, category: 'Succulents', image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400' },
  { id: 3, name: 'Snake Plant', price: 18.99, category: 'Air Purifying', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb8?w=400' },
  { id: 4, name: 'Peace Lily', price: 22.99, category: 'Air Purifying', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400' },
  { id: 5, name: 'Monstera', price: 35.99, category: 'Tropical', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400' },
  { id: 6, name: 'Fiddle Leaf Fig', price: 45.99, category: 'Tropical', image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400' },
  { id: 7, name: 'Basil', price: 8.99, category: 'Herbs', image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400' },
  { id: 8, name: 'Mint', price: 7.99, category: 'Herbs', image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400' }
];

const Header = ({ currentPage, onNavigate }) => {
  const { state } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
      <header className="header">
        <div className="header-content">
          <div className="header-logo" onClick={() => onNavigate('landing')}>
            <Leaf size={32} />
            <h1 className="header-title">Paradise Nursery</h1>
          </div>
          <nav className="header-nav">
            {currentPage !== 'products' && (
                <button className="nav-button" onClick={() => onNavigate('products')}>
                  Shop Plants
                </button>
            )}
            {currentPage !== 'cart' && (
                <div className="cart-icon-wrapper" onClick={() => onNavigate('cart')}>
                  <ShoppingCart size={24} />
                  {totalItems > 0 && (
                      <div className="cart-badge">{totalItems}</div>
                  )}
                </div>
            )}
          </nav>
        </div>
      </header>
  );
};

const LandingPage = ({ onNavigate }) => {
  return (
      <div>
        <style>{styles}</style>
        <div className="landing-hero">
          <div className="landing-overlay"></div>
          <div className="landing-content">
            <div className="landing-logo">
              <Leaf size={64} />
              <h1 className="landing-title">Paradise Nursery</h1>
            </div>
            <p className="landing-description">
              Welcome to Paradise Nursery, where green meets serenity. We are passionate about bringing nature closer to you. Our extensive collection of houseplants is carefully curated to enhance your living spaces with beauty, freshness, and tranquility.
            </p>
            <button className="btn-primary" onClick={() => onNavigate('products')}>
              Get Started
            </button>
          </div>
        </div>
      </div>
  );
};

const ProductListingPage = ({ onNavigate }) => {
  const { state, dispatch } = useCart();
  const categories = [...new Set(plants.map(p => p.category))];

  const isInCart = (plantId) => state.items.some(item => item.id === plantId);

  return (
      <div className="page-container">
        <style>{styles}</style>
        <Header currentPage="products" onNavigate={onNavigate} />
        <div className="content-wrapper">
          <h2 className="page-title">Our Collection</h2>
          {categories.map(category => (
              <div key={category} className="category-section">
                <h3 className="category-title">{category}</h3>
                <div className="products-grid">
                  {plants.filter(p => p.category === category).map(plant => (
                      <div key={plant.id} className="product-card">
                        <img src={plant.image} alt={plant.name} className="product-image" />
                        <div className="product-info">
                          <h4 className="product-name">{plant.name}</h4>
                          <p className="product-price">${plant.price}</p>
                          <button
                              className={`btn-add-cart ${isInCart(plant.id) ? 'btn-add-cart-disabled' : 'btn-add-cart-active'}`}
                              onClick={() => !isInCart(plant.id) && dispatch({ type: 'ADD_TO_CART', payload: plant })}
                              disabled={isInCart(plant.id)}
                          >
                            {isInCart(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

const ShoppingCartPage = ({ onNavigate }) => {
  const { state, dispatch } = useCart();
  const totalCost = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
      <div className="page-container">
        <style>{styles}</style>
        <Header currentPage="cart" onNavigate={onNavigate} />
        <div className="content-wrapper">
          <h2 className="page-title">Shopping Cart</h2>

          {state.items.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart size={96} className="empty-cart-icon" />
                <p className="empty-cart-text">Your cart is empty</p>
                <button className="btn-primary" onClick={() => onNavigate('products')}>
                  Continue Shopping
                </button>
              </div>
          ) : (
              <div className="cart-layout">
                <div>
                  <div className="cart-items-container">
                    {state.items.map(item => (
                        <div key={item.id} className="cart-item">
                          <img src={item.image} alt={item.name} className="cart-item-image" />
                          <div className="cart-item-info">
                            <h3 className="cart-item-name">{item.name}</h3>
                            <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                          </div>
                          <div className="quantity-controls">
                            <button
                                className="quantity-btn quantity-btn-minus"
                                onClick={() => dispatch({ type: 'DECREMENT_QUANTITY', payload: item.id })}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="quantity-display">{item.quantity}</span>
                            <button
                                className="quantity-btn quantity-btn-plus"
                                onClick={() => dispatch({ type: 'INCREMENT_QUANTITY', payload: item.id })}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="cart-item-total">
                            <p className="cart-item-total-price">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <button
                              className="btn-remove"
                              onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="order-summary">
                    <h3 className="summary-title">Order Summary</h3>
                    <div className="summary-details">
                      <div className="summary-row">
                        <span>Total Items:</span>
                        <span style={{fontWeight: 'bold'}}>{totalItems}</span>
                      </div>
                      <div className="summary-total">
                        <span>Total:</span>
                        <span className="summary-total-amount">${totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                        className="btn-checkout"
                        onClick={() => alert('Coming Soon! Checkout functionality will be available soon.')}
                    >
                      Checkout
                    </button>
                    <button className="btn-continue" onClick={() => onNavigate('products')}>
                      <ArrowLeft size={20} />
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
      <CartProvider>
        {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
        {currentPage === 'products' && <ProductListingPage onNavigate={setCurrentPage} />}
        {currentPage === 'cart' && <ShoppingCartPage onNavigate={setCurrentPage} />}
      </CartProvider>
  );
}