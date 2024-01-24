import React, {useEffect, useState} from 'react'
import { useContext } from 'react'
import { ProductList } from './store/product-reducer'
import { FaShoppingCart } from "react-icons/fa";


function Cart(props) {
  let {product, updateCart} = useContext(ProductList)
  const [subtotal, changeSubtotal] = useState(0);
const [onclk, changeOnClk] = useState(false);


  useEffect(()=>{

    let newSubtotal = 0;
    product.forEach(element => {
      if(element.price != undefined)
      {
        console.log(element.price);
        newSubtotal = newSubtotal+element.price;
      }
    });
    
  changeSubtotal(newSubtotal);
  },[props.cartStatus])

  return (
    <div className='e-commerce-product-cart'>
        <div className='e-commerce-product-cart-heading'>
        <FaShoppingCart size={'30px'} />
          <h1>Cart</h1>
        </div>
        <hr/>
    <section className='e-commerce-product-cart-selected-items'>
      {product.length == 1 && <p>Add items in the cart to show. :) </p>}
      {product.length > 1 && <div className='cart-item-list'>
        {product.map((item, index)=>{
        if(index != 0){
          return <div className='e-commerce-cart-product-item'>
          <img className="cart-item-image" src={item.thumbnail}/>
          <div className='gray-text cart-item-description'>
            <div>{item.title}</div>
            <div>Quantity: {item.quantity}</div>
          </div>
          <div className='yellow-text cart-item-pricing'>${item.price}</div>
        </div>
        }
        })}
        </div>}
    </section>
    <section className='e-commerce-cart-pricing-area'>
      <div className='sub-total'>
      <p className='gray-text subtotal'>Subtotal</p>
      <h1 className='yellow-text total-price'>${subtotal}</h1>
      </div>
      <button
      onClick={()=>{
        alert(`The checkout amount is: $ :${subtotal}`)
      }}
      className='checkout-button'>Checkout</button>
    </section>
    <div
    onClick={()=>{
      props.closeCart();
    }}
    className='cross-btn'>
      X
    </div>
    </div>
  )
}

export default Cart