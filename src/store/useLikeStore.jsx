const { create } = require("zustand");

 
  const  useLikeStore   =   create ((set)=>({
    like:[],
    changeToLike:(product)=>set((state)=>{
       const isExist= state.like.some((item)=>item.id === product.id);
       if(isExist){
         return {like:state.like.filter((item)=>item.id !== product.id)}
       }else{
         return {like:[...state.like,product]}
         }
      })
    
  }))
  export default useLikeStore;
