import React, { useEffect, useState, Fragment   } from 'react'
import Product from './product'

function Products(props) {

  const [products, addProducts] = useState([]);
  console.log(props);

  useEffect(()=> {
    async function getProducts() {
      const response = await fetch("https://dummyjson.com/products/");
      const products = await response.json();
      addProducts(products.products);

    }
    getProducts();
  }, [])


  return (
   <Fragment>

<div style={{textAlign: 'center'}} className='e-commerce-products-wrapper'>
   {products.map((product)=>{
    if(props.categoryList.includes(product.category)){
      return <Product
     alterStatus={()=>{
      props.alterCartStatus();
     }}
     product = {product}/>
    }
   })}
  
    
</div>
   </Fragment>
  )
}

export default Products