import React, {useEffect, useState} from 'react'
import Base from './Base';
import Card from './Card';
import {getProducts} from './helper/coreApiCalls'
// TODO
// getCategories
export default function Home() {
    const [products, setProducts] = useState([]);
    const [error, setErrors] = useState(false);
    // loadAllCategories
    const loadAllProducts = ()=>{
        getProducts()
        .then((data) => {
            if (data.error) {
                setErrors(data.error);
                console.error(error);
            }
            else{
                setProducts(data);
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        loadAllProducts()
    })

    return (
        <Base>
            <div className="row">
                <h1 className="mb-4">Products</h1>
            </div>
            <div className="row">
                {products.map((product, index)=>{
                    return (
                        <div key={index} className="col-4 mb-4 pl-0">
                            <Card product={product} />
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}
