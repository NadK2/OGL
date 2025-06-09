import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        fetch('http://localhost:8080/product')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    }

    useEffect(() => {

        fetchProducts();

    }, []);

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <div className="float-end">
                        <button onClick={() => navigate('/product/add')} className="btn btn-success">+ Product</button>
                    </div>
                    <h5>Products</h5>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Sku</th>
                                <th>Description</th>
                                <th className="text-end">Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr>
                                    <td>{p.id}</td>
                                    <td>{p.sku}</td>
                                    <td>{p.description}</td>
                                    <td className="text-end">{p.price.toFixed(2)}</td>
                                    <th className="text-end"><button onClick={() => navigate(`/product/${p.id}`)} className="btn btn-sm btn-dark">edit</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
