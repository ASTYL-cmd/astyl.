import { useState, useRef } from 'react';
import { X, Star, ChevronDown } from 'lucide-react';
import '../styles/OrderPopup.css';

interface OrderData {
  fullName: string;
  mobileNumber: string;
  email: string;
  address: string;
  quantity: number;
  color: string;
  size: string;
}

const OrderPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [formData, setFormData] = useState<OrderData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    address: '',
    quantity: 1,
    color: 'Black',
    size: 'M',
  });

  const colorsRef = useRef<HTMLDivElement>(null);
  const sizesRef = useRef<HTMLDivElement>(null);
  const [colorsOpen, setColorsOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);

  const colors = ['Black', 'White', 'Navy Blue', 'Maroon', 'Forest Green'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const price = 299;
  const totalAmount = price * quantity;

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    setQuantity(prev => {
      const newQty = action === 'increase' ? prev + 1 : Math.max(1, prev - 1);
      setFormData(prev => ({ ...prev, quantity: newQty }));
      return newQty;
    });
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setFormData(prev => ({ ...prev, color }));
    setColorsOpen(false);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setFormData(prev => ({ ...prev, size }));
    setSizesOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    const { fullName, mobileNumber, email, address } = formData;

    if (!fullName.trim() || !mobileNumber.trim() || !email.trim() || !address.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const subject = encodeURIComponent('New Order - Premium T-Shirt');
    const body = encodeURIComponent(
      `Order Details:\n\n` +
      `Customer Name: ${fullName}\n` +
      `Mobile Number: ${mobileNumber}\n` +
      `Email: ${email}\n` +
      `Delivery Address: ${address}\n\n` +
      `Product Details:\n` +
      `Product Name: Premium T-Shirt\n` +
      `Color: ${formData.color}\n` +
      `Size: ${formData.size}\n` +
      `Price (per unit): ₹${price}\n` +
      `Quantity: ${quantity}\n` +
      `Total Amount: ₹${totalAmount}\n\n` +
      `Thank you for your order!`
    );

    window.location.href = `mailto:orders@yourstore.com?subject=${subject}&body=${body}`;
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="popup-container">
        <button className="close-button" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>

        <div className="popup-content">
          {/* Product Section */}
          <div className="product-section">
            <img
              src="https://images.pexels.com/photos/3621812/pexels-photo-3621812.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Premium T-Shirt"
              className="product-image"
            />
            <div className="product-info">
              <h2 className="product-name">Premium T-Shirt</h2>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star filled" />
                ))}
                <span className="rating-text">(324 reviews)</span>
              </div>
              <div className="price-section">
                <span className="price">₹{price}</span>
                <span className="total">Total: ₹{totalAmount}</span>
              </div>

              {/* Quantity Selector */}
              <div className="quantity-selector">
                <label>Quantity</label>
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange('decrease')}
                  >
                    −
                  </button>
                  <span className="qty-display">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange('increase')}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Color Selector */}
              <div className="dropdown-section">
                <label>Color</label>
                <div className="dropdown" ref={colorsRef}>
                  <button
                    className="dropdown-trigger"
                    onClick={() => setColorsOpen(!colorsOpen)}
                  >
                    <span>{selectedColor}</span>
                    <ChevronDown size={18} className={colorsOpen ? 'rotate' : ''} />
                  </button>
                  {colorsOpen && (
                    <div className="dropdown-menu">
                      {colors.map(color => (
                        <button
                          key={color}
                          className={`dropdown-item ${selectedColor === color ? 'active' : ''}`}
                          onClick={() => handleColorSelect(color)}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Size Selector */}
              <div className="dropdown-section">
                <label>Size</label>
                <div className="dropdown" ref={sizesRef}>
                  <button
                    className="dropdown-trigger"
                    onClick={() => setSizesOpen(!sizesOpen)}
                  >
                    <span>{selectedSize}</span>
                    <ChevronDown size={18} className={sizesOpen ? 'rotate' : ''} />
                  </button>
                  {sizesOpen && (
                    <div className="dropdown-menu">
                      {sizes.map(size => (
                        <button
                          key={size}
                          className={`dropdown-item ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => handleSizeSelect(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form className="form-section" onSubmit={e => e.preventDefault()}>
            <h3>Delivery Details</h3>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Mobile Number *</label>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Delivery Address *</label>
              <textarea
                name="address"
                placeholder="Enter complete delivery address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-textarea"
                rows={3}
              />
            </div>

            <button
              type="button"
              className="place-order-btn"
              onClick={handlePlaceOrder}
            >
              <span className="btn-text">Place Order</span>
              <span className="btn-glow"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
