import React, { useContext, useState } from 'react'
import Rating from '@mui/material/Rating';
import {  ProductList } from './store/product-reducer';

function Product(props) {
  const { id,
    title,
    description, price, 
    discountPercentage, 
    rating, stock, brand, category,thumbnail, images} = props.product;
    
    let {addToCart, product, updateCart}  = useContext(ProductList);

    return (
    <div className='e-commerce-product'>
        <div className='e-commerce-product-image'>
<img src={thumbnail}/>
        </div>
        <p className='product-name'>{title} ({stock}) </p>
        <p className='price'>$<strong>{price}</strong></p>
        <Rating name="read-only" value={rating} readOnly />

        <button
        onClick={(e)=> {
          e.preventDefault();
          let isAdded = false;
          product.forEach((item, index) => {
               if(id == item.id){
                isAdded = true
               }
               if(index == product.length-1 && isAdded == true){
                updateCart(id, 'increment');
               }else if(index == product.length-1 && isAdded == false){
                addToCart(id, title,price, 
                  discountPercentage, thumbnail, 1)
               }
          });
          props.alterStatus();
        }}
        className='product-add-to-cart'>Add to Cart</button>
     </div>
  )
}

export default Product