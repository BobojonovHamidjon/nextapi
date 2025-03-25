"use client";
import useCartStore from "@/store/useCartStore";
import Image from "next/image";
import React from "react";
import { Trash2 } from "lucide-react"; 

const fallbackImage = "/fallback.jpg";

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <div className="container mx-auto p-5 mb-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cart.map((product) => (
              <div
                key={product?.id}
                className="relative border bg-gray-500 text-white p-4 rounded-lg shadow-md"
              >
                <button
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition p-0 flex items-center justify-center"
                  onClick={() => removeFromCart(product.id)}
                >
                  <Trash2 size={20} className="m-2" />
                </button>

                <div className="relative w-full h-48">
                  <Image
                    src={product?.images?.[0] || fallbackImage}
                    alt={product?.title || "Product Image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

                <h1 className="text-white">
                  Price: <span className="text-[orange] font-bold">${(product.price * product.quantity).toFixed(2)}</span>
                </h1>

                <h3 className="mt-2 font-semibold text-lg">{product?.title}</h3>
                <p className="text-sm text-gray-300">
                  Brand: {product?.brand || "Unknown"}
                </p>

                <div className="flex w-full justify-between items-center mt-2 bg-gray-100 p-2 rounded-lg shadow-md">
                  <button 
                    onClick={() => decreaseQuantity(product.id)}
                    disabled={product.quantity <= 1}
                    className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="text-lg text-black font-semibold">{product.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(product.id)}
                    className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

         
          {cart.length > 0 && (
            <div className="w-full text-center mt-5">
            <h1 className="text-2xl font-bold">
              Total Price: 
                 <span className="text-[orange] font-bold ml-2">
                 ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                </span>
               </h1>
               </div>
              )}
        </>
      )}
    </div>
  );
};

export default CartPage;
