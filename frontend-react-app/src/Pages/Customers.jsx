import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Customers() {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = () => {
        fetch('http://localhost:8080/customer')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <div className="float-end">


                        <div class="dropdown">
                            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                action
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href="#" class="dropdown-item" onClick={() => navigate('/customer/add')}>add customer</a></li>
                                <li><a href="#" class="dropdown-item" onClick={() => navigate('/customer/map')}>map</a></li>
                                <li><a href="#" class="dropdown-item" onClick={() => navigate('/customer/city-count')}>city count</a></li>
                            </ul>
                        </div>

                    </div>
                    <h5>Customers</h5>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(p => (
                                <tr>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{[p.street, p.city, p.county, p.postcode].filter(Boolean).join(', ')}</td>
                                    <th className="text-end"><button onClick={() => navigate(`/customer/${p.id}`)} className="btn btn-sm btn-dark">edit</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
