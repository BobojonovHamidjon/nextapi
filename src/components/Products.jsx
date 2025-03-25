"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useCartStore from "@/store/useCartStore";
import heart from "@/assets/heart-regular.svg";
import heartFill from "@/assets/heart-solid.svg";
import useLikeStore from "@/store/useLikeStore";

const fallbackImage = "/fallback.jpg";

const Products = () => {
  const [data, setData] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart); // Savatni olish
  const changeToLike = useLikeStore((state) => state.changeToLike);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setData(res?.data?.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const toggleLike = (product) => {
    changeToLike(product);
    setLikedProducts((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
  };

  const isInCart = (productId) => cart.some((item) => item.id === productId); // Savatda bor-yo‘qligini tekshirish

  return (
    <div className="mt-24 mb-5 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.map((product) => (
        <div
          key={product?.id}
          className="border relative bg-gray-500 text-white p-4 rounded-lg shadow-md"
        >
          <div className="relative w-full h-48">
            <Image
              src={product?.images?.[0] || fallbackImage}
              alt={product?.title || "Product Image"}
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" 
              className="rounded-lg"
            />
          </div>
          <button
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => toggleLike(product)}
          >
            <div className="relative w-[30px] h-[30px]">
              <Image src={likedProducts[product.id] ? heartFill : heart} alt="favorites" />
            </div>
          </button>
          <h3 className="mt-2 font-semibold text-lg">{product?.title}</h3>
          <p className="text-sm text-gray-300">Brand: {product?.brand || "Unknown"}</p>
          
          <button
            className={`w-full rounded-lg p-2 mt-2 cursor-pointer ${
              isInCart(product.id) ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={() =>
              isInCart(product.id) ? removeFromCart(product.id) : addToCart(product)
            }
          >
            {isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
          </button> 
         
        </div>
      ))}
    </div>
  );
};

export default Products;
