import React, { Fragment } from 'react'
import './style.css'

function Categories(props) {
  const categories = ['smartphones', 'laptops', 'fragnances', 'skincare','groceries', 'home-decoration']
  return (
    <div className='e-commerce-categories'>
      <h3>Sizes:</h3>
      <section className='categories-list'> 
        {categories.map((category)=>{
         return  <span 
         onClick={(e)=>{
          e.target.classList.add('category-selected')
          props.selectedCategory(category);

         }}
         className='category category-name'>{category}</span>
        })}
        
      </section>
    </div>
  )
}

export default Categories