import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
    
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],

  // --- CHECKOUT STATE ---
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
    
  paymentMethod: 'Cash on Delivery', 

  // ACTIONS
  setCredentials: (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
    set({ userInfo: data });
  },

  logout: () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems'); // Clear cart on logout
    localStorage.removeItem('shippingAddress');
    set({ userInfo: null, cartItems: [], shippingAddress: {} });
  },

  addToCart: (newItem) => {
    const currentItems = get().cartItems;
    const existItem = currentItems.find((x) => x._id === newItem._id);
    let updatedItems;
    if (existItem) {
      updatedItems = currentItems.map((x) => x._id === existItem._id ? newItem : x);
    } else {
      updatedItems = [...currentItems, newItem];
    }
    set({ cartItems: updatedItems });
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  },

  removeFromCart: (id) => {
    const currentItems = get().cartItems;
    const updatedItems = currentItems.filter((x) => x._id !== id);
    set({ cartItems: updatedItems });
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  },

  // --- NEW ACTIONS ---
  saveShippingAddress: (data) => {
    set({ shippingAddress: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  },

  savePaymentMethod: (data) => {
    set({ paymentMethod: data });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  },
  
  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem('cartItems');
  }
}));

export default useAuthStore;