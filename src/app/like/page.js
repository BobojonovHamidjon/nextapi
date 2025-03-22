"use client";

import useLikeStore from "@/store/useLikeStore";
import heart from "@/assets/heart-regular.svg";
import heartFill from "@/assets/heart-solid.svg";
import React, { useEffect } from "react";
import Image from "next/image";
import useCartStore from "@/store/useCartStore";

const LikePage = () => {
  const like = useLikeStore((state) => state.like);
  const changeToLike = useLikeStore((state) => state.changeToLike);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    console.log("Liked products:", like);
  }, [like]);

  return (
    <div className="p-4 mb-5">
      <h2 className="text-center text-2xl font-bold mb-4">Favorites</h2>
      {like.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-10">
          Your favorites list is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {like.map((product) => (
            <div
              key={product?.id}
              className="border relative bg-gray-500 text-white p-4 rounded-lg shadow-md"
            >
              <div className="relative w-full h-48">
                <Image
                  src={product?.images?.[0] || "/fallback-image.jpg"}
                  alt={product?.title || "Product Image"}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="rounded-lg"
                />
              </div>
              <button
                className="absolute top-5 right-5 cursor-pointer"
                onClick={() => changeToLike(product)}
              >
                <div className="relative w-[30px] h-[30px]">
                  <Image
                    fill
                    src={like.some((item) => item.id === product.id) ? heartFill : heart}
                    alt="favorites"
                  />
                </div>
              </button>
              <h3 className="mt-2 font-semibold text-lg">{product?.title}</h3>
              <p className="text-sm text-gray-300">
                Brand: {product?.brand || "Unknown"}
              </p>
              <button
                className="w-full rounded-lg p-2 bg-blue-600 hover:bg-blue-700 cursor-pointer mt-2"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikePage;
