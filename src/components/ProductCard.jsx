import Image from 'next/image'
import React from 'react'

const ProductCard = ({product}) => {
    console.log(product);
    
  return (
    <div>
        <div className='w-[300px] h-[200px] relative'>
            <Image fill scr={product?.images[0]} alt={product?.brand}/>
        </div>
        <h3>Brand:{product?.brand }</h3>
    </div>
  )
}

export default ProductCard