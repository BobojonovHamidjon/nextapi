"use client";

import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import useLikeStore from "@/store/useLikeStore";
import Image from "next/image";

export default function Header() {
  const cart = useCartStore((state) => state.cart);
  const like = useLikeStore((state) => state.like);

  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

 
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleSelectProduct = (product) => {
    setSelectedProduct(product); 
    setSearch(product.title);
    setIsFocused(false);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white text-black shadow-lg">

      <Link href="/" className="text-2xl font-bold">ShopLogo</Link>

    
      <div className="relative w-full sm:w-1/2 lg:w-1/3 mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedProduct(null); 
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search..."
            className="w-full p-2 pl-10 rounded-lg bg-gray-100 text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        {isFocused && search && !selectedProduct && (
          <div className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectProduct(product)}
                >
                  <Image src={product.thumbnail} alt={product.title} width={30} height={30} className="rounded" />
                  <span>{product.title}</span>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>

     
      <div className="flex items-center gap-4">
    
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
