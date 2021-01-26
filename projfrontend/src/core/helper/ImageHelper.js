import React from 'react'

const ImageHelper = ({product}) => {
    const imgUrl = product.product_image;
    return (
        <div className="row rounded border border-info">
            <img
                src={imgUrl} 
                style={{maxHeight:"100%", maxWidth:"100%"}}
                className="rounded"
                alt=""
            />
        </div>
    )
}

export default ImageHelper;