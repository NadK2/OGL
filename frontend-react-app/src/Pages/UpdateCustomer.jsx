import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function UpdateCustomer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);

    const fetchCustomer = () => {
        fetch(`http://localhost:8080/customer/${id}`)
            .then(response => response.json())
            .then(data => {
                setCustomer(data)
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetchCustomer();
    }, [])

    const handleCustomerSubmit = () => {
        fetch(`http://localhost:8080/customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (!response.ok) {
                    alert('Error! customer not updated');
                }
                return response.json();
            })
            .then(data => {
                alert('Customer Updated');
                navigate('/customer');
                console.log('Success:', data);
            })
            .catch(error => {
                alert('Error! customer not updated');
                console.error('Error:', error);
            });
    }

    if (!customer) {
        return <p>loading...</p>
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className="float-end">
                    <button onClick={() => navigate('/customer')} className="btn btn-danger">x</button>
                </div>
                <h5>Update Customer</h5>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="sku" className="form-label">name</label>
                    <input value={customer.name} type="text" className="form-control" required onChange={e => {
                        setCustomer(prev => ({
                            ...prev,
                            name: e.target.value
                        }))
                    }} />
                </div>


                <div className="mb-3">
                    <label htmlFor="street" className="form-label">Street</label>
                    <input value={customer.street} type="text" className="form-control" required onChange={e => {
                        setCustomer(prev => ({
                            ...prev,
                            street: e.target.value
                        }))
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input value={customer.city} type="text" className="form-control" required onChange={e => {
                        setCustomer(prev => ({
                            ...prev,
                            city: e.target.value
                        }))
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="county" className="form-label">County</label>
                    <input value={customer.county} type="text" className="form-control" required onChange={e => {
                        setCustomer(prev => ({
                            ...prev,
                            county: e.target.value
                        }))
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="postcode" className="form-label">Postcode</label>
                    <input value={customer.postcode} type="text" className="form-control" required onChange={e => {
                        setCustomer(prev => ({
                            ...prev,
                            postcode: e.target.value
                        }))
                    }} />
                </div>


                <button onClick={handleCustomerSubmit} className="btn btn-primary">Submit</button>
            </div>
        </div>
    );

}
