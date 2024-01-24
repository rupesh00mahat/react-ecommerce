import { createContext, useReducer } from "react";

export const ProductList = createContext({products: [], addToCart: () => {}, updateCart: ()=>{}});

const DEFAULT_POST =[{}]

const productListReducer = (currentProductList, action) => {
   
    let newProductList = currentProductList;
    if(action.type === 'NEW_PRODUCT')
    {
        newProductList = [
           ...currentProductList, {
                id: action.payload.id,
                title: action.payload.title,
                price: action.payload.price, 
                discountPercentage: action.payload.discountPercentage, 
                thumbnail: action.payload.thumbnail,
                quantity: action.payload.quantity,
            }
        ];
    }
    else if(action.type === 'UPDATE_PRODUCT'){
        console.log('Hello updating...')
       currentProductList.forEach((element, index) => {
            if(element.id == action.payload.id)
            {
                if(action.payload.updationType == 'increment')
                {
                    ++currentProductList[index].quantity ;
                    currentProductList[index].price = currentProductList[index].quantity*(currentProductList[index].price/(currentProductList[index].quantity-1));

                }
                else {
                    --currentProductList[index].quantity;
                    currentProductList[index].price = currentProductList[index].quantity*(currentProductList[index].price/(currentProductList[index].quantity+1));


                }
                newProductList = [...currentProductList];
            }
       });
    }
    return newProductList;
}


export  const PostsProvider = ({children}) =>
{
    const [product, dispatchProduct] = useReducer(productListReducer, DEFAULT_POST);

    const addToCart = (id, title,price, 
        discountPercentage, thumbnail, quantity
        ) => {
            const addItem = {
                type: 'NEW_PRODUCT',
                payload: {
                    id,
                    title,
                    price, 
                    discountPercentage, 
                    thumbnail,
                    quantity
                }
            }
            dispatchProduct(addItem);
    }

    const updateCart = (id, updationType)=>{
        const updateItem = {
            type: 'UPDATE_PRODUCT',
            payload:{
                id,
                updationType
            }

        }
        dispatchProduct(updateItem);
    }

return <ProductList.Provider value={{product,  addToCart, updateCart}}>
    {children}
</ProductList.Provider>

}