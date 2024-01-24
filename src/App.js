import { useEffect, useState, useContext } from "react";
import Categories from "./categories.";
import Products from "./products";
import Cart from "./Cart";
import {PostsProvider} from './store/product-reducer'
import { ProductList } from './store/product-reducer';


function App() {
  const [category, alterCategories] = useState([]);
  const [isCartChanged, changeCartStatus] = useState(false);
  const [isCartOpen, openCart] = useState(false);
  const [selectedCategories, changeSelectedCategories] = useState([]);
  let { product}  = useContext(ProductList)

  useEffect(()=>{
    async function changeCategory() {
      const response = await fetch("https://dummyjson.com/products/");
      const products = await response.json();
      console.log(products);
    }
    changeCategory();
  }, [])

  return (
 <PostsProvider>
   <div className="e-commerce">
    <Categories
      category={category}
      changeCategory={(value)=>{
        alterCategories([...category, value]);
      }}
      selectedCategory={(value)=>{
        let newArr = [...selectedCategories, value];
        changeSelectedCategories(newArr);
      }}
      
    />
  <Products
   alterCartStatus={()=>{
    changeCartStatus(!isCartChanged);
}}
categoryList = {selectedCategories}
  />
{isCartOpen &&

(
    <Cart
    alterCartStatus={()=>{
     changeCartStatus(!isCartChanged);
 }}
 cartStatus={isCartChanged}
 closeCart={()=>{
 openCart(false);
 }}
   />
)}
{!isCartOpen && (
  <button
  onClick={()=>{
    openCart(true)
  }}
  className="cart-icon">
    <div className="cart-item-list">
      {product == undefined ? 0 : product.length-1}
    </div>
  </button>
)}
  </div>

 </PostsProvider>
  );
}

export default App;
