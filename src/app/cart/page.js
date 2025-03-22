"use client";
import useCartStore from "@/store/useCartStore";
import Image from "next/image";
import React from "react";

const fallbackImage = "/fallback.jpg"; 

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="container mx-auto p-5 mb-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cart.map((product) => (
            <div
              key={product?.id}
              className="border bg-gray-500 text-white p-4 rounded-lg shadow-md"
            >
              <div className="relative w-full h-48">
                <Image
                  src={product?.images?.[0] || fallbackImage}
                  alt={product?.title || "Product Image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="mt-2 font-semibold text-lg">{product?.title}</h3>
              <p className="text-sm text-gray-300">
                Brand: {product?.brand || "Unknown"}
              </p>
              <button
                className="w-full rounded-lg p-2 bg-blue-600 hover:bg-blue-700 cursor-pointer mt-2"
                onClick={()=>removeFromCart(product.id)}
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
