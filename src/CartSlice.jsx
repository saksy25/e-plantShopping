import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          name: newItem.name,
          image: newItem.image,
          cost: newItem.cost,
          description: newItem.description,
          quantity: 1
        });
      }
      state.totalQuantity += 1;
    },
    removeItem: (state, action) => {
      const itemName = action.payload;
      const existingItem = state.items.find(item => item.name === itemName);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.name !== itemName);
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        const quantityDiff = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDiff;
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;