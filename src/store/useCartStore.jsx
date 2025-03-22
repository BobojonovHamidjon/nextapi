const { create } = require("zustand");

const useCartStore = create((set) => ({
  cart:[],
  addToCart : (product)=> set((state)=>{
    const isExist = state.cart.some((item)=>item.id === product.id)
    
    if (isExist) return state 
    const updateProducts = {cart:[...state.cart,product]}
    return updateProducts
  }),
  removeFromCart : (id) => set((state)=>({
    cart: state.cart.filter((item)=>item.id !==id)
  }))
}));
export default  useCartStore