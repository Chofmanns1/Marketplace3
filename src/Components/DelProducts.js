import React, { useState, useEffect } from 'react'
import { Products } from './Products'
import { auth, fs } from '../Config/Config'

export const DelProducts = (props) => {
    // state of products
    const [products, setProducts] = useState([]);

    // getting products function
    const getProducts = async () => {
        const products = await fs.collection('Products').get();
        const productsArray = [];
        for (var snap of products.docs) {
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if (productsArray.length === products.docs.length) {
                setProducts(productsArray);
            }
        }
    }

    useEffect(() => {
        getProducts();
    }, [])


    return (
        <>
            <br></br>
            {products.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Productos y servicios</h1>
                    <div className='products-box'>
                        <Products products={products} />
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container-fluid'>Por favor espere....</div>
            )}
        </>
    )
}
