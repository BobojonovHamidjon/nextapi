"use client";
import { Search, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import useLikeStore from "@/store/useLikeStore"; // To'g'ri import

export default function Header() {
  const cart = useCartStore((state) => state.cart);
  const like = useLikeStore((state) => state.like); // To'g'ri do'kon

  return (
    <header className="flex justify-between items-center p-4 bg-white text-black shadow-lg">
      <Link href="/" className="text-2xl font-bold">ShopLogo</Link>

      <div className="flex items-center gap-4">
      
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 rounded-lg bg-gray-100 text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Link href="/like" className="relative">
          <Heart className="cursor-pointer" size={28} />
          {like?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {like.length}
            </span>
          )}
        </Link>

        <Link href="/cart" className="relative">
          <ShoppingCart className="cursor-pointer" size={28} />
          {cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
