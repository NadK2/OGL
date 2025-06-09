import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({});


    const handleAddProductSubmit = () => {
        fetch('http://localhost:8080/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => {
                if (!response.ok) {
                    alert('Error! product not added');
                }
                return response.json();
            })
            .then(data => {
                alert('Product Added');
                navigate('/');
                console.log('Success:', data);
            })
            .catch(error => {
                alert('Error! product not added');
                console.error('Error:', error);
            });
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className="float-end">
                    <button onClick={() => navigate('/')} className="btn btn-danger">x</button>
                </div>
                <h5>Add Product</h5>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="sku" className="form-label">SKU</label>
                    <input value={product.sku} type="text" className="form-control" required onChange={e => {
                        setProduct(prev => ({
                            ...prev,
                            sku: e.target.value
                        }))
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3" maxLength="255" required value={product.description} onChange={e => {
                        setProduct(prev => ({
                            ...prev,
                            description: e.target.value
                        }))
                    }} ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" step="0.01" required value={product.price} onChange={e => {
                        setProduct(prev => ({
                            ...prev,
                            price: e.target.value
                        }))
                    }} />
                </div>

                <button onClick={handleAddProductSubmit} className="btn btn-primary">Submit</button>
            </div>
        </div>
    );

}
